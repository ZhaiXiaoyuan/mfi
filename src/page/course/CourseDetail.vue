<template>
    <div class="page-content msg-detail">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back();">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-detail-block detail-block">
                    <div class="block-bd cm-watermark">
                       <p class="title cm-title" style="padding-left: 5px;">{{$t("title.courseDetail",{ msg:course.courseNo})}}</p>
                        <el-row>
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.courseNo')}}：</span>
                                <span class="value">{{course.courseId}}</span>
                            </el-col>
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.level')}}：</span>
                                <span class="value">{{course.mfiLevel}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 10px;">
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.courseName')}}：</span>
                                <span class="value">{{course.courseName}}</span>
                            </el-col>
                            <el-col :span="12" class="info-item" s>
                                <span class="label">{{$t('label.startTime')}}：</span>
                                <span class="value">{{course.startTime}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 10px;">
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.instructor')}}：</span>
                                <span class="value">{{course.instructorEmail}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.studentInfo")}}</span>
                <span class="right-info">{{$t("label.rest",{ msg:course.mfiLevel})}}{{unusedList.length}}</span>
            </div>

            <div class="panel-bd" v-if="account.type!='coach'">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.account")}}
                            </th>
                            <th>
                                {{$t("label.name")}}
                            </th>
                            <th>
                                {{$t("label.health")}}
                            </th>
                            <th>
                                {{$t("label.theory")}}
                            </th>
                            <th>
                                {{$t("label.studio")}}
                            </th>
                            <th>
                                {{$t("label.pool")}}
                            </th>
                            <th>
                                {{$t("label.openWater")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th v-if="account.type=='school'">
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.studentEmail}}
                            </td>
                            <td>
                                <span class="cm-text">{{item.studentName}}</span>
                            </td>
                            <td>
                               <span class="cm-text" :class="{'pass':item.mfiLevelState.liabilityRelease=='pass'}">{{partStatus[item.mfiLevelState.liabilityRelease]}}</span>
                            </td>
                            <td>
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.classroom=='pass'}"> {{partStatus[item.mfiLevelState.classroom]}}</span>
                            </td>
                            <td>
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.studio=='pass'}"> {{partStatus[item.mfiLevelState.studio]}}</span>
                            </td>
                            <td>
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.confinedWater=='pass'}"> {{partStatus[item.mfiLevelState.confinedWater]}}</span>
                            </td>
                            <td>
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.openWater=='pass'}"> {{partStatus[item.mfiLevelState.openWater]}}</span>
                            </td>
                            <td>
                                <span class="cm-text">{{grantStatus[item.certificate.length>20?'granted':item.certificate]}}</span>
                            </td>
                            <td v-if="account.type=='school'">
                                <span class="handle" v-if="item.certificate=='pending'||item.certificate=='granted'">&mdash;</span>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="toStudent(item)" v-if="item.certificate=='waiting'||item.certificate=='grant'||(item.certificate&&item.certificate.length>20)">{{$t('btn.detail')}}</el-button>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="grant(item)"  v-if="item.certificate=='waiting'&&unusedList.length>0">{{$t('btn.grant')}}</el-button>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}"  v-if="item.certificate=='waiting'" @click="toBuyModal(certificateGoods,item)">{{$t('btn.buyToGrant')}}</el-button>
                                <el-button class="small handle-btn"  @click="reSentStudentActivationEmail(item)" v-if="account.type=='school'&&item.studentState=='nonActivated'">{{$t('btn.activationEmail')}}</el-button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        @current-change="getList"
                        :prev-text='$t("btn.prev")'
                        :next-text='$t("btn.next")'
                        :current-page="pager.pageIndex"
                        :page-size="pager.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
            <!--教师角色-->
            <div class="panel-bd" v-if="account.type=='coach'">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.account")}}
                            </th>
                            <th>
                                {{$t("label.name")}}
                            </th>
                            <th>
                                {{$t("label.health")}}
                            </th>
                            <th>
                                {{$t("label.theory")}}
                            </th>
                            <th>
                                {{$t("label.studio")}}
                            </th>
                            <th>
                                {{$t("label.pool")}}
                            </th>
                            <th>
                                {{$t("label.openWater")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                             <th v-if="course.ownerId==account.id">
                                 {{$t("label.handle")}}
                             </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.studentEmail}}
                            </td>
                            <td>
                                <span class="cm-text">{{item.studentName}}</span>
                            </td>
                            <td>
                                <span class="cm-text" v-if="item.mfiLevelState.liabilityRelease=='-'">{{partStatus[item.mfiLevelState.liabilityRelease]}}</span>
                                <el-select v-model="item.mfiLevelState.liabilityRelease" :disabled="item.mfiLevelState.liabilityRelease=='pass'" @change="saveStatus(item)" class="status-selector" :class="{'pass':item.mfiLevelState.liabilityRelease=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.liabilityRelease!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <span class="cm-text" v-if="item.mfiLevelState.classroom=='-'">{{partStatus[item.mfiLevelState.classroom]}}</span>
                                <el-select v-model="item.mfiLevelState.classroom" :disabled="item.mfiLevelState.classroom=='pass'"   @change="saveStatus(item)" class="status-selector" :class="{'pass':item.mfiLevelState.classroom=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.classroom!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <span class="cm-text" v-if="item.mfiLevelState.studio=='-'">{{partStatus[item.mfiLevelState.studio]}}</span>
                                <el-select v-model="item.mfiLevelState.studio" :disabled="item.mfiLevelState.studio=='pass'" @change="saveStatus(item)" class="status-selector" :class="{'pass':item.mfiLevelState.studio=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.studio!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <span class="cm-text" v-if="item.mfiLevelState.confinedWater=='-'">{{partStatus[item.mfiLevelState.confinedWater]}}</span>
                                <el-select v-model="item.mfiLevelState.confinedWater" :disabled="item.mfiLevelState.confinedWater=='pass'" @change="saveStatus(item)" class="status-selector" :class="{'pass':item.mfiLevelState.confinedWater=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.confinedWater!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <span class="cm-text" v-if="item.mfiLevelState.openWater=='-'">{{partStatus[item.mfiLevelState.openWater]}}</span>
                                <el-select v-model="item.mfiLevelState.openWater" :disabled="item.mfiLevelState.openWater=='pass'" @change="saveStatus(item)" class="status-selector" :class="{'pass':item.mfiLevelState.openWater=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.openWater!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <span class="cm-text">{{grantStatus[item.certificate.length>20?'granted':item.certificate]}}</span>
                            </td>
                            <td v-if="course.ownerId==account.id">
                                  <span class="handle" v-if="item.certificate=='pending'||item.certificate=='granted'">&mdash;</span>
                                  <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="toStudent(item)" v-if="item.certificate=='waiting'||item.certificate=='grant'||(item.certificate&&item.certificate.length>20)">{{$t('btn.detail')}}</el-button>
                                  <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="grant(item)"  v-if="item.certificate=='waiting'&&unusedList.length>0">{{$t('btn.grant')}}</el-button>
                                  <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}"  v-if="item.certificate=='waiting'"  @click="toBuyModal(certificateGoods,item)">{{$t('btn.buyToGrant')}}</el-button>
                                  <el-button class="small handle-btn"  @click="reSentStudentActivationEmail(item)" v-if="account.type=='coach'&&item.studentState=='nonActivated'">{{$t('btn.activationEmail')}}</el-button>
<!--
                                  <el-button class="small handle-btn" @click="toViewCertificate(item)" v-if="(item.certificate&&item.certificate.length>20)">{{$t('btn.viewCertificate')}}</el-button>
-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        class="cm-pager"
                        @current-change="getList"
                        :prev-text='$t("btn.prev")'
                        :next-text='$t("btn.next")'
                        :current-page="pager.pageIndex"
                        :page-size="pager.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <div class="cm-btn cm-add-btn" :class="{'cm-disabled':account.type=='coach'&&(account.instructorAccountStatus!='certified'||account.instructorQualification=='notPay')||(account.type=='school'&&(account.state!='pass'||account.schoolQualification=='notPay'))}" v-if="(account.type=='coach'||account.type=='school')&&course.ownerId==account.id" @click="toAdd()">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t('btn.addStudent')}}</p>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .msg-detail{
        .panel-hd{
            position: relative;
        }
        .time{
            position: absolute;
            right: 0px;
            bottom: 0px;
            color: #fff;
            padding: 10px;
            opacity: 0.7;
        }
    }
    .msg-content{
        min-height: 600px;
    }
    .pass{
        display: inline-block;
        padding: 0px 10px;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        color: #fff;
        background: #ec95bd;
        border-radius: 14px;
    }
    .status-selector{
        width: 100px;
        border-radius: 16px;
        background: #999;
        input{
            background: none !important;
            border: none !important;
            color: #fff !important;
        }
        i{
            color: #fff!important;
        }
        &.pass{
            height: 32px;
            background: #ec95bd;
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
                id:null,
                course:{},
                account:{},
                coach:{},

                partStatus:{
                  'need':this.$t('btn.waitingStatus'),
                  'pass':this.$t('btn.completeStatus'),
                    '-':'-',
                },
                grantStatus:{
                    pending:this.$t('btn.pendingGrant'),
                    waiting:this.$t('btn.waitingGrant'),
                    granted:this.$t('btn.granted'),
                },
                statusOptions:[
                    {
                        label:this.$t('btn.completeStatus'),
                        value:'pass',
                    },
                    {
                        label:this.$t('btn.waitingStatus'),
                        value:'',
                    },
                ],
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                isLoading:false,

                unusedList:[],
                bgImg:require('../../images/common/card-bg.jpg'),

                granting:false,
                requesting:false,

                certificateGoods:null,
            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    courseId:this.id,
                }
                this.pager.loading=true;
                Vue.api.getCourseStudentList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.courseParticipantList);
                        this.entryList.forEach((item,i)=>{
                            item.mfiLevelState=JSON.parse(item.mfiLevelState)
                        })
                     /*   console.log('this.entryList:',this.entryList);*/
                        this.pager.total=data.count;
                    }
                });
            },
            getCourse:function () {
                let params={
                    ...Vue.sessionInfo(),
                    courseId:this.id,
                }
                Vue.api.getCourseDetail(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.course={...data.course,instructorEmail:data.instructorEmail,instructorName:data.instructorName};
                        console.log('this.course:',this.course);
                        this.getUnusedCertificate();
                    }
                });
            },
            getUnusedCertificate:function (callback) {
                let params={
                    ...Vue.sessionInfo(),
                    possessorId:this.course.ownerId,
                    mfiLevel:this.course.mfiLevel,
                    certificateState:'unuse',
                    pageSize:200,
                    pageIndex:1,
                    searchContent:'',
                    schoolSerialCode:this.account.type=='school'?this.course.school:''
                }
                Vue.api.getInstructorBuyCertificate(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.unusedList=JSON.parse(data.certificateList);
                        callback&&callback(this.unusedList);
                    }
                });
            },
            saveStatus:function (item) {
                if(this.isLoading){
                    return;
                }
                var state=item.mfiLevelState;
                let params={
                    ...Vue.sessionInfo(),
                    userId:state.userId,
                    mfiLevel:state.mfiLevel,
                    classroom:state.classroom!='pass'?'':'pass',
                    confinedWater:state.confinedWater!='pass'?'':'pass',
                    liabilityRelease:state.liabilityRelease!='pass'?'':'pass',
                    openWater:state.openWater!='pass'?'':'pass',
                    studio:state.studio!='pass'?'':'pass',
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save"),delayForDelete:1000});
                this.isLoading=true;
                Vue.api.setStudentMfiLevelState(params).then((resp)=>{
                    this.isLoading=false;
                    if(resp.respCode=='2000'){
                        this.getList();
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            toStudent:function (item) {
                this.$router.push({name:'studentDetail',params:{id:item.mfiLevelState.userId}});
            },
            grant:function (item) {
                this.$confirm(this.$t("tips.grant",{msg:item.studentName,level:item.mfiLevelState.mfiLevel}), this.$t("title.tips"), {
                    confirmButtonText: this.$t("btn.sure"),
                    cancelButtonText: this.$t("btn.cancel"),
                }).then(() => {
                    this.grantSubmit(item);
                }).catch(() => {

                });
            },
            grantSubmit:function (item,callback) {
                let certificate=this.unusedList.pop();
                let params={
                    ...Vue.sessionInfo(),
                    certificateId:certificate.id,
                    userId:item.mfiLevelState.userId,
                    possessorId:this.account.id,
                    instructorId:this.course.instructorId,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                Vue.api.grant(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getList();
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                        callback&&callback();
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{msg:resp.respMsg})});
                    }
                });
            },
            adminGrant:function (item) {//管理员授予
                var state=item.mfiLevelState;
                let params={
                    ...Vue.sessionInfo(),
                    userId:state.userId,
                    mfiLevel:state.mfiLevel,
                    adminId:this.account.id
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle"),delayForDelete:1000});
                Vue.api.grantByAdmin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getList();
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },
            toViewCertificate:function (item) {
                console.log('item:',item);
            },
            toAdd:function () {
                console.log('this.id:',this.id);
                this.$router.push({name:'addStudent',params:{'id':this.id}});
            },
            toPay:function (item) {
                let interval=null;
                let payModalInstance=this.payModal({
                    userId:this.account.id,
                    level:this.course.mfiLevel,
                    title:this.$t('title.toPaypal'),
                    tips:this.$t('tips.buyM0Tips',{count:this.course.mfiLevel=='M0'?20:1,level:this.course.mfiLevel}),
                    callback:(data)=>{
                       // payModalInstance.close();

                        let alertInstance=this.alert({
                            title:"",
                            html:'<div style="text-align: center;"><div><i class="icon loading-icon"></i></div><div>'+this.$t('tips.payingTips')+'</div></div>',
                            yes:this.$t('btn.cancel'),
                            lock:true,
                            ok:()=>{
                                payModalInstance.close();
                            }
                        });
                        interval=setInterval(()=>{
                            Vue.api.getOrderRecordInvoice({timeStamp:Vue.tools.genTimestamp(),invoice:data.invoice}).then((resp)=>{
                                if(resp.respCode=='2000'){
                                    let data=JSON.parse(resp.respMsg);
                                    alertInstance.close();
                                    clearInterval(interval);
                                    //
                                    this.getUnusedCertificate((data)=>{
                                        if(data.length>0&&!this.granting){
                                            this.granting=true;
                                            this.grantSubmit(item,()=>{
                                                Vue.operationFeedback({type:'complete',text:this.$t("tips.handleS")});
                                                payModalInstance.close();
                                            });
                                        }
                                    })
                                }else{

                                }
                            });
                        },5000)
                    },
                    closeCallback:()=>{
                        clearInterval(interval);
                    }
                });
            },
            reSentStudentActivationEmail:function (item) {
                if(this.requesting){
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    email:item.studentEmail,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                this.requesting=true;
                Vue.api.reSentStudentActivationEmail(params).then((resp)=>{
                    this.requesting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },

            getGoods:function () {
                let params={
                    ...Vue.sessionInfo(),
                    type:'certificate',//certificate、instructorQualification、goods、certificateInBatch、professionalMembersFee、schoolQualification
                    pageIndex:1,
                    pageSize:20,
                }
                Vue.api.getGoodsList(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.goodsList;
                        list.reverse();
                        this.certificateGoods=list.find((item,index)=>{
                            return this.course.mfiLevel===item.id
                        });
                    }
                });
            },
            toBuyModal:function (goods,item) {
                this.payOrderModal({
                    id:goods.id,
                    title:'订单支付',
                    tips:'<p>支付项：'+goods.name+'</p><p>金额：￥'+goods.realPrice+'</p>',
                    callback:(data)=>{
                        this.getUnusedCertificate((data)=>{
                            if(data.length>0&&!this.granting){
                                this.granting=true;
                                this.grantSubmit(item,()=>{
                                    Vue.operationFeedback({type:'complete',text:this.$t("tips.handleS")});
                                });
                            }
                        })
                    },
                    cancelCallback:()=>{

                    }
                });
            }
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;

            /**/
            this.getCourse();
            this.getList();
            if(this.account.type!=='admin'){
                this.getGoods();
            }
            //
            let testArr=[1,2,3,4]
            for(let i=0;i<4;i++){
                testArr.splice(0,1);
            }
        },
    }
</script>
