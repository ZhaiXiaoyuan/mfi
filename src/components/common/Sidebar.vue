<template>
    <div class="sidebar">
        <div class="user-info">
            <i class="icon logo-icon"></i>
            <p class="name">MFI  EOS</p>
            <p class="role">超级管理员</p>
           <!-- <p class="account">账号：admin</p>-->
        </div>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff"
            text-color="#888" active-text-color="#48b4ff" unique-opened router>
            <template v-for="(item,index) in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <span class="icon-wrap"> <i class="icon" :class="item.icon"></i></span>
                            <span class="title" slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item class="title"  v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            <span class="line"></span>
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :class="{'active':item.index.indexOf(pageName)>-1}" :key="item.index">
                        <span class="line"></span>
                        <span class="icon-wrap"> <i class="icon" :class="item.icon"></i></span>
                        <span class="title" slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div class="cm-btn logout-btn" @click="logout()"></div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" >
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0px;
        bottom:0;
        width: 300px;
        background: #fff8fe;
        .user-info{
            padding: 40px 20px 60px 20px;
            text-align: center;
            color: #5560aa;
            font-size: 20px;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .name{
                margin-top: 10px;
                font-size: 20px;
            }
            .role{
                font-size: 30px;
            }
            .account{
                margin-top: 10px;
                font-size: 16px;
            }
        }
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width:100%;
    }
    .sidebar > ul {
        height:100%;
        .icon-wrap{
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
        }
        li{
            display: flex;
            align-items: center;
            height: 70px;
            .line{
                display: none;
                position: absolute;
                top:0px;
                left: 0px;
                width: 10px;
                height: 100%;
                background: #5360aa;
            }
            .title{
                padding-left: 10px;
                font-size: 20px;
                color: #5560aa;
            }
            &:hover{
                background: rgba(85,86,170,0.1) !important;
            }
            &.active{
                background: rgba(85,86,170,0.1) !important;
                .line{
                    display: inline-block;
                }
            }
        }
    }
    .logout-btn{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 40px;
        margin: auto;
        background: url("../../images/common/logout-btn.png") no-repeat;
        width: 220px;
        height: 90px;
        background-size: 100% 100%;
    }
</style>

<script>
    import Vue from 'vue';
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                itemsConfig:[
                    {
                        code:'01',
                        icon: 'admin-icon',
                        index: '/adminList',
                        title: '管理员',
                    },
                    {
                        code:'02',
                        icon: 'add-min-icon',
                        index: '/addAdmin',
                        title: '添加',
                    },{
                        code:'03',
                        icon: 'msg-icon',
                        index: '/msgList',
                        title: '站内消息',
                    },
                    {
                        code:'04',
                        icon: 'coach-icon',
                        index: '/coachList',
                        title: '教练',
                    },
                    {
                        code:'05',
                        icon: 'school-icon',
                        index: '/schoolList',
                        title: '学校',
                    },
                ],
                items: [],
                pageName:null,
            }
        },
        computed:{
            onRoutes(){
                this.pageName=this.$route.name;
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            //
            this.pageName=this.$route.name;

            /**/
            this.accountInfo=this.getAccountInfo();
            this.accountAccess=null;
            if(this.accountInfo.type=='super'){
                this.accountAccess=['01','02'];
                /* this.accountAccess='all';*/
            }else if(this.accountInfo.type=='admin'){
                this.accountAccess=['03','05'];
            }
            if(this.accountAccess=='all'){
                this.items=this.itemsConfig;
            }else if(this.accountAccess&&this.accountAccess.length>0){
                this.accountAccess.forEach((value,index)=>{
                    for(let i=0;i<this.itemsConfig.length;i++){
                        if(value==this.itemsConfig[i].code){
                            this.items.push(this.itemsConfig[i]);
                        }
                    }
                })
            }
        },
        methods: {
            logout:function () {
                Vue.cookie.set('account','');
                this.$router.push({name:'login',params:{type:this.accountInfo.type}});
            }
        },
    }
</script>
