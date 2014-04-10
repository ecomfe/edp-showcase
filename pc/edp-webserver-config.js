function getLocations() {
    return [
        { 
            location: /\/$/, 
            handler: home( 'index.html' )
        },
        { 
            location: /^\/redirect-local/, 
            handler: redirect('redirect-target', false) 
        },
        { 
            location: /^\/redirect-remote/, 
            handler: redirect('http://www.baidu.com', false) 
        },
        { 
            location: /^\/redirect-target/, 
            handler: content('redirectd!') 
        },
        { 
            location: '/empty', 
            handler: empty() 
        },
        { 
            location: /\.css($|\?)/, 
            handler: [
                autocss()
            ]
        },
        { 
            location: /\.less($|\?)/, 
            handler: [
                file(),
                less()
            ]
        },
        { 
            location: /\.styl($|\?)/, 
            handler: [
                file(),
                stylus()
            ]
        },
        {
            location: /^\/data\//,
            handler: [
                mockup(),
                file()
            ]
        },
        { 
            location: /^.*$/, 
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

function mockup() {
    return function( context ){
        var pathname = context.request.pathname;
        context.request.pathname = '/src/mockup/' + pathname + '.json';
    }
}

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.init = function( config, start ){
    config.getLocations = getLocations;
    setTimeout( start, 3000 );
};
exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
