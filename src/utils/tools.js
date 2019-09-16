/**
 * Created by Administrator on 2016/9/27 0027.
 */
/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import md5 from 'js-md5'

export default {
    install: function (Vue, options) {
        //常用正则
        window.regex={
          illegal :new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])"),
          illegalAlert:'请勿输入非法字符',
          pNum:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,//正数
          pNumAlert:'请输入大于0的数值，限制2位小数',
          pInt:/^[1-9]*[1-9][0-9]*$/,//正整数
          pIntAlert:'请输入大于0的整数',
          nNum:/^(0|[1-9][0-9]*)$/,//自然数
          nNumAlert:'请输入大于等于0的整数',
          chn:/^[\u4e00-\u9fa5]{0,}$/,
          chnAlert:'请输入纯中文字符串',

          float:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
          floatAlert:'数值格式有误，请输入小数点前不多于8位、小数点后不多于2位的数值！',

          percent:/^((100(\.00|\.0)?)|((\d|[1-9]\d)(\.\d{1,2})?))$/,
          percentAlert:'百分数格式错误，请输入0~100间数值，可保留两位小数！',

          contact:/^(0\d{2,3}-?\d{7,8})|(1\d{10})$/,
          contactAlert:'请输入正确格式的手机号码或电话号码！',

          phone:/^1\d{10}$/,
          phoneAlert:'请输入正确格式的手机号！',

          mail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          mailAlert:'请输入正确格式的邮箱！',

          idCard:/^[a-zA-Z0-9]{1,20}$/,
          idCardAlert:'身份证号码格式错误！',

          shortCode:/^(?![0-9]+$)[0-9A-Za-z]{7,20}$/,
          shortCodeAlert:'域名格式有误，请输入7到20位字母或数字，不可为纯数字！'
        }
        //
        //临时测试
      const isDev=false&&process.env.NODE_ENV=='development'?true:false;
      Vue.tools = {
          //临时测试
          basicConfig:{
             /* basicUrl:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://39.108.11.197',
              filePrefix:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://39.108.11.197',*/
              basicUrl:isDev?'http://www.mfimermaid.com':'http://www.mfimermaid.com',
              filePrefix:isDev?'http://api.linqi.tech:8621/mfi':'http://www.mfimermaid.com',
              paypalPrefix:isDev?'https://www.sandbox.paypal.com':'https://www.paypal.com',
              levelOptions:[
                  {
                      value:'M0',
                      label:'M0',
                  },
                  {
                      value:'M1',
                      label:'M1',
                  },
                  {
                      value:'M2',
                      label:'M2',
                  },
                  {
                      value:'M3',
                      label:'M3',
                  },
                  {
                      value:'BMI',
                      label:'BMI',
                  },
                  {
                      value:'MI',
                      label:'MI',
                  },
                  {
                      value:'MMI',
                      label:'MMI',
                  },
                  {
                      value:'MIT',
                      label:'MIT',
                  },
              ],
              colors:[
                  '#000000',
                  '#eeece0',
                  '#1c487f',
                  '#4d80bf',
                  '#c24f4a',
                  '#8baa4a',
                  '#7b5ba1',
                  '#46acc8',
                  '#f9963b',
                  '#ffffff',
                  '#f47023'
              ],
          },
          hostedIdConfig:isDev?{
              goods1:{
                  id:'NRTU8287ASMQU',
              },
              goods2:{
                  id:'ACPNWF64ET6TU',
              },
              starSchoolCerificateM020:{
                  id:'LSEE8PCZ8HT7C',
              },
              fiveStarSchoolCerificateM020:{
                  id:'L3U2UQF7XLJEA',
              },
              M0:{
                  id:'6P96Z9GWVXTE2',
              },
              M1:{
                  id:'XRFB5G85EYQ7W',
              },
              M2:{
                  id:'A4KLLA7RQ5N42',
              },
              M3:{
                  id:'VHGBX5Y9D7H2L',
              },
              BMI:{
                  id:'ATKL87265PHFG',
              },
              MI:{
                  id:'UDHUFVYBLX994',
              },
              MMI:{
                  id:'7ETBBSTY4RASS',
              }
          }:{
              'mfiGoodsSchoolsLeggings':{
                  id:'3NKCR7ECVT2BY',
                  code:'leggings',
                  name:'鱼鳞裤',
                  count:1,
                  price:0,
                  type:'school',
                  sale:false,
                  exchange:true,
              },
              'mfiGoodsSchoolsStickers':{
                  id:'RWMHQ6Y996BCW',
                  code:'stickers',
                  name:'贴纸',
                  count:20,
                  price:5,
                  type:'school',
                  sale:true,
                  exchange:false,
              },
              'mfiGoodsSchoolsPins':{
                  id:'7FWLB9VJ2Q3QQ',
                  code:'pins',
                  name:'别针',
                  count:10,
                  price:17,
                  type:'school',
                  sale:true,
                  exchange:false,
              },

              'mfiGoodsInstructorLeggings':{
                  id:'ZU69VJQLCQ646',
                  code:'leggings',
                  name:'鱼鳞裤',
                  count:1,
                  price:0,
                  type:'coach',
                  sale:false,
                  exchange:true,
              },
              'mfiGoodsInstructorStickers':{
                  id:'DNUJH8AEYSMDU',
                  code:'stickers',
                  name:'贴纸',
                  count:20,
                  price:6,
                  type:'coach',
                  sale:true,
                  exchange:false,
              },
              'mfiGoodsInstructorPins':{
                  id:'6DTDG65NMRVXQ',
                  code:'pins',
                  name:'别针',
                  count:10,
                  price:20,
                  type:'coach',
                  sale:true,
                  exchange:false,
              },

              'mfiGoodsStudentLeggings':{
                  id:'W23FD8VD76PG2',
                  code:'leggings',
                  name:'鱼鳞裤',
                  count:1,
                  price:32,
                  type:'student',
                  sale:true,
                  exchange:false,
              },
              'mfiGoodsStudentStickers':{
                  id:'QEK4WUMZAV4J4',
                  code:'stickers',
                  name:'贴纸',
                  count:20,
                  price:6,
                  type:'student',
                  sale:true,
                  exchange:false,
              },
              'mfiGoodsStudentPins':{
                  id:'67CUV42PP7N3E',
                  code:'pins',
                  name:'别针',
                  count:10,
                  price:20,
                  type:'student',
                  sale:true,
                  exchange:false,
              },

              'mfiM0Certificate20School':{
                  id:'83P5H8UWR3PDE',
              },
              'mfiM0Certificate180School':{
                  id:'ZPJL995TW48A8',
              },
              'mfiM1Certificate5School':{
                  id:'72PVZNWFG5GJL',
              },
              'mfiM1Certificate60School':{
                  id:'6GRA7329HC8PL',
              },
              'mfiM0Certificate20FiveStartSchool':{
                  id:'HU55YTEQBQRXA',
              },
              'mfiM0Certificate480FiveStartSchool':{
                  id:'G9JLYKPA7G72U',
              },
              'mfiM1Certificate10FiveStartSchool':{
                  id:'UDVWN2LE8Y9KA',
              },
              'mfiM1Certificate120FiveStartSchool':{
                  id:'E6BF9525LY8VW',
              },
              'mfiM2Certificate2FiveStartSchool':{
                  id:'JGPVA9MDELZL2',
              },
              'mfiM2Certificate24FiveStartSchool':{
                  id:'B5X5K3J74LDRY',
              },
              M0:{
                  id:'M59NSGGZGYLA2',
              },
              M1:{
                  id:'SEAVR5JK4T36N',
              },
              M2:{
                  id:'TXHZYBLWD8YPG',
              },
              M3:{
                  id:'DP8FMHGC8UQ6Y',
              },
              BMI:{
                  id:'8LXENYQ5QJGNJ',
              },
              MI:{
                  id:'CE5GA58V6Y6J2',
              },
              MMI:{
                  id:'PCJYUVT7ZMXUW',
              }
          },
          centerGoodsList:isDev?[
              {
                  level:'M0',
                  list:[
                      {
                          id:'starSchoolCerificateM020',
                          count:20,
                          price:'xxx',
                          off:'5%',
                          gift:'merleggings',
                      }
                  ]
              }
          ] :
              [//生产环境
              {
                  level:'M0',
                  list:[
                      {
                          id:'mfiM0Certificate20School',
                          count:20,
                          price:'285',
                          off:'5%',
                          gift:'merleggings',
                      },
                      {
                          id:'mfiM0Certificate180School',
                          count:180,
                          price:'2295',
                          off:'15%',
                          gift:'merleggings',
                      }
                  ]
              },
              {
                  level:'M1',
                  list:[
                      {
                          id:'mfiM1Certificate5School',
                          count:5,
                          price:'233',
                          off:'5%',
                      },
                      {
                          id:'mfiM1Certificate60School',
                          count:60,
                          price:'2499',
                          off:'15%',
                      }
                  ]
              }
          ],
          fiveStarCenterGoodsList:isDev?[
              {
                  level:'M0',
                  list:[
                      {
                          id:'fiveStarSchoolCerificateM020',
                          count:20,
                          price:'xxx',
                          off:'10%',
                          gift:'merleggings',
                      }
                  ]
              }
          ]:
              [//生产环境
                  {
                      level:'M0',
                      list:[
                          {
                              id:'mfiM0Certificate20FiveStartSchool',
                              count:20,
                              price:'270',
                              off:'10%',
                              gift:'merleggings',
                          },
                          {
                              id:'mfiM0Certificate480FiveStartSchool',
                              count:480,
                              price:'5040',
                              off:'30%',
                              gift:'merleggings',
                          }
                      ]
                  },
                  {
                      level:'M1',
                      list:[
                          {
                              id:'mfiM1Certificate10FiveStartSchool',
                              count:10,
                              price:'441',
                              off:'10%',
                          },
                          {
                              id:'mfiM1Certificate120FiveStartSchool',
                              count:120,
                              price:'4416',
                              off:'30%',
                          }
                      ]
                  },
                  {
                      level:'M2',
                      list:[
                          {
                              id:'mfiM2Certificate2FiveStartSchool',
                              count:2,
                              price:'92',
                              off:'5%',
                          },
                          {
                              id:'mfiM2Certificate24FiveStartSchool',
                              count:24,
                              price:'941',
                              off:'20%',
                          }
                      ]
                  }
              ],
          instructorCertificateGoodsList:[
              {
                  level:'M0',
                  name:'M0',
                  count:20,
                  price:'',
                  id:'M0',
                  gift:'merleggings',
              },
              {
                  level:'M1',
                  name:'M1',
                  count:1,
                  price:'',
                  id:'M1',
              },
              {
                  level:'M2',
                  name:'M2',
                  count:1,
                  price:'',
                  id:'M2',
              },
              {
                  level:'M3',
                  name:'M3',
                  count:1,
                  price:'',
                  id:'M3',
              },
              {
                  level:'BMI:',
                  name:'BMI:',
                  count:1,
                  price:'',
                  id:'BMI:',
              },
              {
                  level:'MI',
                  name:'MI',
                  count:1,
                  price:'',
                  id:'MI',
              },
              {
                  level:'MMI',
                  name:'MMI',
                  count:1,
                  price:'MMI',
                  id:'MMI',
                  disabled:true,
              }
          ],
        /*生成请求时间戳*/
        genTimestamp:function () {
          return Math.ceil(new Date().getTime()/1000)
        },
        /**
         *
         * @param date
         * @param fmt
         * @returns {*}
         */
        formatDate:function(date,fmt){
          if(typeof date !=Date){
            date=new Date(date);
          }
          var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        },
        sessionInfo:function () {
          let timeStamp=this.genTimestamp();
          return{
              timeStamp:timeStamp,
          }
        },
        /*获取事件当前元素*/
        getCurEle:function (e) {
          var targetEle=null;
          if(e.currentTarget){
            targetEle=e.currentTarget;
          }else if(event.srcElement){
            targetEle=e.srcElement;
          }
          return targetEle;
        },
        /*阻止事件冒泡*/
        stopPropagation:function(e){
          if(e){
            if(e.cancelBubble){
              e.cancelBubble = true;
            }
            else if(e.stopPropagation){
              e.stopPropagation();
            }
          }
        },
        throttle:function (fn, delay, atleast) {
              var timer = null;
              var previous = null;
              return function() {
                  var now = +new Date();

                  if (!previous) previous = now;
                  if (atleast && now - previous > atleast) {
                      fn();
                      // 重置上一次开始时间为本次结束时间
                      previous = now;
                      clearTimeout(timer);
                  } else {
                      clearTimeout(timer);
                      timer = setTimeout(function() {
                          fn();
                          previous = null;
                      }, delay);
                  }
              }
          },
        getAccountInfo:function () {
            let account=Vue.cookie.get('account');
            if(account&&account!='undefined'){
                return JSON.parse(account);
            }else{
                let curSite=window.location.href;
                if(curSite.indexOf('studentActivation')>-1||curSite.indexOf('instructorActivation')>-1){

                }else{
                    router.push({name:'login'});
                }
                return{};
            }
        },
          genLevelConfig:function (options) {
              let instrutorLevelLimit={
                  'all':["M0","M1","M2","M3","BMI","MI","MMI","MIT"],
                  'MIT':["M0","M1","M2","M3","BMI","MI","MMI","MIT"],
                  'MMI':["M0","M1","M2","M3"],
                  'MI':["M0","M1","M2"],
                  'BMI':["M0","M1"],
              }
              let temList=instrutorLevelLimit[options.level];
              let levelList=[];
              temList.forEach((item,i)=>{
                  levelList.push(  {
                      value:item,
                      label:item,
                  });
              });
              return levelList;
          },
          allLevelList:["M0","M1","M2","BMI","M3","MI","MMI","MIT"],
          deviceType:function (options) {
              options={...{},...options}
              var isMobile=false;
              if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                 options.mobile&&options.mobile();
                  isMobile=true;
              }else{
                  options.pc&&options.pc();
              }
              return isMobile;
          },
          // base64转blob
          dataURItoBlob: function (dataURI) {
              var byteString = atob(dataURI.split(',')[1]);
              var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
              var ab = new ArrayBuffer(byteString.length);
              var ia = new Uint8Array(ab);
              for (var i = 0; i < byteString.length; i++) {
                  ia[i] = byteString.charCodeAt(i);
              }
              return new Blob([ab], { type: mimeString });
          },
          imgCompress:function (options) {
              options={...{
                      width:1080,
                      quality:0.8,
                      minSize:10000*10,
                  },...options}
                  if(options.file.size<options.minSize){
                      options.callback&&options.callback(options.file);
                  }else{
                      // 通过canvas压缩图片
                      var reader = new FileReader();
                      reader.readAsDataURL(options.file);
                      var img = new Image;
                      var shortImg=new Image;
                      console.log('000:',options.file);
                      var width = options.width, //图像大小
                          quality = options.quality, //图像质量
                          canvas = document.createElement("canvas"),
                          drawer = canvas.getContext("2d");
                      reader.onload= function (e) {
                          img.src = this.result;
                          img.onload = function () {
                              canvas.width = width;
                              canvas.height = width * (img.height / img.width);
                              drawer.drawImage(img, 0, 0, canvas.width, canvas.height);

                              let data =Vue.tools.dataURItoBlob(canvas.toDataURL(options.file.type, quality));
                              console.log('data:',data);
                              options.callback&&options.callback(data);
                          }
                      }
                  }
          },
          //
          fileToBlob:function (file,callback) {
              if (!file) {
                  return false
              }
              var reader = new FileReader()
              reader.onload = (e) => {
                  let data
                  if (typeof e.target.result === 'object') {
                      // 把Array Buffer转化为blob 如果是base64不需要
                      data = window.URL.createObjectURL(new Blob([e.target.result]))
                  } else {
                      data = e.target.result
                  }
                  //
                 callback&&callback(data);
              }
              // 转化为base64
              // reader.readAsDataURL(file)
              // 转化为blob
              reader.readAsArrayBuffer(file);
          },
          genGoodsOrderInfo:function (userId,goodsId) {
              return {
                  token:this.basicConfig.goodsToken['goodsId'],
                  orderId:userId+'-'+goodsId+'-'+this.genTimestamp()
              };
          },
          browserVersions:function () {
              var u = navigator.userAgent,
                  app = navigator.appVersion;
              return {
                  trident: u.indexOf('Trident') > -1, //IE内核
                  presto: u.indexOf('Presto') > -1, //opera内核
                  webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                  mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                  iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                  iPad: u.indexOf('iPad') > -1, //是否iPad
                  webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                  weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                  qq: u.match(/\sQQ/i) == " qq" //是否QQ
              };
          },
      }

      Object.assign(Vue, Vue.tools);
      Object.assign(Vue.prototype, Vue.tools);
    },
}
