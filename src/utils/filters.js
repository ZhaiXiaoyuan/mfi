/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的filter都放在这里
 * 在js里面可以这样直接调用：Vue.filter('getLocalISOString')(new Date())
 * */
import Vue from 'vue'

/*格式化时间*/
Vue.filter('formatDate',function(date,fmt){
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
});

/*属性映射*/
Vue.filter('itemFind',function(keyValue,keyName,arr){
   let targetItem=arr.find((item)=>{
       return item[keyName]==keyValue;
   });
    return targetItem;
});

/*属性映射*/
Vue.filter('language',function(str){
    let result='';
    switch (str){
        case 'en':
            result='@EN';
            break;
        case 'cn':
            result='@CN';
            break;
        case 'tw':
            result='@TC';
            break;
    }
    return result;
});


/*教练状态*/
Vue.filter('coachStatus',function(str){
    let result='';
    switch (str){
        case 'nonActivated':
            result='Inactivated';
            break;
        case 'certified':
            result='Activated';
            break;
        case 'pending':
            result='Pending';
            break;
        case 'fail':
            result='Disqualified';
            break;
        case 'disable':
            result='Disable';
            break;
    }
    return result;
});
