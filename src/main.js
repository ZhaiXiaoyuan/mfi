import Vue from 'vue';
import App from './App';
import router from './router';
import vueResource from 'vue-resource';
import vueCookie from 'vue-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

import config from './utils/config'
import api from './utils/api'
import tools from './utils/tools'
import './utils/filters'
import components from './components'
import i18n from './i18n/i18n';


Vue.use(ElementUI, { size: 'small' });

/*---安装第三方插件---*/
Vue.use(vueResource);
Vue.use(vueCookie);
/*Vue.use(VueI18n);*/

/*---安装自定义插件---*/
Vue.use(config);
Vue.use(api);
Vue.use(tools);
Vue.use(components);

function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if(isIE()){
        Vue.prototype.$alert('为了更好的使用体验，请使用谷歌浏览器、QQ浏览器、搜狗浏览器、360浏览器（极速模式）等浏览器打开网站', '温馨提示', {
            confirmButtonText: '确定'
        });
    }else{
        next();
    }
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
