<template>
  <div class="pay-btn">
      <form :action="basicConfig.paypalPrefix+'/cgi-bin/webscr'" id="form" method="post" target="_blank">
          <input type="hidden" name="cmd" value="_s-xclick">
          <input type="hidden" name="hosted_button_id" v-model="hostedId">
          <input type="hidden" name="invoice" v-model="invoice">
          <img class="cm-btn" @click="toPay()" src="https://www.paypalobjects.com/zh_HK/HK/i/btn/btn_buynowCC_LG_wCUP.gif" border="0" alt="PayPal － 更安全、更簡單的網上付款方式！">
          <img alt="" border="0" src="https://www.paypalobjects.com/zh_HK/i/scr/pixel.gif" width="1" height="1">
      </form>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
   .pay-btn{

   }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
          target:'',
          callback:null,
      }
    },
    data: function () {
      return {
          account:{},
          hostedId:null,
          invoice:null,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        toPay:function () {
            let form=document.getElementById('form');
            this.options.callback&&this.options.callback({invoice:this.invoice});
            form.submit();
        },
    },
    created: function () {

    },
    mounted: function () {
        this.account=this.getAccountInfo();
        /**/
        this.hostedId=this.hostedIdConfig[this.options.target];
        this.invoice=this.account.id+'-'+this.options.target+'-'+this.genTimestamp();

        console.log('options:',this.options);

    }
  };
</script>
