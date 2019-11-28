
/*基础配置*/
export default {
    rawConfig:{
        China:{
            languageSwitch:false,
            language:'cn',
            domain:'http://www.mfimermaid.com:8081',
            fileDomain:'http://www.mfimermaid.com',
            dev:{
                domain:'http://www.mfimermaid.com:8081',
                fileDomain:'http://www.mfimermaid.com',
            }
        },
        Abroad:{
            languageSwitch:false,
            language:'',
            domain:'http://www.mfimermaid.com:8081',
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
        isDev=true;
        let rConfig=this.rawConfig['Abroad'];
        if(isDev){
            rConfig={...rConfig,...rConfig.dev}
        }
        Vue.appConfig={
            ...rConfig
        }
    },
}


