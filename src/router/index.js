import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/adminList',
                    name:'adminList',
                    component: resolve => require(['../page/super/AdminList.vue'], resolve)
                },
                {
                    path: '/addAdmin',
                    name:'addAdmin',
                    component: resolve => require(['../page/super/AddAdmin.vue'], resolve)
                },
                {
                    path: '/msgList',
                    name:'msgList',
                    component: resolve => require(['../page/admin/MsgList.vue'], resolve)
                },
                {
                    path: '/msgDetail/:id?',
                    name:'msgDetail',
                    component: resolve => require(['../page/admin/msgDetail.vue'], resolve)
                },
                {
                    path: '/coachList/:id?',
                    name:'coachList',
                    component: resolve => require(['../page/admin/CoachList.vue'], resolve)
                },
                {
                    path: '/coachDetail/:id?',
                    name:'coachDetail',
                    component: resolve => require(['../page/admin/CoachDetail.vue'], resolve)
                },
                {
                    path: '/schoolList',
                    name:'schoolList',
                    component: resolve => require(['../page/admin/SchoolList.vue'], resolve)
                },
            ]
        },
        {
            path: '/login/:type?',
            name:'login',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
    ]
})
