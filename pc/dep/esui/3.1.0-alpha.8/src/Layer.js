/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 控件浮层基类
 * @author otakustay
 */
define(
    function(require) {
        var u = require('underscore');
        var lib = require('./lib');

        /**
         * 浮层基类
         *
         * `Layer`类是一个与控件形成组合关系的类，但并不是一个控件
         *
         * 当一个控件需要一个浮层（如下拉框）时，可以使用此类，并重写相关方法来实现浮层管理
         *
         * 不把`Layer`作为一个控件来实现，是有以下考虑：
         *
         * - 即便`Layer`作为子控件使用，也必须重写所有相关方法才能起作用，并未节省代码
         * - 控件的生命周期管理、事件管理等一大堆事对性能多少有些负面影响
         * - 通常重写`Layer`的方法时，会依赖控件本身的一些开放接口。
         * 那么如果`Layer`是个子控件，就形成了 **子控件反调用父控件方法** 的现象，不合理
         *
         * 关于如何使用`Layer`控件，可以参考{@link CommandMenu}进行学习
         *
         * @constructor
         * @param {Control} control 关联的控件实例
         */
        function Layer(control) {
            this.control = control;
        }

        /**
         * 创建的元素标签类型
         *
         * @type {string}
         */
        Layer.prototype.nodeName = 'div';

        /**
         * 通过点击关闭弹层的处理方法
         *
         * @param {Event} e DOM事件对象
         * @ignore
         */
        function close(e) {
            var target = e.target;
            var layer = this.getElement(this);
            var main = this.control.main;

            if (!layer) {
                return;
            }

            while (target && (target !== layer && target !== main)) {
                target = target.parentNode;
            }

            if (target !== layer && target !== main) {
                this.hide();
            }
        }

        /**
         * 创建浮层
         *
         * @return {HTMLElement}
         */
        Layer.prototype.create = function () {
            var element = 
                this.control.helper.createPart('layer', this.nodeName);
            lib.addClass(element, 'ui-layer');
            return element;
        };

        /**
         * 渲染层内容
         *
         * @param {HTMLElement} element 层元素
         * @abstract
         */
        Layer.prototype.render = function (element) {
        };

        /**
         * 同步控件状态到层
         *
         * @param {HTMLElement} element 层元素
         * @abstract
         */
        Layer.prototype.syncState = function (element) {
        };

        /**
         * 重新渲染
         */
        Layer.prototype.repaint = function () {
            var element = this.getElement(false);
            if (element) {
                this.render(element);
            }
        };

        /**
         * 初始化层的交互行为
         *
         * @param {HTMLElement} element 层元素
         * @abstract
         */
        Layer.prototype.initBehavior = function (element) {
        };

        function getHiddenClasses(layer) {
            var classes = layer.control.helper.getPartClasses('layer-hidden');
            classes.unshift('ui-layer-hidden');

            return classes;
        }

        /**
         * 获取浮层DOM元素
         *
         * @param {boolean} [create=true] 不存在时是否创建
         * @return {HTMLElement}
         */
        Layer.prototype.getElement = function (create) {
            var element = this.control.helper.getPart('layer');

            if (!element && create !== false) {
                element = this.create();
                this.render(element);
                lib.addClasses(element, getHiddenClasses(this));

                this.initBehavior(element);
                this.control.helper.addDOMEvent(
                    document, 'mousedown', u.bind(close, this));
                // 不能点层自己也关掉，所以阻止冒泡到`document`
                this.control.helper.addDOMEvent(
                    element,
                    'mousedown',
                    function (e) { e.stopPropagation(); }
                );

                this.syncState(element);

                // IE下元素始终有`parentNode`，无法判断是否进入了DOM
                if (!element.parentElement) {
                    document.body.appendChild(element);
                }
            }

            return element;
        };

        /**
         * 隐藏层
         */
        Layer.prototype.hide = function () {
            var classes = getHiddenClasses(this);

            var element = this.getElement();
            lib.addClasses(element, classes);
            this.control.removeState('active');
        };

        /**
         * 显示层
         */
        Layer.prototype.show = function () {
            var element = this.getElement();
            element.style.zIndex = this.getZIndex();
            
            this.position();

            var classes = getHiddenClasses(this);
            lib.removeClasses(element, classes);
            this.control.addState('active');
        };

        /**
         * 切换显示状态
         */
        Layer.prototype.toggle = function () {
            var element = this.getElement();
            if (!element
                || this.control.helper.isPart(element, 'layer-hidden')
            ) {
                this.show();
            }
            else {
                this.hide();
            }
        };

        /**
         * 放置层
         */
        Layer.prototype.position = function () {
            if (this.dock) {
                var element = this.getElement();
                Layer.attachTo(element, this.control.main, this.dock);
            }
        };

        /**
         * 获取层应该有的`z-index`样式值
         *
         * @return {number}
         */
        Layer.prototype.getZIndex = function () {
            return Layer.getZIndex(this.control.main);
        };

        /**
         * 销毁
         */
        Layer.prototype.dispose = function () {
            var element = this.getElement(false);
            if (element) {
                element.innerHTML = '';
                lib.removeNode(element);
            }
            this.control = null;
        };

        // 控制浮层的静态方法，用与本身就漂浮的那些控件（如`Dialog`），
        // 它们无法组合`Layer`实例，因此需要静态方法为其服务

        // 初始最高的`z-index`值，将浮层移到最上就是参考此值
        var zIndexStack = 1000;

        /**
         * 创建层元素
         *
         * @param {string} [tagName="div"] 元素的标签名
         * @return {HTMLElement}
         * @static
         */
        Layer.create = function (tagName) {
            var element = document.createElement(tagName || 'div');
            element.style.position = 'absolute';
            return element;
        };

        /**
         * 获取层应当使用的`z-index`的值
         *
         * @param {HTMLElement} [owner] 层的所有者元素
         * @return {number}
         * @static
         */
        Layer.getZIndex = function (owner) {
            var zIndex = 0;
            while (!zIndex && owner && owner !== document) {
                zIndex = 
                    parseInt(lib.getComputedStyle(owner, 'zIndex'), 10);
                owner = owner.parentNode;
            }
            zIndex = zIndex || 0;
            return zIndex + 1;
        };

        /**
         * 将当前层移到最前
         *
         * @param {HTMLElement} element 目标层元素
         * @static
         */
        Layer.moveToTop = function (element) {
            element.style.zIndex = ++zIndexStack;
        };

        /**
         * 移动层的位置
         *
         * @param {HTMLElement} element 目标层元素
         * @param {number} top 上边界距离
         * @param {number} left 左边界距离
         * @static
         */
        Layer.moveTo = function (element, top, left) {
            positionLayerElement(element, { top: top, left: left });
        };

        /**
         * 缩放层的大小
         *
         * @param {HTMLElement} element 目标层元素
         * @param {number} width 宽度
         * @param {number} height 高度
         * @static
         */
        Layer.resize = function (element, width, height) {
            positionLayerElement(element, { width: width, height: height });
        };

        /**
         * 让当前层靠住一个指定的元素
         *
         * @param {HTMLElement} element 目标层元素
         * @param {HTMLElement} target 目标元素
         * @param {Object} [options] 停靠相关的选项
         * @param {string} [options.top] 指示当前层的上边缘靠住元素的哪个边，
         * 可选值为`"top"`或`"bottom"`
         * @param {string} [options.bottom] 指示当前层的下边缘靠住元素的哪个边，
         * 可选值为`"top"`或`"bottom"`，当`top`值为`"bottom"`时，该值无效
         * @param {string} [options.left] 指示当前层的左边缘靠住元素的哪个边，
         * 可选值为`"left"`或`"right"`
         * @param {string} [options.right] 指示当前层的下边缘靠住元素的哪个边，
         * 可选值为`"left"`或`"right"`，当`left`值为`"right"`时，该值无效
         * @param {number} [options.width] 指定层的宽度
         * @param {number} [options.height] 指定层的高度
         * @param {string} [options.spaceDetection] 指定检测某个方向的可用距离，
         * 可选值为`"vertical"`、`"horizontal"`和`"both"`，当指定一个值时，
         * 会检测这个方向上是否有足够的空间放置层，如空间不够则向反方向放置
         * @static
         */
        Layer.attachTo = function (element, target, options) {
            options = options || { left: 'left', top: 'top' };
            // 虽然这2个变量下面不一定用得到，但是不能等层出来了再取，
            // 一但层出现，可能造成滚动条出现，导致页面尺寸变小
            var pageWidth = lib.page.getViewWidth();
            var pageHeight = lib.page.getViewHeight();

            // 浮层的存在会影响页面高度计算，必须先让它消失，
            // 但在消失前，又必须先计算到浮层的正确高度
            var previousDisplayValue = element.style.display;
            element.style.display = 'block';
            element.style.top = '-5000px';
            element.style.left = '-5000px';
            // IE7下，如果浮层隐藏着反而会影响offset的获取，
            // 但浮层显示出来又可能造成滚动条出现，
            // 因此显示浮层显示后移到屏幕外面，然后计算坐标
            var offset = lib.getOffset(target);
            // 用完改回来再计算后面的
            element.style.top = '';
            element.style.left = '';
            var elementHeight = element.offsetHeight;
            var elementWidth = element.offsetWidth;
            element.style.display = previousDisplayValue;

            // 有2种特殊的情况：
            // 
            // -`{ top: 'top', bottom: 'bottom' }`
            // -`{ left: 'left', right: 'right' }`
            // 
            // 这两种情况下，要计算出宽和高来，且覆盖掉提供的宽高
            var config = lib.clone(options);

            // 如果要靠住某一边，且要检测剩余空间，则那个边空间不够，就要移到另一边
            if (config.spaceDetection === 'vertical'
                || config.spaceDetection === 'both') {
                // 对纵向的策略如下：
                // 
                // - 如果指定`top === 'bottm'`，则尝试放下面，放不了就放上面
                // - 如果指定`bottom === 'top'`，则尝试放上面，放不下就放下面
                // - 如果指定`top === 'top'`，则尝试上边对齐，不行就下边对齐
                // - 如果指定`bottom === 'bottom`'，则尝试下边对齐，不行就上边对齐
                if (config.top === 'bottom') {
                    if (pageHeight - offset.bottom <= elementHeight) {
                        config.top = null;
                        config.bottom = 'top';
                    }
                }
                else if (config.bottom === 'top') {
                    if (offset.top <= elementHeight) {
                        config.top = 'bottom';
                        config.bottom = null;
                    }
                }
                else if (config.top === 'top') {
                    if (pageHeight - offset.top <= elementHeight) {
                        config.top = null;
                        config.bottom = 'bottom';
                    }
                }
                else if (config.bottom === 'bottom') {
                    if (offset.bottom <= elementHeight) {
                        config.top = 'top';
                        config.bottom = null;
                    }
                }
            }
            if (config.spaceDetection === 'horizontal'
                || config.spaceDetection === 'both') {
                // 对横向的策略如下：
                // 
                // - 如果指定`left === 'right'`，则尝试放右边，放不了就放左边
                // - 如果指定`right === 'left'`，则尝试放左边，放不下就放右边
                // - 如果指定`left === 'left'`，则尝试左边对齐，不行就右边对齐
                // - 如果指定`right === 'right`'，则尝试右边对齐，不行就左边对齐
                if (config.left === 'right') {
                    if (pageWidth - offset.right <= elementWidth) {
                        config.left = null;
                        config.right = 'left';
                    }
                }
                else if (config.right === 'left') {
                    if (offset.left <= elementWidth) {
                        config.left = 'right';
                        config.right = null;
                    }
                }
                else if (config.left === 'left') {
                    if (pageWidth - offset.left <= elementWidth) {
                        config.left = null;
                        config.right = 'right';
                    }
                }
                else if (config.right === 'right') {
                    if (offset.right <= elementWidth) {
                        config.left = 'left';
                        config.right = null;
                    }
                }
            }

            if (config.top === 'top' && config.bottom === 'bottom') {
                config.height = offset.height;
                config.bottom = null;
            }
            if (config.left === 'left' && config.right === 'right') {
                config.width = offset.width;
                config.right = null;
            }

            var properties = {};
            if (config.width) {
                properties.width = config.width;
            }
            if (config.height) {
                properties.height = config.height;
            }

            if (config.left) {
                properties.left = offset[config.left];
            }
            else if (config.right) {
                properties.left = offset[config.right] - elementWidth;
            }

            if (config.top) {
                properties.top = offset[config.top];
            }
            else if (config.bottom) {
                properties.top = offset[config.bottom] - elementHeight;
            }

            element.style.display = previousDisplayValue;
            positionLayerElement(element, properties);
        };

        /**
         * 将层在视图中居中
         *
         * @param {HTMLElement} element 目标层元素
         * @param {Object} [options] 相关配置项
         * @param {number} [options.width] 指定层的宽度
         * @param {number} [options.height] 指定层的高度
         * @param {number} [options.minTop] 如果层高度超过视图高度，
         * 则留下该值的上边界保底
         * @param {number} [options.minLeft] 如果层宽度超过视图高度，
         * 则留下该值的左边界保底
         * @static
         */
        Layer.centerToView = function (element, options) {
            var properties = options ? lib.clone(options) : {};

            if (typeof properties.width !== 'number') {
                properties.width = this.width;
            }
            if (typeof properties.height !== 'number') {
                properties.height = this.height;
            }

            properties.left = (lib.page.getViewWidth() - properties.width) / 2;

            var viewHeight = lib.page.getViewHeight();
            if (properties.height >= viewHeight && 
                options.hasOwnProperty('minTop')
            ) {
                properties.top = options.minTop;
            }
            else {
                properties.top = 
                    Math.floor((viewHeight - properties.height) / 2);
            }

            var viewWidth = lib.page.getViewWidth();
            if (properties.height >= viewWidth && 
                options.hasOwnProperty('minLeft')
            ) {
                properties.left = options.minLeft;
            }
            else {
                properties.left = 
                    Math.floor((viewWidth - properties.width) / 2);
            }

            properties.top += lib.page.getScrollTop();
            this.setProperties(properties);
        };

        // 统一浮层放置方法方法
        function positionLayerElement(element, options) {
            var properties = lib.clone(options || {});

            // 如果同时有`top`和`bottom`，则计算出`height`来
            if (properties.hasOwnProperty('top')
                && properties.hasOwnProperty('bottom')
            ) {
                properties.height = properties.bottom - properties.top;
                delete properties.bottom;
            }
            // 同样处理`left`和`right`
            if (properties.hasOwnProperty('left')
                && properties.hasOwnProperty('right')
            ) {
                properties.width = properties.right - properties.left;
                delete properties.right;
            }

            // 避免原来的属性影响
            if (properties.hasOwnProperty('top')
                || properties.hasOwnProperty('bottom')
            ) {
                element.style.top = '';
                element.style.bottom = '';
            }

            if (properties.hasOwnProperty('left')
                || properties.hasOwnProperty('right')
            ) {
                element.style.left = '';
                element.style.right = '';
            }

            // 设置位置和大小
            for (var name in properties) {
                if (properties.hasOwnProperty(name)) {
                    element.style[name] = properties[name] + 'px';
                }
            }
        }

        return Layer;
    }
);
