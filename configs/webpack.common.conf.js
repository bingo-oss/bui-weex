const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const glob = require('glob');
const copy = require('copy-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateWebDir);
const vueWeexTemp = helper.rootNode(config.templateWeexDir);
const vueWebRouter = helper.rootNode(config.routerWebDir);
const vueWeexRouter = helper.rootNode(config.routerWeexDir);
const webEntry = {};
const weexEntry = {};

//输出web端入口文件的内容
const getWebEntryFileContent = (entryPath, vueFilePath, routerB) => {
    let contents = '';
    let entryContents = fs.readFileSync(vueFilePath).toString();
    let lastContents = '';
    lastContents = routerB ? `
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/');
` : `
new Vue(Vue.util.extend({el: '#root'}, App));
`;
    contents += `
import Vue from 'vue'
import weex from 'weex-vue-render'
weex.init(Vue)
`;
    return contents + entryContents + lastContents;
};

//输出weex端入口文件的内容
const getWeexEntryFileContent = (entryPath, vueFilePath, routerB) => {
    let entryContents = fs.readFileSync(vueFilePath).toString();
    let lastContents = "";
    lastContents = routerB ? `
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/');
` : `
new Vue(Vue.util.extend({el: '#root'}, App));
`;
    return entryContents + lastContents;
};


//处理router内容
const getRouterFileContent = (source, bullean) => {
    const dependence = `import Vue from 'vue'\n`;
    let routerContents = fs.readFileSync(source).toString();
    routerContents = bullean ? (dependence + routerContents) : routerContents;
    return routerContents;
}



// 生成weex/web端对应的路由文件
const getRouterFile = (dir) => {
    dir = dir || config.sourceDir;
    const entrys = glob.sync(`${dir}/${config.routerFilePath}`, { 'nodir': true});
    entrys.forEach(entry => {
        const basename = entry.split('/');
        console.log(entry)
        const len = basename.length;
        const lastname = basename[len-1];
        const routerPathForWeb = path.join(vueWebRouter, lastname);
        const routerPathForNative = path.join(vueWeexRouter, lastname);
        fs.outputFileSync(routerPathForWeb, getRouterFileContent(entry, true));
        fs.outputFileSync(routerPathForNative, getRouterFileContent(entry, false));
    })
}



// 根据入口文件生成weex/web端对应的入口文件
const getEntryFile = (dir) => {
    dir = dir || config.sourceDir;
    const entrys = glob.sync(`${dir}/${config.entryFilePath}`, { 'nodir': true});
    entrys.forEach(entry => {
        const basename = entry.split('/');
        const len = basename.length;
        const lastname = basename[len-1];
        const reg = new RegExp(".router");
        let router = false;
        router = reg.test(lastname) ? true : false;
        if(router) getRouterFile();
        const filename = lastname.substr(0, lastname.lastIndexOf('.'));
        const templatePathForWeb = path.join(vueWebTemp, filename + '.web.js');
        const templatePathForNative = path.join(vueWeexTemp, filename + '.js');
        fs.outputFileSync(templatePathForWeb, getWebEntryFileContent(templatePathForWeb, entry, router));
        fs.outputFileSync(templatePathForNative, getWeexEntryFileContent(templatePathForNative, entry, router));
        webEntry[filename] = templatePathForWeb;
        weexEntry[filename] = templatePathForNative;
    })
}

// Generate an entry file array before writing a webpack configuration
getEntryFile();


/**
 * Plugins for webpack configuration.
 */
const plugins = [
    /*
     * Plugin: BannerPlugin
     * Description: Adds a banner to the top of each generated chunk.
     * See: https://webpack.js.org/plugins/banner-plugin/
     */
    new webpack.BannerPlugin({
        banner: '// { "framework": "Vue"} \n',
        raw: true,
        exclude: 'Vue'
    }),
    //  文件拷贝插件,将图片和字体拷贝到dist目录
    new copy([
        {from: './src/image', to: "./image"},
        {from: './src/font', to: "./font"}
    ]),
];


// 公共配置
const getBaseConfig = () => ({
    output: {
        path: helper.rootNode('./dist')
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': helper.resolve('src'),
            'src' : helper.resolve('src'),
            'css' : helper.resolve('src/css'),
            'js' : helper.resolve('src/js'),
            "views": helper.resolve('src/views'),
        }
    },
    module: {
        // webpack 2.0
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                // 如需支持较低版本系统，例如ios8,需要去掉该配置
                exclude: config.excludeModuleReg
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [],
                exclude: config.excludeModuleReg
            }
        ]
    },
    plugins: plugins
});




// Config for compile jsbundle for web.
const webConfig = getBaseConfig();
webConfig.entry = Object.assign(webEntry, {
    'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
});
webConfig.output.filename = '[name].web.js';
webConfig.module.rules[1].use.push(
    {
        loader: 'vue-loader',
        options: Object.assign(vueLoaderConfig({useVue: true}), {
            /**
             * important! should use postTransformNode to add $processStyle for
             * inline style prefixing.
             */
            optimizeSSR: false,
            compilerModules: [
                {
                    postTransformNode: el => {
                        // to convert vnode for weex components.
                        require('weex-vue-precompiler')()(el)
                    }
                }
            ]

        })
    }
);


// Config for compile jsbundle for native.
const weexConfig = getBaseConfig();
weexConfig.entry = weexEntry;
weexConfig.output.filename = '[name].js';
weexConfig.module.rules[1].use.push(
    {
        loader: 'weex-loader',
        options: Object.assign(vueLoaderConfig({useVue: false}),{
            postcss:[
              //让weex支持css的简写，如border,padding
              require("postcss-weex")({env:"weex"})
            ]
        })
    }
);
weexConfig.node = config.nodeConfiguration;



module.exports = [webConfig, weexConfig];

