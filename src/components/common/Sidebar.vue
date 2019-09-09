<template>
    <div class="sidebar" :class="{'active':show}">
        <div class="cm-btn menu-icon menu-btn" @click="menuHandle()"></div>
        <div class="sidebar-content">
            <div class="user-info">
                <i class="icon logo-icon"></i>
                <p class="name">MFI&nbsp;EOS</p>
                <p class="role">{{this.$t("title."+account.type)}}</p>
                <p class="account">{{$t('label.account')}}：{{account.account?account.account:account.email}}</p>
            </div>
            <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff"
                     text-color="#888" active-text-color="#48b4ff" unique-opened router>
                <template v-for="(item,index) in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" @click="menuHandle()" :key="item.index">
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
                        <el-menu-item :index="item.index" @click="menuHandle()" :class="{'active':pageName&&pageName.indexOf(item.code)>-1}" :key="item.index">
                            <span class="line"></span>
                            <span class="icon-wrap"> <i class="icon" :class="item.icon"></i></span>
                            <span class="title" slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
            <div class="cm-btn cm-handle-btn cm-handle-md-btn switch-btn" v-if="account.type=='student'||account.type=='coach'" @click="switchRole()">{{account.type=='student'?$t("btn.switchToInstructor"):$t("btn.switchToStudent")}}</div>
            <div class="cm-btn logout-btn" @click="logout()">{{$t("btn.logout")}}</div>
        </div>
        <div class="sidebar-mask" @click="menuHandle()"></div>
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
        z-index: 200;
        .user-info{
            padding: 20px 10px;
            text-align: center;
            color: #5560aa;
            font-size: 20px;
            background: #fff8fe;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .name{
                margin-top: 5px;
                font-size: 20px;
            }
            .role{
                font-size: 28px;
            }
            .account{
                margin-top: 10px;
                font-size: 16px;
            }
        }
        .switch-btn{
            position: absolute;
            left: 0px;
            right: 0px;
            margin: auto;
            bottom: 100px;
            width: 220px;
        }
        .sidebar-content{
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
        }
        .sidebar-mask{
            display: none;
            position: fixed;
            z-index: 1;
            top:0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
        }
        .menu-btn{
            display: none;
            position: fixed;
            z-index: 300;
            top:10px;
            left: 15px;
            width: 28px;
            height: 28px;
        }
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width:100%;
    }
    .sidebar .sidebar-el-menu {
        height:100%;
        .icon-wrap{
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            transform: scale(0.9);
        }
        li{
            display: flex;
            align-items: center;
            height: 54px;
            line-height: normal;
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
                font-size: 16px;
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
        bottom: 10px;
        margin: auto;
        background: url("../../images/common/logout-btn.png") no-repeat;
        width: 220px;
        height: 70px;
        background-size: 100% 100%;
        font-size: 18px;
        color: #fff;
        text-align: center;
        line-height: 65px;
    }
    @media screen and (max-width: 1600px) {
        .logo-icon{
            width: 60px;
            height: 58px;
        }
        .sidebar{
            width: 250px;
            .user-info{
                padding: 15px 5px 15px 5px;
                .name{
                    font-size: 16px;
                }
                .role{
                    font-size: 24px;
                }
                .account{

                }
            }
            .switch-btn{
                bottom: 70px;
                width: 180px;
            }
        }
        .sidebar .sidebar-el-menu{
            .icon-wrap{
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25px;
            }
            li{
                height: 50px;
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
            height: 54px;
            line-height: 52px;
            font-size: 14px;
            bottom: 5px;
        }
    }
    @media screen and (max-width: 1000px) {
        .sidebar{
            width: 200px;
            left: -200px;
            transition: left 0.3s;
            .logo-icon{
                width: 48px;
                height: 46.4px;
            }
            .user-info{
                padding: 15px 5px 15px 5px;
                .name{
                    margin-top: 5px;
                    font-size: 14px;
                }
                .role{
                    font-size: 20px;
                }
                .account{
                    margin-top: 5px;
                    font-size: 12px;
                }
            }
            .switch-btn{
                display: none;
                bottom: 70px;
                width: 180px;
            }
            .sidebar-el-menu{
                li{
                    height: 48px;
                    .line{
                        width: 5px;
                    }
                    .title{
                        font-size: 14px;
                    }
                }
            }
            .menu-btn{
                display: block;
            }
            &.active{
                left: 0px;
                .sidebar-mask{
                    display: block;
                }
            }
        }
        .logout-btn{
            width: 180px;
            height: 54px;
            line-height: 52px;
            font-size: 14px;
            bottom: 5px;
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
                show:false,
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
                this.accountAccess=['adminList','addAdmin'];
                /* this.accountAccess='all';*/
            }else if(this.account.type=='admin'){
                this.accountAccess=['msgList','coachList','adminStudentList','schoolList','material','mall','auditList','certificateStatistics','setting'];
            }
            else if(this.account.type=='coach'){
                if(this.account.instructorAccountStatus!='certified'||this.account.professionalMembersFee=='notPay'||this.account.professionalMembersFee=='expire'||this.account.instructorQualification=='notPay'||this.account.instructorQualification=='expire'){
                    this.accountAccess=['coachDetail']
                }else{
                    this.accountAccess=['msgList','material','courseList','studentList','userAuditList','coachCertificateStatistics','mall','coachDetail',];
                }
            }else if(this.account.type=='student'){
                this.accountAccess=['studentCourseList','material','studentDetail'];
            }else if(this.account.type=='school'){
                if(this.account.schoolQualification=='notPay'||this.account.schoolQualification=='expire'){
                    this.accountAccess=['schoolDetail'];
                }else{
                    this.accountAccess=['coachList','schoolStudentList','schoolCourseList','certificateStatistics','mall','schoolDetail'];
                }
            }
            this.initItems();
        },
        methods: {
            initItems:function () {
               /*菜单初始化配置*/
               this.itemsConfig=[
                   {
                       code:'adminList',
                       icon: 'admin-icon',
                       index: '/adminList',
                       title: this.$t("btn.administrator"),
                   },
                   {
                       code:'addAdmin',
                       icon: 'add-min-icon',
                       index: '/addAdmin',
                       title:this.$t("btn.add"),
                   },{
                       code:'msgList',
                       icon: 'msg-icon',
                       index: '/msgList',
                       title: this.$t("btn.message"),
                   },
                   {
                       code:'coachList',
                       icon: 'coach-icon',
                       index: '/coachList',
                       title: this.$t("btn.coach"),
                   },
                   {
                       code:'mall',
                       icon: 'mall-icon',
                       index: '/mallHome',
                       title: this.$t("btn.mall"),
                   },
                   {
                       code:'material',
                       icon: 'material-icon',
                       index: '/materialList',
                       title: this.$t("btn.teachingMaterial"),
                   },
                   {
                       code:'adminStudentList',
                       icon: 'student-icon',
                       index: '/adminStudentList',
                       title: this.$t("btn.studentModule"),
                   },
                   {
                       code:'schoolStudentList',
                       icon: 'student-icon',
                       index: '/schoolStudentList',
                       title: this.$t("btn.studentModule"),
                   },
                   {
                       code:'schoolCourseList',
                       icon: 'course-icon',
                       index: '/schoolCourseList',
                       title: this.$t("btn.courseLen"),
                   },
                   {
                       code:'auditList',
                       icon: 'audit-icon',
                       index: '/auditList',
                       title: this.$t("btn.auditModule"),
                   },
                   {
                       code:'certificateStatistics',
                       icon: 'certificate-icon',
                       index: '/certificateStatistics',
                       title: this.$t("btn.certificateModule"),
                   },
                   {
                       code:'schoolList',
                       icon: 'school-icon',
                       index: '/schoolList',
                       title: this.$t("btn.school"),
                   }, {
                       code:'setting',
                       icon: 'setting-icon',
                       index: '/setting',
                       title: this.$t("btn.settingModule"),
                   },{
                       code:'courseList',
                       icon: 'course-icon',
                       index: '/courseList',
                       title: this.$t("btn.myCourse"),
                   },{
                       code:'studentList',
                       icon: 'student-icon',
                       index: '/studentList',
                       title: this.$t("btn.myStudent"),
                   },{
                       code:'coachCertificateStatistics',
                       icon: 'certificate-icon',
                       index: '/coachCertificateStatistics',
                       title: this.$t("btn.certificateModule"),
                   },{
                       code:'coachDetail',
                       icon: 'my-icon',
                       index: '/coachDetail',
                       title: this.$t("btn.my"),
                   },{
                       code:'studentCourseList',
                       icon: 'course-icon',
                       index: '/studentCourseList',
                       title: this.$t("btn.myCourse"),
                   },{
                       code:'studentDetail',
                       icon: 'my-icon',
                       index: '/studentDetail',
                       title: this.$t("btn.my"),
                   }, {
                       code:'userAuditList',
                       icon: 'audit-icon',
                       index: '/userAuditList',
                       title: this.$t("btn.myAudit"),
                   },{
                       code:'schoolDetail',
                       icon: 'my-icon',
                       index: '/schoolDetail',
                       title: this.$t("btn.my"),
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
            switchRole:function () {
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                let params={
                    timeStamp:Vue.tools.genTimestamp(),
                    userId:this.account.id,
                    type:this.account.type=='student'?'toInstructor':'toStudent',
                }
                Vue.api.switchLogin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.account.oldType=this.account.type;
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                        let targetUrl=window.location.href.split('#')[0];
                        if(this.account.type=='coach'){
                            this.account.type='student';
                            targetUrl+='#/studentDetail';
                        }else{
                            this.account.type='coach';
                            targetUrl+='#/coachDetail'
                        }
                        this.$cookie.set('account',JSON.stringify(this.account),7);
                        localStorage.setItem('switching','true');
                        window.location.reload();
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})})
                    }
                });
            },
            logout:function () {
                Vue.cookie.set('account','');
                this.$router.push({name:'login',params:{type:this.account.type}});
            },
            menuHandle:function () {
                this.show=!this.show;
            }
        },
    }
</script>
