<template>
    <div class="page-wrap">
        <div class="page-content payment-fb-page">
            <div class="tips-content">
                <i class="el-icon-success"></i>
                <p>支付成功</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .page-wrap{
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 40px 0px;
    }
    .payment-fb-page{
        width: 900px;
        margin: 0px auto;
        overflow: auto;
        min-height: 500px;
        border-radius: 10px;
        background: #fff;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .tips-content{
            text-align: center;
            color:#5560aa;
            .el-icon-success{
                font-size: 68px;
                margin-bottom: 15px;
            }
            p{
                font-size: 24px;
            }
        }
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {

            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {

        },
        mounted () {

        },
    }
</script>
