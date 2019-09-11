/*global Vue*/
import Router from 'vue-router'
import approuter from 'src/views/example/router/router.vue'
import test1 from 'src/views/example/router/test1.vue'
import test2 from 'src/views/example/router/test2.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        name: 'approuter',
        component: approuter
    },{
        //传参
        path: '/test1/:id',
        name: 'test1',
        component: test1
    },{
        path: '/test2',
        name: 'test2',
        component: test2
    }
  ]
})
