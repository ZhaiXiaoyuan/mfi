<template>
    <div class="language">
        <ul>
            <li :class="{'active':locale=='en'}" @click="setLanguage('en',true)">
                <span class="text">EN</span>
                <span class="gap-icon">/</span>
            </li>
            <li :class="{'active':locale=='cn'}" @click="setLanguage('cn',true)">
                <span class="text">简体</span>
                <span class="gap-icon">/</span>
            </li>
            <li :class="{'active':locale=='tw'}" @click="setLanguage('tw',true)">
                <span class="text">繁體</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .language{
        position: fixed;
        z-index: 100;
        top:20px;
        right: 0px;
        background: #5560aa;
        height: 36px;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        display: flex;
        align-items: center;
        padding: 0px 10px;

    }
    ul{
        /*display: flex;
        align-items: center;*/
        overflow: hidden;
        li{
            float: left;
            position: relative;
            font-size: 14px;
            color: #fff;
            height: 28px;
            display: flex;
            align-items: center;
            line-height: normal;
            cursor: pointer;
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
    @media screen and (max-width: 1600px) {
        .language{
            top:10px;
        }
    }
    @media screen and (max-width: 1000px) {
        .language{
            height: 32px;
            padding: 0px 8px;
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            top:5px;
        }
        ul{
            li{
                font-size: 12px;
                height: 26px;
                .gap-icon{
                    font-size: 18px;
                    padding: 0px 5px;
                }
                &.active{
                    font-size: 16px;
                    .text{
                        top:-1px;
                    }
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
                locale:null
            }
        },
        methods: {
            setLanguage:function (value,click) {
                this.locale=value;
                this.$i18n.locale=this.locale;
                localStorage.setItem('lang',this.locale);
                if(click){
                /* window.location.reload();*/
                }
            }
        },
        watch: {

        },
        mounted () {
            if(localStorage.getItem('locale')){
                this.setLanguage(localStorage.getItem('locale'));
            }
        }
    }
</script>
