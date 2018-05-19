<template>
    <div class="language">
        <ul>
            <li>
                <span class="text">EN</span>
                <span class="gap-icon">/</span>
            </li>
            <li class="active">
                <span class="text">简体</span>
                <span class="gap-icon">/</span>
            </li>
            <li>
                <span class="text">繁体</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .language{
        position: fixed;
        top:30px;
        right: 45px;
    }
    ul{
        /*display: flex;
        align-items: center;*/
        li{
            float: left;
            position: relative;
            font-size: 14px;
            color: #fff;
            height: 28px;
            display: flex;
            align-items: center;
            line-height: normal;
            .gap-icon{
                display: inline-block;
                font-size: 24px;
                color: #fff;
                padding: 0px 5px;
            }
            &.active{
                font-size: 20px;
                .text{
                    position: relative;
                    top:-2px;
                }
            }
        }
    }
</style>
<script>
    export default{
        name: 'identify',
        props: {

        },
        data() {
            return {
                identifyCode:null
            }
        },
        methods: {


        },
        watch: {

        },
        mounted () {

        }
    }
</script>
