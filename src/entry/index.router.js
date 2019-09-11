// 入口*.vue文件，对象命名为"App"，在编译文件"webpack.common.conf.js"里引用
import App from 'src/views/example/indexrouter.vue'
import router from './router/router.js';
import buiweex from 'src/js/buiweex.js';
Vue.use(buiweex);
