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
    }
  },

}
