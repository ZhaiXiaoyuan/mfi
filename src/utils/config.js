
/*基础配置*/
export default {
    rawConfig:{
        China:{
            languageSwitch:false,
            language:'cn',
            domain:'http://www.mfi.group:8081',
            serviceSuffix:'/china',
            fileDomain:'http://www.mfi.group',
            dev:{
                domain:'http://www.mfi.group:8081',
                fileDomain:'http://www.mfi.group',
            }
        },
        Abroad:{
            languageSwitch:true,
            language:'',
            domain:'http://www.mfimermaid.com:8081',
            serviceSuffix:'',
            fileDomain:'http://www.mfimermaid.com',
            paypalDomain:'https://www.paypal.com',
            dev:{
                paypalDomain:'https://www.sandbox.paypal.com',
            }
        },
    },
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        //临时测试
        isDev=false;
        let rConfig=this.rawConfig['China'];
        if(isDev){
            rConfig={...rConfig,...rConfig.dev}
        }
        Vue.appConfig={
            ...rConfig
        }
    },
}


