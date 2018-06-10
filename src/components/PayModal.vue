<template>
  <div class="pay-modal">
      <div class="modal-mask"  @click="close()"></div>
      <div class="modal-content">
          <div class="modal-header">
              <span class="cm-btn close-btn" @click="close()"><i class="icon el-icon-circle-close-outline"></i></span>
          </div>
          <div class="modal-body">
              <div class="dialog-body">
                  <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" id="form" method="post" target="_blank">
                      <input type="hidden" name="cmd" value="_s-xclick">
                      <input type="hidden" name="hosted_button_id" v-model="token">
                      <input type="hidden" name="invoice" v-model="temOrderId">
                      <img type="image" style="cursor: pointer;" src="https://www.sandbox.paypal.com/zh_XC/C2/i/btn/btn_buynowCC_LG.gif" border="0" @click="toPay()" alt="PayPal——最安全便捷的在线支付方式！">
                      <img alt="" border="0" src="https://www.sandbox.paypal.com/zh_XC/i/scr/pixel.gif" width="1" height="1">
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
   .pay-modal{
       display: flex;
       align-items: center;
       justify-content: center;
       position: fixed;
       top: 0px;
       left: 0px;
       z-index: 500;
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
           width: 500px;
           height: 300px;
           background: #fff;
           border-radius: 5px;
           overflow: hidden;
           .modal-header{
               padding: 20px;
               .close-btn{
                   float: right;
                   .icon{
                       font-size: 25px;
                       color: #666;
                   }
               }
           }
           .modal-body{
               position: relative;
               height: 100%;
               form{
                   position: absolute;
                   width: 100%;
                   left: 0px;
                   bottom: 100px;
                   padding-top: 50px;
                   text-align: center;
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
          userId:null,
          level:null,
          callback:null,
      }
    },
    data: function () {
      return {
          tokenConfig:{
              'M0':'6P96Z9GWVXTE2',
              'M1':'XRFB5G85EYQ7W'
          },
          token:null,
          temOrderId:null,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        toPay:function () {
            let form=document.getElementById('form');
            form.submit();
            //
            this.options.callback&&this.options.callback();
        },
        close:function () {
            this.$el.remove();
            this.$destroy();
        }
    },
    created: function () {

    },
    mounted: function () {
        /**/
        this.token=this.tokenConfig[this.options.level];
        this.temOrderId=this.options.userId+'-'+this.options.level+'-'+Vue.genTimestamp();
      /*  console.log('this.token:',this.token);
        console.log('this.temOderId:',this.temOrderId);*/
    }
  };
</script>
