import Vue from 'vue';
import App from './App';
import router from './router';
import vueResource from 'vue-resource';
import vueCookie from 'vue-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

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
Vue.use(api);
Vue.use(tools);
Vue.use(components);

/**/
/*const i18n = new VueI18n({
    locale: 'en',  // 语言标识
    messages: {
        'zh-CN': require('./assets/lang/zh'),
        'en-US': require('./assets/lang/en')
    }
})*/

function isIE() {
    if(!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }else{
        return false;
    }
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if(isIE()){
        Vue.prototype.$alert('IE browser is not supported, please use other browsers, such as Google Chrome!', 'Warm Prompt', {
            confirmButtonText: 'confirm'
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
