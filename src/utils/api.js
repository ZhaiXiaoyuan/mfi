/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
         /* router.push({name:''});*/
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    //临时测试
    let basicUrl=false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356/mfi':'http://39.108.11.197/mfi';
    Vue.api={
        //
     superLogin:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/admin/superManagerLogin',
          params: params
        });
      },
        adminLogin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/adminLogin',
                params: params
            });
        },
        getAdminList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/getAdminList',
                params: params
            });
        },
        addAdmin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/addAdmin',
                params: params
            });
        },
        setAdminState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/setAdminState',
                params: params
            });
        },
        updateAdmin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/updateAdmin',
                params: params
            });
        },
        getMessageList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/messages/getMessageList',
                params: params
            });
        },
        setMessageState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/messages/setMessageState',
                params: params
            });
        },
        addMessage:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/messages/addMessage',
                params: params
            });
        },
        getSchoolList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/school/getSchoolList',
                params: params
            });
        },
        addSchool:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/school/addSchool',
                params: params
            });
        },
        getSchoolDetail:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/school/getSchool',
                params: params
            });
        },
        updateSchool:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/school/updateSchool',
                params: params
            });
        },
        getCoachList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/getInstrutorList',
                params: params
            });
        },
        addCoach:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/addInstrutor',
                params: params
            });
        },
        grantCertificateToInstrutor:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/grantCertificateToInstrutor',
                params: params
            });
        },
        setInstructorAccountStatus:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/setInstructorAccountStatus',
                params: params
            });
        },
        setInstructorSchoolConfigParm:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/setInstructorSchoolConfigParm',
                params: params
            });
        },
        getCourseList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/getCourseList',
                params: params
            });
        },
        getCourseStudentList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/getCourseStudentMfiLevelState',
                params: params
            });
        },
        getCourseDetail:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/getCourseDetail',
                params: params
            });
        },
        getUserCertificate:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/certificate/getUserCertificate',
                params: params
            });
        },
        getUserBaseInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getUserBaseInfo',
                params: params
            });
        },
        getAuditList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/audit/getAuditList',
                params: params
            });
        },
        getUserAuditList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/audit/getAudit',
                params: params
            });
        },
        //获取某教练购买证书   获取平台证书统计
        getInstructorBuyCertificate:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/certificate/getInstructorBuyCertificate',
                params: params
            });
        },
        //教练登录
        coachLogin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/login',
                params: params
            });
        },
        //添加课程
        addCourse:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/addCourse',
                params: params
            });
        },
        //添加课程
        setStudentMfiLevelState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/setStudentMfiLevelState',
                params: params
            });
        },
        //授予证书
        grant:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/certificate/certificatory',
                params: params
            });
        },
        //获取某个教练所有学生信息
        getInstrutorStudentList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/getInstrutorStudentList',
                params: params
            });
        },
        //将某个学生加入某个课程
        addStudentToCourse:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/addStudentToCourse',
                params: params
            });
        },
        //获取学生加入的课程
        getStudentJoinCourse:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/getStudentJoinCourse',
                params: params
            });
        },
        //新建学生
        addStudent:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/student/addStudent',
                params: params
            });
        },
        //解密AES
        getEmailByAesData:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getEmailByAesData',
                params: params
            });
        },
        //设置用户头像
        setHeadPic:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/setHeadPic',
                params: params
            });
        },
        //设置教练保险证明
        setInsurancePic:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/setInsurancePic',
                params: params
            });
        },
        //设置教练急救证明
        setFirstAidPic:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/instructor/setFirstAidPic',
                params: params
            });
        },
        //设置用户基本资料
        setUserBaseInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/setUserBaseInfo',
                params: params
            });
        },
        //激活账号
        activate:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/activate',
                params: params
            });
        },
        //学生登陆
        studentLogin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/student/login',
                params: params
            });
        },
        //获取学生mfi等级阶段状态
        getStudentMfiLevelState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/course/getStudentMfiLevelState',
                params: params
            });
        },
        //操作审核
        operateAudit:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/audit/operateAudit',
                params: params
            });
        },
        //获取学生列表
        getStudentList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/student/getStudentList',
                params: params
            });
        },
        //添加审核
        addAudit:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/audit/addAudit',
                params: params
            });
        },
    }
  },

}
