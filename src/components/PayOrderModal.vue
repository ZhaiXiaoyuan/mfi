<template>
  <div class="pay-order-modal">
      <div class="modal-mask"></div>
      <div class="modal-content">
          <div class="modal-header">
              <span class="title">{{options.title}}</span>
              <span class="cm-btn close-btn" @click="close()" v-if="step===1"><i class="icon el-icon-circle-close-outline"></i></span>
          </div>
          <div class="modal-body">
              <div class="dialog-body">
                  <div class="step-panel" v-if="step===1">
                      <div class="tips" v-html="options.tips"></div>
                      <div class="form-wrap">

                      </div>
                      <div class="ali-pay" :class="{'cm-disabled':!invoice}">
                          <div class="cm-btn cm-handle-btn cm-handle-md-btn"  @click="toPay()">前往支付</div>
                          <div class="icon-row"><i class="icon ali-pay-icon"></i></div>
                          <div v-html="payFormDom"></div>
                      </div>
                  </div>
                  <div class="step-panel" v-if="step===2">
                      <div class="tips center-tips warning">
                          <i class="el-icon-loading"></i>
                          <p>订单支付中，请勿关闭或刷新页面！</p>
                          <p>支付后等待系统自动刷新。</p>
                      </div>
                      <div class="panel-handle">
                          <div class="cm-btn cm-handle-btn cm-handle-md-btn" @click="cancel()">取消支付</div>
                      </div>
                  </div>
                  <div class="step-panel" v-if="step===3">
                      <div class="tips center-tips success">
                          <i class="el-icon-success"></i>
                          <p>支付成功</p>
                      </div>
                      <div class="panel-handle">
                          <div class="cm-btn cm-handle-btn cm-handle-md-btn" @click="complete()">确定</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
   .pay-order-modal{
       display: flex;
       align-items: center;
       justify-content: center;
       position: fixed;
       top: 0px;
       left: 0px;
       z-index: 2001;
       width: 100%;
       height: 100%;
       .modal-mask{
           position: absolute;
           z-index: 501;
           width: 100%;
           height: 100%;
           background: rgba(0,0,0,0.5);
       }
       .modal-content{
           position: relative;
           z-index: 502;
           width: 450px;
           min-height: 280px;
           background: #fff;
           border-radius: 5px;
           overflow: hidden;
           .modal-header{
               position: relative;
               padding: 20px;
               text-align: center;
               .title{
                   font-size: 20px;
                   color: #5560aa;
               }
               .close-btn{
                   position: absolute;
                   display: inline-block;
                   top:15px;
                   right: 15px;
                   .icon{
                       font-size: 25px;
                       color: #666;
                   }
               }
           }
           .modal-body{
               position: relative;
               padding: 10px 20px 20px 20px;
               .tips{
                   font-size: 16px;
                   color: #333;
                   padding: 0px 0px 20px 0px;
                   text-align: left;
                   line-height: 30px;
               }
               .center-tips{
                   margin-top: 15px;
                   text-align: center;
                   .el-icon-loading{
                       font-size: 24px;
                   }
                   .el-icon-success{
                       font-size: 40px;
                       margin-top: 5px;
                       margin-bottom: 10px;
                   }
                   &.warning{
                       color:#F56C6C;
                   }
                   &.success{
                       color:#5560aa;
                   }
               }
               form{
                   margin-top: 20px;
                   text-align: center;
               }
               .ali-pay{
                   margin-top: 10px;
                   text-align: center;
                   .cm-handle-btn{
                       width: 100%;
                   }
                   .icon-row{
                       margin-top: 4px;
                       .icon{
                           width: 24px;
                           height: 24px;
                       }
                   }
               }
               .step-panel{
                   .panel-handle{
                       text-align: center;
                       .cm-btn{
                           min-width: 100px;
                       }
                   }
               }
           }
       }
   }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
          id:'',
          callback:null,
          tips:null,
          title:'',
      }
    },
    data: function () {
      return {
          account:{},
          payFormDom:'',
          invoice:'',
          step:1,
          redirect:encodeURI(window.location.href.split('#')[0]+'/paymentFb'),
          interval:null,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        createOrder:function () {
            let params={
                ...Vue.sessionInfo(),
                userId:this.account.id,
                userType:this.account.type==='coach'?'instructor':this.account.type,
                goodsId:this.options.id,
                zhifubaoRedirect:this.redirect,
                address:'',
            }
            let fb=Vue.operationFeedback({text:'订单生成中'});
            Vue.api.createOrder(params).then((resp)=>{
                if(resp.respCode=='2000'){
                    let data=JSON.parse(resp.respMsg);
                    this.payFormDom=data.form;
                    this.invoice=data.invoice;
                    Vue.nextTick(()=>{
                        let form=this.$el.querySelector('form');
                        form.setAttribute('target','_blank');
                    });
                    fb.setOptions({
                        type:'complete',
                        text:'订单生成成功',
                        delayForDelete:0,
                    });
                    //
                    this.interval=setInterval(()=>{
                        this.checkStatus((data)=>{
                            if(data==='success'){
                                this.clear();
                                this.step=3;
                            }else{

                            }
                        });
                    },5000)
                }else{
                    fb.setOptions({
                        type:'warn',
                        text:'订单生成失败,'+resp.respMsg
                    });
                }
            });
        },
        checkStatus:function (fb){
            Vue.api.getOrderRecordInvoice({timeStamp:Vue.tools.genTimestamp(),invoice:this.invoice}).then((resp)=>{
                if(resp.respCode=='2000'){
                    let data=JSON.parse(resp.respMsg);
                    fb&&fb(data.state);
                }else{
                }
            });
        },
        toPay:function () {
            this.$el.querySelector('form').submit();
            this.step=2;
        },
        cancel:function (){
            this.clear();
            this.checkStatus((data)=>{
                if(data==='success'){
                    this.operationFeedback({
                        type:'warn',
                        text:'取消支付失败，该订单已完成支付'
                    });
                    this.step=3;
                }else{
                    this.close();
                }
            });
        },
        clear:function (){
            clearInterval(this.interval);
        },
        complete:function(){
            this.options.callback&&this.options.callback();
            this.close();
        },
        close:function () {
            this.$el.remove();
            this.$destroy();
        },
    },
    created: function () {

    },
    mounted: function () {
        this.account=this.getAccountInfo();
        this.createOrder();
    },
    beforeDestroy: function () {
         this.clear();
    }
  };
</script>
