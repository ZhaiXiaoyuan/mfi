import Vue from 'vue';
import Router from 'vue-router';
import bus from '../components/common/bus'

Vue.use(Router);

const router= new Router({
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
                    path: '/coachList/:school?/:schoolName?',
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
                    path: '/certificateStatistics/:school?/:schoolName?',
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
                {
                    path: '/userAuditList',
                    name:'userAuditList',
                    component: resolve => require(['../page/common/UserAuditList.vue'], resolve)
                },
                {
                    path: '/schoolDetail/:code?',
                    name:'schoolDetail',
                    component: resolve => require(['../page/school/SchoolDetail.vue'], resolve)
                },
                {
                    path: '/schoolStudentList',
                    name:'schoolStudentList',
                    component: resolve => require(['../page/school/SchoolStudentList.vue'], resolve)
                },
                {
                    path: '/schoolCourseList/:school?/:schoolName?',
                    name:'schoolCourseList',
                    component: resolve => require(['../page/school/SchoolCourseList.vue'], resolve)
                },
                {
                    path: '/mall',
                    name:'mall',
                    component: resolve => require(['../page/mall/Mall.vue'], resolve),
                    children:[
                        {
                            path: '/mallHome',
                            name:'mallHome',
                            component: resolve => require(['../page/mall/MallHome.vue'], resolve),
                        },
                    ]
                },
                {
                    path: '/material',
                    name:'material',
                    component: resolve => require(['../page/course/Material.vue'], resolve),
                    children:[
                        {
                            path: '/materialList',
                            name:'materialList',
                            component: resolve => require(['../page/course/MaterialList.vue'], resolve),
                        },
                        {
                            path: '/materialItem/:type?/:id?',
                            name:'materialItem',
                            component: resolve => require(['../page/course/MaterialItem.vue'], resolve),
                        },
                    ]
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
        {
            path: '/protocol',
            name:'protocol',
            component: resolve => require(['../page/common/Protocol.vue'], resolve)
        },
    ]
});
//注册全局导航守卫
router.beforeEach((to, from,next) => {

    /* let userInfo=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):null;
     if(!userInfo){
     Vue.api.getUserInfo({...Vue.sessionInfo()}).then((resp)=>{
     if(resp.status=='success'){
     let userInfo=JSON.parse(resp.message);
     sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
     if(userInfo.status==20){
     next();
     }else{
     router.push({name:'forbidden'});
     }
     }
     })
     }else {
     if(userInfo.status==20){
     next();
     }else{
     router.push({name:'forbidden'});
     }
     }*/

    //进入非登录页前刷新并判断用户状态
    if(to.name!='login'){
        let account=Vue.getAccountInfo();
        if(account.type=='coach'||account.type=='student'){
            let switchingFlag=localStorage.getItem('switching');
            if(switchingFlag=='true'){
                localStorage.setItem('switching','false');
                next({
                    path: '/'+account.type+'Detail',
                })
            }else{
                Vue.api.getUserBaseInfo({  ...Vue.sessionInfo(), userId:account.id, role:account.type=='coach'?'instructor':'student'}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('userInfo:',data);
                        account={
                            type:account.type,
                            account:account.account,
                            ...data.user,
                            ...data.instructorPayment
                        };
                        Vue.cookie.set('account',JSON.stringify(account),7);
                        if(account.type=='coach'){
                            if(to.name!='protocol'){
                                if(data.instructorProtocolState=='disable'){
                                    bus.$emit('service_modal_handle',data);
                                }
                            }
                            if(to.name!='coachDetail'&&to.name!='protocol'){
                                if(account.instructorAccountStatus=='pending'||account.instructorAccountStatus=='fail'||account.professionalMembersFee=='notPay'){
                                    router.push({name:'coachDetail'});
                                }
                            }
                        }else if(account.type=='student'){

                        }
                    }else{

                    }
                    next();
                });
            }
        }else if(account.type=='school'){
            Vue.api.getSchoolDetail({
                ...Vue.sessionInfo(),
                serialCode:account.serialCode,
            }).then((resp)=>{
                if(resp.respCode=='2000'){
                    let data=JSON.parse(resp.respMsg);
                   /* console.log('loginInfo:',data);*/
                    account={ type:account.type,account:account.account,...data.school,...data.schoolPayment};
                    Vue.cookie.set('account',JSON.stringify(account),7);
                    if(account.schoolQualification=='notPay'){
                        if(to.name!='protocol'){
                            if(data.schoolProtocolState=='disable'){
                                bus.$emit('service_modal_handle',data);
                            }
                        }
                        if(to.name!='schoolDetail'&&to.name!='protocol'){
                            next({
                                path: '/schoolDetail',
                            })
                        }else{
                            next();
                        }
                    }else{
                        next();
                    }
                }else{
                    next();
                }
            });
        }else{
            next();
        }
    }else{
        next();
    }

})
export default router;
