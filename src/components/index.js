/**
 * Created by Designer on 2018/1/23.
 */

import Distpicker from './Distpicker';
import OperationFeedback from './OperationFeedback';
import ViewPicModal from './ViewPicModal';
import Language from './Language';
import PayModal from './PayModal';
import Modal from './Modal';
import AlertModal from './AlertModal';
import CropModal from './CropModal';
import GenCode from './GenCode.vue';
import PayBtn from './PayBtn.vue';
import PayOrderModal from './PayOrderModal';


/*全局组件注册配置*/
export default {
  install:function(Vue){
    /*标签调度方式*/
    Vue.component('v-distpicker',Distpicker);
    Vue.component('OperationFeedback',OperationFeedback);
    Vue.component('ViewPicModal',ViewPicModal);
    Vue.component('Language',Language);
    Vue.component('PayModal',PayModal);
    Vue.component('Modal',Modal);
    Vue.component('AlertModal',AlertModal);
    Vue.component('CropModal',CropModal);
    Vue.component('GenCode',GenCode);
    Vue.component('PayBtn',PayBtn);
    Vue.component('PayOrderModal',PayOrderModal);

    /*方法调度方式*/
    let OperationFeedbackConstructor = Vue.extend(OperationFeedback);
    let ViewPicModalConstructor = Vue.extend(ViewPicModal);
    let PayModalConstructor = Vue.extend(PayModal);
    let AlertModalConstructor=Vue.extend(AlertModal);
    let CropModalConstructor=Vue.extend(CropModal);
    let PayOrderModalConstructor=Vue.extend(PayOrderModal);
    const functionObject={
        /**
         * 操作提示
         * @param options object
         */
        operationFeedback:function (options) {
            options={...{
                parent:'app',//添加提示框的容器,该容器的position属性值须是'relative'
                parentPosition:'relative',//父元素属性值须是'relative'或者fixed
                tipsPosition:'fixed',//添加提示框的position属性值须是'absolute'或者fixed
                type:'operating',//提示类型，operating:正在处理,complete:处理完成,warn:错误警告,tips:提示
                text:'正在处理',//要提示的文本,
                delayForDelete:3000,//提示框消失延时,
                mask:false//是否显示蒙版
            },...options};
            if(options.parent=='app'){
                options.parentPosition='static';
            }
            //
            let parentEle=document.getElementById(options.parent);
            //
            let instance=new OperationFeedbackConstructor({
                data:{...options}
            });
            instance.$mount();
            parentEle.appendChild(instance.$el);
            //设置参数
            function setOptions(obj) {
                Object.assign(instance,obj);
            }
            return{
                setOptions:setOptions
            }
        },
        /**
         * 查看照片弹窗
         * @param options
         */
        viewPicModal:function (options) {
            options={...{
               imgUrl:null,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new ViewPicModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 支付弹窗
         * @param options
         */
        payModal:function (options) {
            options={...{},...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new PayModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
            return {
                close:instance.close
            }
        },

        /**
         * 提示弹窗
         * @param options
         */
        alert:function (options) {
            options={...{
                className: 'alert-modal', /*模态框的className*/
                title: '温馨提示',//提示标题
                html: '',   //提示内容
                yes: '确 定',
                ok:null,//回调
                lock:false,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new AlertModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
            return {
                close:instance.close
            }
        },
        /**
         * 图片裁剪弹窗
         * @param options
         */
        cropModal:function (options) {
            options={...{
                img:null,
                size: 1,
                full: false,
                outputType: 'jpeg',
                canMove: true,
                fixedBox: false,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                centerBox: false,
                fixedNumber:[1,1],
                fixed:true,
                ok:null,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new CropModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
            return {
                close:instance.close
            }
        },
        /**
         * 订单支付弹窗
         * @param options
         */
        payOrderModal:function (options) {
            options={...{},...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new PayOrderModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
            return {
                close:instance.close
            }
        },
    }
    /**/
    Object.assign(Vue,functionObject);
    Object.assign(Vue.prototype,functionObject);
  }
};
