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
      Vue.tools = {
          basicConfig:{
             /* basicUrl:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://39.108.11.197',
              filePrefix:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://39.108.11.197',*/
              basicUrl:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://www.mermaidfederation.com',
              filePrefix:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356':'http://www.mermaidfederation.com',
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
          },
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
          }
      }

      Object.assign(Vue, Vue.tools);
      Object.assign(Vue.prototype, Vue.tools);
    },
}
