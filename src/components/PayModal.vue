<template>
  <div class="pay-modal">
      <div class="modal-mask"  @click="close()"></div>
      <div class="modal-content">
          <div class="modal-header">
              <span class="title">{{options.title}}</span>
              <span class="cm-btn close-btn" @click="close()"><i class="icon el-icon-circle-close-outline"></i></span>
          </div>
          <div class="modal-body">
              <div class="dialog-body">
                 <div>
                     <p class="tips">{{options.tips}}</p>
                     <form :action="paypalPrefix+'/cgi-bin/webscr'" id="form" method="post" target="_blank">
                         <input type="hidden" name="cmd" value="_s-xclick">
                         <input type="hidden" name="hosted_button_id" v-model="token">
                         <input type="hidden" name="invoice" v-model="temOrderId">
                         <img class="cm-btn" @click="toPay()" src="https://www.paypalobjects.com/zh_HK/HK/i/btn/btn_buynowCC_LG_wCUP.gif" border="0" alt="PayPal － 更安全、更簡單的網上付款方式！">
                         <img alt="" border="0" src="https://www.paypalobjects.com/zh_HK/i/scr/pixel.gif" width="1" height="1">
                     </form>
                 </div>
                  <div v-if="options.tips2">
                      <p class="tips">{{options.tips2}}</p>
                      <form :action="paypalPrefix+'/cgi-bin/webscr'" id="form_M0_1" method="post" target="_blank">
                          <input type="hidden" name="cmd" value="_s-xclick">
                          <input type="hidden" name="hosted_button_id" value="WHL4ZS8H39ZVL">
                          <input type="hidden" name="invoice" v-model="temOrderId">
                          <img class="cm-btn" @click="toPay()" src="https://www.paypalobjects.com/zh_HK/HK/i/btn/btn_buynowCC_LG_wCUP.gif" border="0" alt="PayPal － 更安全、更簡單的網上付款方式！">
                          <img alt="" border="0" src="https://www.paypalobjects.com/zh_HK/i/scr/pixel.gif" width="1" height="1">
                      </form>
                  </div>
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
           width: 450px;
           height: 250px;
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
               height: 100%;
               .dialog-body{
                   display: flex;
                   justify-content: center;
               }
               .tips{
                   font-size: 16px;
                   color: #333;
                   text-align: center;
                   padding: 30px 20px 10px 20px;
               }
               form{
                   margin-top: 20px;
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
          tips2:null,
          title:'',
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
              'instructorQualification':'TLLCVT5X7E98C',
              'professionalMembersFee':'3R62EWX84Z54A',
              'schoolQualification':'J9M8MNQCER4BE',
          },
          prodTokenConfig:{
              'M0':'M59NSGGZGYLA2',
              'M0_1':'WHL4ZS8H39ZVL',
              'M1':'SEAVR5JK4T36N',
              'M2':'TXHZYBLWD8YPG',
              'M3':'DP8FMHGC8UQ6Y',
              'BMI':'8LXENYQ5QJGNJ',
              'MI':'CE5GA58V6Y6J2',
              'O1':'WNLRDDNJEMRW4',
              'O2':'VH5B3Z5GCQCBG',
              'OI':'ADLE6V4CV2EQN',
              'J1':'U393KL7DE49LA',
              'J2':'83EZ88GG6JKSS',
              'J3':'TMM2Q33FZ9MU6',
              'JI':'M7Y7WW2HX55TN',
              'G1':'QRAJSGAF4H2AY',
              'G2':'KAW5D6DDPTEFY',
              'GI':'VZ8M2P5L5JJLS',
              'P1':'YH5TQPTDGSZR6',
              'P2':'MSGR5PDCF6NZ6',
              'PI':'FYXGN3E8SATU2',
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
        this.token=false&&process.env.NODE_ENV=='development'?this.tokenConfig[this.options.level]:this.prodTokenConfig[this.options.level];
        this.temOrderId=this.options.userId+'-'+this.options.level+'-'+Vue.genTimestamp();
      /*  console.log('this.token:',this.token);
        console.log('this.temOderId:',this.temOrderId);*/
    }
  };
</script>
