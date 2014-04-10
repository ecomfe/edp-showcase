var path = require( 'path' );

function getProcessors() {
    var l = new LessCompiler({
        files: [
            'index.html',
            'src/common/css/main.less'
        ]
    });
    var c = new CssCompressor();
    var m = new ModuleCompiler();
    var j = new JsCompressor();
    var p = new PathMapper();
    var a = new AddCopyright();

    return {
        'default': [ l, m, p ],
        'release': [ l, c, m, j, p, a ]
    };
};

exports.input = __dirname;
exports.output = path.resolve( __dirname, 'output' );

exports.init = function( config, start ) {
    config.getProcessors = getProcessors;
    setTimeout( start, 2000 );
};

exports.exclude = [
    'tool',
    'doc',
    'test',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

