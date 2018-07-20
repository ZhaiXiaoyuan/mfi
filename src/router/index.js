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
                {
                    path: '/courseList/:id?',
                    name:'courseList',
                    component: resolve => require(['../page/course/CourseList.vue'], resolve)
                },
                {
                    path: '/courseDetail/:id',
                    name:'courseDetail',
                    component: resolve => require(['../page/course/CourseDetail.vue'], resolve)
                },
                {
                    path: '/audit',
                    name:'audit',
                    component: resolve => require(['../page/admin/Tem.vue'], resolve)
                },
                {
                    path: '/certificate',
                    name:'certificate',
                    component: resolve => require(['../page/admin/Tem.vue'], resolve)
                },
                {
                    path: '/setting',
                    name:'setting',
                    component: resolve => require(['../page/admin/Setting.vue'], resolve)
                },
                {
                    path: '/auditList',
                    name:'auditList',
                    component: resolve => require(['../page/admin/AuditList.vue'], resolve)
                },
                {
                    path: '/certificateStatistics',
                    name:'certificateStatistics',
                    component: resolve => require(['../page/admin/CertificateStatistics.vue'], resolve)
                },
                {
                    path: '/addStudent/:id',
                    name:'addStudent',
                    component: resolve => require(['../page/course/AddStudent.vue'], resolve)
                },
                {
                    path: '/studentList',
                    name:'studentList',
                    component: resolve => require(['../page/student/StudentList.vue'], resolve)
                },
                {
                    path: '/studentDetail/:id?',
                    name:'studentDetail',
                    component: resolve => require(['../page/student/StudentDetail.vue'], resolve)
                },
                {
                    path: '/coachCertificateStatistics/:id?',
                    name:'coachCertificateStatistics',
                    component: resolve => require(['../page/coach/CoachCertificateStatistics.vue'], resolve)
                },
                {
                    path: '/studentCourseList',
                    name:'studentCourseList',
                    component: resolve => require(['../page/student/StudentCourseList.vue'], resolve)
                },
                {
                    path: '/studentCourseDetail/:id',
                    name:'studentCourseDetail',
                    component: resolve => require(['../page/student/SCourseDetail.vue'], resolve)
                },
                {
                    path: '/adminStudentList',
                    name:'adminStudentList',
                    component: resolve => require(['../page/admin/AdminStudentList.vue'], resolve)
                },
            ]
        },
        {
            path: '/login/:type?',
            name:'login',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
        {
            path: '/instructorActivation',
            name:'instructorActivation',
            component: resolve => require(['../page/account/InstructorActivation.vue'], resolve)
        },
        {
            path: '/studentActivation',
            name:'studentActivation',
            component: resolve => require(['../page/account/StudentActivation.vue'], resolve)
        },
    ]
})
