<template>
  <div class="pay-modal">
      <div class="modal-mask"  @click="close()"></div>
      <div class="modal-content">
          <div class="modal-header">
              <span class="cm-btn close-btn" @click="close()"><i class="icon el-icon-circle-close-outline"></i></span>
          </div>
          <div class="modal-body">
              <div class="dialog-body">
                  <p class="tips">{{options.tips}}</p>
                  <form :action="paypalPrefix+'/cgi-bin/webscr'" id="form" method="post" target="_blank">
                      <input type="hidden" name="cmd" value="_s-xclick">
                      <input type="hidden" name="hosted_button_id" v-model="token">
                      <input type="hidden" name="invoice" v-model="temOrderId">
                      <img class="cm-btn" @click="toPay()" src="https://www.paypalobjects.com/zh_HK/HK/i/btn/btn_buynowCC_LG_wCUP.gif" border="0" alt="PayPal － 更安全、更簡單的網上付款方式！">
                      <img alt="" border="0" src="https://www.paypalobjects.com/zh_HK/i/scr/pixel.gif" width="1" height="1">
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
          closeCallback:null,
          tips:null,
      }
    },
    data: function () {
      return {
          paypalPrefix:Vue.tools.basicConfig.paypalPrefix,
          tokenConfig:{
              'M0':'6P96Z9GWVXTE2',
              'M1':'XRFB5G85EYQ7W',
              'M2':'A4KLLA7RQ5N42',
              'M3':'VHGBX5Y9D7H2L',
              'BMI':'ATKL87265PHFG',
              'MI':'UDHUFVYBLX994',
              'MMI':'7ETBBSTY4RASS',
              'instructorQualification':'TLLCVT5X7E98C',
              'professionalMembersFee':'3R62EWX84Z54A',
              'schoolQualification':'J9M8MNQCER4BE',
          },
          prodTokenConfig:{
              'M0':'M59NSGGZGYLA2',
              'M1':'SEAVR5JK4T36N',
              'M2':'TXHZYBLWD8YPG',
              'M3':'DP8FMHGC8UQ6Y',
              'BMI':'8LXENYQ5QJGNJ',
              'MI':'CE5GA58V6Y6J2',
              'MMI':'PCJYUVT7ZMXUW',
              'instructorQualification':'3CZF28KCQ7QY4',
              'professionalMembersFee':'NKCU4RC4X3GPQ',
              'schoolQualification':'5GQTJAKBK5BLC',
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
            this.options.callback&&this.options.callback({invoice:this.temOrderId});
        },
        close:function () {
            this.$el.remove();
            this.$destroy();
            this.options.closeCallback&&this.options.closeCallback();
        }
    },
    created: function () {

    },
    mounted: function () {
        /**/
        //临时测试
        this.token=process.env.NODE_ENV=='development'?this.tokenConfig[this.options.level]:this.prodTokenConfig[this.options.level];
        this.temOrderId=this.options.userId+'-'+this.options.level+'-'+Vue.genTimestamp();
      /*  console.log('this.token:',this.token);
        console.log('this.temOderId:',this.temOrderId);*/
    }
  };
</script>
