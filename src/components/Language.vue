<template>
    <div class="language">
        <ul>
            <li :class="{'active':locale=='en'}" @click="setLanguage('en')">
                <span class="text">EN</span>
                <span class="gap-icon">/</span>
            </li>
            <li :class="{'active':locale=='zh'}" @click="setLanguage('zh')">
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
</style>
<script>
    export default{
        name: 'identify',
        props: {

        },
        data() {
            return {
                locale:'zh'
            }
        },
        methods: {
            setLanguage:function (value) {
                this.locale=value;
                this.$i18n.locale=this.locale;
                localStorage.setItem('locale',this.locale);
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
