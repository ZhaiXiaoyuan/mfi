
/*基础配置*/
export default {
    rawConfig:{
        China:{
            version:'china',
            languageSwitch:false,
            language:'cn',
            domain:'http://www.mfi.group:8081',
            serviceSuffix:'/china',
            fileDomain:'http://120.24.223.104',
            payType:'aliPay',
            dev:{
                domain:'http://www.mfi.group:8081',
                fileDomain:'http://120.24.223.104',
            }
        },
        Abroad:{
            version:'abroad',
            languageSwitch:true,
            language:'',
            domain:'http://www.mfimermaid.com:8081',
            serviceSuffix:'',
            fileDomain:'http://www.mfimermaid.com',
            paypalDomain:'https://www.paypal.com',
            payType:'aliPay',
            dev:{
                paypalDomain:'https://www.sandbox.paypal.com',
            }
        },
    },
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        isDev=false;
        let rConfig=this.rawConfig['China'];
        if(isDev){
            rConfig={...rConfig,...rConfig.dev}
        }
        Vue.appConfig={
            ...rConfig
        }
        Object.assign(Vue.prototype,{appConfig:Vue.appConfig});
    },
}


