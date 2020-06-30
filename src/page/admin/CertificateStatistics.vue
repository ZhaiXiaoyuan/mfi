<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <div class="cm-btn cm-return-btn" @click="$router.back()" v-if="school">
                    <div class="wrapper">
                        <i class="icon el-icon-arrow-left"></i>
                        {{$t('btn.back')}}
                    </div>
                </div>
                <span class="title" v-if="!school">{{$t("title.certificateStatistics")}}</span>
                <span class="title" v-if="school">{{$t("title.someoneBuyRecord",{msg:this.school})}}</span>
                <div class="right-info">
                    <div class="handle-list" v-if="account.type=='school'">
                        <div class="cm-btn cm-handle-btn cm-handle-md-btn handle-btn" @click="buyModalFlag=true">{{$t("btn.buyCertificate")}}</div>
                        <div class="cm-btn cm-handle-btn cm-handle-md-btn handle-btn" @click="transpondModalFlag=true">{{$t("btn.transpondCertificate")}}</div>
                    </div>
                </div>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item">
                            <span class="label">{{$t("label.level")}}</span>
                            <el-select v-model="selectedLevel" @change="levelChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in levelOptions"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="con-item count-data">
                            <span class="label">{{$t("label.remaining")}}</span>
                            <div class="data-item" v-for="(item,index) in certificateCountData" :key="index">{{item.label}}<span class="gap-icon">:</span>{{item.value}}</div>
                        </div>
                        <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.certificateStatisticsSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list" v-if="account.type=='admin'">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.orderNo")}}
                            </th>
                            <th v-if="account.type!='school'">
                                {{$t("label.buyer")}}
                            </th>
                            <th>
                                {{$t("label.paymentAccount")}}
                            </th>
                            <th>
                                {{$t("label.school")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.count")}}
                            </th>
                            <th>
                                {{$t("label.amount")}}
                            </th>
                            <th>
                                {{$t("label.time")}}
                            </th>
                            <th>
                                {{$t("label.certificateNo")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.orderRecordId}}
                            </td>
                            <td v-if="account.type!='school'">
                                {{item.possessor?item.possessor.email:'-'}}
                            </td>
                            <td>
                                {{item.orderRecord?item.orderRecord.business:'-'}}
                            </td>
                            <td>
                                {{item.schoolSerialCode}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                {{item.orderRecord?item.orderRecord.paymentGross:'-'}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}
                            </td>
                            <td>
                                {{item.serialCode}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table class="cm-entry-list" v-if="account.type=='school'||school">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.certificateNo")}}
                            </th>
                            <th>
                                {{$t("label.buyDate")}}
                            </th>
                            <th>
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.student")}}
                            </th>
                            <th>
                                {{$t("label.instructor")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.serialCode}}
                            </td>
                            <td>
                                {{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{item.userId?item.user.name+' '+item.user.familyName:'-'}}
                            </td>
                            <td>
                                {{item.instructorId?item.instructor.name+' '+item.instructor.familyName:'-'}}
                            </td>
                            <td>
                                {{item.userId?$t('btn.used'):$t('btn.unused')}}
                            </td>
                            <td>
                                <span v-if="!item.userId">-</span>
                                <el-button class="small handle-btn" v-if="item.userId" @click="()=>{$router.push({name:'studentDetail',params:{id:item.user.id}})}">{{$t("btn.studentDetail")}}</el-button>
                                <el-button class="small handle-btn" v-if="item.userId" @click="toViewCertificate(item)">{{$t('btn.viewCertificate')}}</el-button>
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
        <canvas width="1240" id="canvas"  height="744" style="display:none;border:1px solid #d3d3d3;background:#ffffff;"></canvas>

        <el-dialog :title='account.level=="center"?$t("title.centerCoupons"):$t("title.fiveStarCenterCoupons")' class="edit-dialog cm-dialog buy-modal" :visible.sync="buyModalFlag" v-if="buyModalFlag" width="40%">
            <div class="modal-body cm-watermark">
                <div class="cm-certificate-goods-panel">
                 <!--   <div class="icon-wrap">
                        <i class="icon logo-icon"></i>
                    </div>-->
                    <ul class="type-list">
                        <li class="type-item" v-for="(item,index) in goodsList" :key="index">
                            <div class="item-hd">
                                {{item.level}}
                            </div>
                            <div class="item-bd">
                                <div class="goods-item" v-for="(goods,goodsIndex) in item.list" :key="goodsIndex">
                                    <p class="icon-wrap">
                                        <i class="icon shell-icon"></i>
                                    </p>
                                    <p>{{$t("value.cCount",{count:goods.count})}} ${{goods.price}}</p>
                                    <p class="off">{{goods.off}}off</p>
                                    <div class="cm-btn handle-btn">
                                        <!--   {{$t("btn.toBuy")}}-->
                                        <pay-btn :options="{target:goods.id,item:goods,callback:toPay}"></pay-btn>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="buyModalFlag=false">{{$t("btn.cancel")}}</div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("btn.transpondCertificate")' class="cm-dialog transpond-modal" :visible.sync="transpondModalFlag" v-if="transpondModalFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="transpondForm.level" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in certificateCountData"
                            :key="index"
                            :label="item.label"
                            :value="item.label" v-if="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.count")}}</span>
                    <input type="text" v-model="transpondForm.count" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.instructor")}}</span>
                   <!-- <el-select v-model="transpondForm.instructorId" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in coachList"
                            :key="item.id"
                            :label="item.email"
                            :value="item.id">
                        </el-option>
                    </el-select>-->

                    <div class="view-win">
                        <el-table
                            ref="multipleTable"
                            :data="coachList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="180"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="40">
                            </el-table-column>
                            <el-table-column :label='$t("label.account")' width="180">
                                <template slot-scope="scope">{{ scope.row.email }}</template>
                            </el-table-column>
                            <el-table-column :label='$t("label.level")'>
                                <template slot-scope="scope">{{ scope.row.mfiLevel }}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="transpondModalFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveTranspond">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .buy-modal{
        .modal-body{
            height: 300px;
            overflow-y: auto;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 5px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 2px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                display: none;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 5px;
                background: rgba(0,0,0,0.2);
            }
        }
        .handle-list{
            align-items: center;
            justify-content: center;
        }
    }
    .transpond-modal{
        .el-dialog__body{
            height: 440px;
            .view-win{
                width: 300px;
                box-shadow: 0px 1px 10px rgba(85, 96, 170, 0.3);
                border-radius: 10px;
                overflow: hidden;
                .el-table{
                    &:before{
                        display: none;
                    }
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
        data() {
            return {
                school:null,
                schoolName:null,
                account:{},
                coach:{},

                levelOptions:[
                    {
                        value:null,
                        label:this.$t("btn.all"),
                    },
                    {
                        value:'M0',
                        label:'M0',
                    },
                    {
                        value:'M1',
                        label:'M1',
                    },
                    {
                        value:'M2',
                        label:'M2',
                    },
                    {
                        value:'M3',
                        label:'M3',
                    },
                    {
                        value:'BMI',
                        label:'BMI',
                    },
                    {
                        value:'MI',
                        label:'MI',
                    },
                    {
                        value:'MMI',
                        label:'MMI',
                    },
                    {
                        value:'MIT',
                        label:'MIT',
                    },
                ],

                selectedLevel:null,


                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],

                buyModalFlag:false,

                goodsList:[],
                curGoods:null,

                certificateCountData:[],

                coachList:[],
                transpondModalFlag:false,
                transpondForm:{
                    instructorId:[]
                },

                bgImg:require('../../images/common/card-bg.jpg'),
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
                    possessorId:this.account.type==='admin'?'':this.account.id,
                    mfiLevel:this.selectedLevel,
                    certificateState:null,
                    searchContent:this.keyword,
                    /*schoolSerialCode:this.account.type=='school'?this.account.serialCode:(this.school?this.school:''),*/
                    schoolSerialCode:''
                }
                this.pager.loading=true;
                Vue.api.getInstructorBuyCertificate(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.certificateList);
                        this.entryList=[];
                        list.forEach((item,i)=>{
                            item.possessor=item.possessor?JSON.parse(item.possessor):null;
                            item.user=item.user?JSON.parse(item.user):null;
                            item.instructor=item.instructor?JSON.parse(item.instructor):null;
                            if(item.orderRecord){
                                let orderInfo=JSON.parse(item.orderRecord);
                               /* orderInfo.tpMsg=JSON.parse(orderInfo.tpMsg);*/
                                item.orderRecord=orderInfo;
                            }
                            this.entryList.push(item);
                        });
                      /*  console.log('this.entryList:',this.entryList)*/
                        this.pager.total=data.count;
                    }
                });
            },
            getCertificateCount:function (pageIndex) {
                let params={
                    possessorId:this.account.id,
                }
                Vue.api.getEmptyCertificateCountList(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.certificateCountData=[];
                        this.certificateCountData.push({label:'M0',value:data.M0});
                        this.certificateCountData.push({label:'M1',value:data.M1});
                        this.certificateCountData.push({label:'M2',value:data.M2});
                        this.certificateCountData.push({label:'M3',value:data.M3});
                        this.certificateCountData.push({label:'BMI',value:data.BMI});
                        this.certificateCountData.push({label:'MI',value:data.MI});
                        this.certificateCountData.push({label:'MMI',value:data.MMI});
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },
            toPay:function (data) {
                let interval=null;
                let item=data.item;
                let alertInstance=this.alert({
                    title:"",
                    html:'<div style="text-align: center;"><div><i class="icon loading-icon"></i></div><div>'+this.$t('tips.payingTips')+'</div></div>',
                    yes:this.$t('btn.cancel'),
                    lock:true,
                    ok:()=>{
                        clearInterval(interval);
                        clearInterval(interval);
                    }
                });
                interval=setInterval(()=>{
                    Vue.api.getOrderRecordInvoice({timeStamp:Vue.tools.genTimestamp(),invoice:data.invoice}).then((resp)=>{
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            this.getList(1);
                            this.getCertificateCount();
                            alertInstance.close();
                            clearInterval(interval);
                            Vue.operationFeedback({type:'complete',text:this.$t("tips.payS")});
                            if(item&&item.gift){
                                this.alert({
                                    title:this.$t("title.tips"),
                                    html:'<div style="text-align: center;"><p style="font-size: 16px;">'+this.$t("tips.giftTips",{count:item.count,msg:this.$t("value."+item.gift)})+'</p></div>',
                                    yes:this.$t("btn.sure"),
                                })
                            }
                        }else{

                        }
                    });
                },5000)
            },
            getCoachList:function () {
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:1,
                    pageSize:500,
                    mfiLevel:null,
                    instructorAccountStatus:null,
                    searchContent:'',
                    school:this.account.type=='school'?this.account.serialCode:(this.school?this.school:''),
                }
                this.pager.loading=true;
                Vue.api.getCoachList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.coachList=[];
                        let list=data.instructorList;
                        list.forEach((item,i)=>{
                            this.coachList.push({
                                ...item.instructorPayment,
                                ...item.user
                            })
                        })
                        this.pager.total=data.count;
                    }
                });
            },
            saveTranspond:function () {
                if(!regex.pInt.test(this.transpondForm.count)){
                    Vue.operationFeedback({type:'warn',text:this.$t("tips.pInt")});
                    return;
                }
                if(!this.transpondForm.level){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.level")});
                    return;
                }
                if(!this.transpondForm.instructorId||this.transpondForm.instructorId.length===0){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.instructor")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    from:this.account.id,
                    toJsonArrayString:JSON.stringify(this.transpondForm.instructorId),
                    mfiLevel:this.transpondForm.level,
                    count:this.transpondForm.count
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.addCertificateTranspondInBatch(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getCertificateCount();
                        this.getList(1);
                        this.transpondForm.instructorId=[];
                        this.transpondModalFlag=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },

            toViewCertificate:function (item) {
                console.log('item:',item);
                this.draw({
                    id:'canvas',
                    avatar:Vue.basicConfig.filePrefix+item.user.headPic,
                    name:item.user.name+' '+item.user.familyName,
                    level:item.mfiLevel=='BMI'?'BASIC MERMAID INSTRUCTOR':item.mfiLevel,
                    certificateNo:item.serialCode,
                    date:Vue.formatDate(item.updatedAt,'yyyy-MM-dd'),
                    issuer:item.schoolSerialCode,
                    instructor:item.possessor.name+(item.possessor.familyName?item.possessor.familyName:''),
                    callback:(data)=>{
                        Vue.viewPicModal({
                            imgUrl:data,
                        });
                    }
                });
            },
            circleImg:function(ctx, img, x, y, r) {
                ctx.save();
                var d =2 * r;
                var cx = x + r;
                var cy = y + r;
                ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                ctx.clip();
                ctx.drawImage(img, x, y, d, d);
                ctx.restore();
            },
            drawText:function (ctx,text,x,y,fontSize) {
                fontSize=fontSize?fontSize:32;
                ctx.save();
                ctx.font = fontSize+"px ' Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei'";
                ctx.fillStyle = "#333";
                ctx.fillText(text,x,y,300);
                ctx.restore();
            },
            draw:function (options) {
                let that=this;
                var canvas=document.getElementById(options.id);
                var ctx=canvas.getContext("2d");

                ctx.save();
                let bgImg=new Image();
                bgImg.crossOrigin="anonymous";
                bgImg.src=this.bgImg;
                bgImg.onload=function(){
                    ctx.drawImage(bgImg,0,0);
                    ctx.restore();


                    ctx.save();
                    var img = new Image();
                    img.crossOrigin="anonymous";
                    img.src = options.avatar;
                    img.onload=function () {
                        that.circleImg(ctx, img, 95, 80, 150);
                        ctx.restore();
                        //
                        that.drawText(ctx,'Name:',710,100);
                        that.drawText(ctx,options.name,815,100,'40');

                        that.drawText(ctx,'Level:',718,145);
                        that.drawText(ctx,options.level,815,145);

                        that.drawText(ctx,'Certification Number:',503,190);
                        that.drawText(ctx,options.certificateNo,815,190);

                        that.drawText(ctx,'Certification Date:',548,235);
                        that.drawText(ctx,options.date,815,235);

                        that.drawText(ctx,'Issuing Instructor:',533,280);
                        that.drawText(ctx,options.instructor,815,280);

                        that.drawText(ctx,'Issuing School:',568,325);
                        that.drawText(ctx,options.issuer,815,325);

                        //
                        let dataUrl = canvas.toDataURL('image/jpeg');
                        options.callback&&options.callback(dataUrl);
                    }
                }
            },
            handleSelectionChange:function (data) {
                let idArr=[];
                data.forEach((item,index)=>{
                    idArr.push(item.id);
                });
                this.transpondForm.instructorId=idArr;
            },
            //给学校发送证书
            test:function (level,count) {
                let params={
                    ...Vue.sessionInfo(),
                    adminId:'d49448cc17af4cacbbb9d03b1332c1b9',
                    schoolId:this.account.id,
                    mfiLevel:level,
                    quantity:count
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.sentUnuseCertificateToSchools(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            }
        },
        mounted () {
            /**/
            this.school=this.$route.params.school;
            this.schoolName=this.$route.params.schoolName;
            /**/
            this.account=Vue.getAccountInfo();
            /**/
            this.getList();
            /**/
            this.goodsList=this.account.level=='center'?Vue.tools.centerGoodsList:Vue.tools.fiveStarCenterGoodsList;
            /**/
            if(this.account.type=='school'){
                this.getCertificateCount();
                this.getCoachList();
            }

        },
    }
</script>
