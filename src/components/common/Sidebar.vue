<template>
    <div class="sidebar">
        <div class="user-info">
            <i class="icon logo-icon"></i>
            <p class="name">MFI  EOS</p>
            <p class="role" v-if="account.type=='super'">{{this.$t("title.super")}}</p>
            <p class="role" v-if="account.type=='admin'">{{this.$t("title.admin")}}</p>
            <p class="account">{{$t('label.account')}}：{{account.account?account.account:account.email}}</p>
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
        <div class="cm-btn logout-btn" @click="logout()">{{$t("btn.logout")}}</div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" >
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0px;
        bottom:0;
        width: 280px;
        background: #fff8fe;
        .user-info{
            padding: 40px 10px;
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
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 80px;
    }
    @media screen and (max-width: 1600px) {
        .logo-icon{
            width: 60px;
            height: 58px;
        }
        .sidebar{
            width: 250px;
            .user-info{
                padding: 25px 5px;
                .name{
                    font-size: 16px;
                }
                .role{
                    font-size: 24px;
                }
                .account{

                }
            }
        }
        .sidebar >ul{
            .icon-wrap{
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25px;
            }
            li{
                height: 60px;
                .line{
                    width: 5px;
                }
                .title{
                    font-size: 16px;
                }
            }
        }
        .logout-btn{
            width: 180px;
            height: 70px;
            line-height: 66px;
            font-size: 20px;
            bottom: 20px;
        }
    }
</style>

<script>
    import Vue from 'vue';
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                itemsConfig:[],
                items: [],
                pageName:null,

                account:{},
            }
        },
        watch: {
            //切换语言时重新初始化菜单
            '$i18n.locale':function (newVal,oldVal) {
               /* console.log('newVal:',newVal);*/
                this.initItems();
            },
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
            this.account=this.getAccountInfo();
            console.log('this.account:',this.account);

            this.accountAccess=null;
            if(this.account.type=='super'){
                this.accountAccess=['01','02'];
                /* this.accountAccess='all';*/
            }else if(this.account.type=='admin'){
                this.accountAccess=['03','04','05','06','07','08','09'];
            }
            else if(this.account.type=='coach'){
                if(this.account.instructorAccountStatus=='certified'){

                    this.accountAccess=['10','11','16','12','13',];
                }else{
                    this.accountAccess=['13']
                }
            }else if(this.account.type=='student'){
                this.accountAccess=['14','15'];
            }
            this.initItems();
        },
        methods: {
           initItems:function () {
               /*菜单初始化配置*/
               this.itemsConfig=[
                   {
                       code:'01',
                       icon: 'admin-icon',
                       index: '/adminList',
                       title: this.$t("btn.administrator"),
                   },
                   {
                       code:'02',
                       icon: 'add-min-icon',
                       index: '/addAdmin',
                       title:this.$t("btn.add"),
                   },{
                       code:'03',
                       icon: 'msg-icon',
                       index: '/msgList',
                       title: this.$t("btn.massage"),
                   },
                   {
                       code:'04',
                       icon: 'coach-icon',
                       index: '/coachList',
                       title: this.$t("btn.coach"),
                   },
                   {
                       code:'05',
                       icon: 'student-icon',
                       index: '/adminStudentList',
                       title: this.$t("btn.studentModule"),
                   },
                   {
                       code:'06',
                       icon: 'audit-icon',
                       index: '/auditList',
                       title: this.$t("btn.auditModule"),
                   },
                   {
                       code:'07',
                       icon: 'certificate-icon',
                       index: '/certificateStatistics',
                       title: this.$t("btn.certificateModule"),
                   },
                   {
                       code:'08',
                       icon: 'school-icon',
                       index: '/schoolList',
                       title: this.$t("btn.school"),
                   }, {
                       code:'09',
                       icon: 'setting-icon',
                       index: '/setting',
                       title: this.$t("btn.settingModule"),
                   },{
                       code:'10',
                       icon: 'course-icon',
                       index: '/courseList',
                       title: this.$t("btn.myCourse"),
                   },{
                       code:'11',
                       icon: 'student-icon',
                       index: '/studentList',
                       title: this.$t("btn.myStudent"),
                   },{
                       code:'12',
                       icon: 'certificate-icon',
                       index: '/coachCertificateStatistics',
                       title: this.$t("btn.certificateModule"),
                   },{
                       code:'13',
                       icon: 'my-icon',
                       index: '/coachDetail',
                       title: this.$t("btn.my"),
                   },{
                       code:'14',
                       icon: 'course-icon',
                       index: '/studentCourseList',
                       title: this.$t("btn.myCourse"),
                   },{
                       code:'15',
                       icon: 'my-icon',
                       index: '/studentDetail',
                       title: this.$t("btn.my"),
                   }, {
                       code:'16',
                       icon: 'audit-icon',
                       index: '/userAuditList',
                       title: this.$t("btn.myAudit"),
                   },];
               /*菜单权限配置*/
               this.items=[];
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
            logout:function () {
                Vue.cookie.set('account','');
                this.$router.push({name:'login',params:{type:this.account.type}});
            },
        },
    }
</script>
