<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title" v-if="account.type=='coach'">{{$t("title.certificateRecord")}}</span>
                <span class="title"  v-if="account.type=='admin'">{{$t("title.someoneCertificateRecord",{msg:coach.name})}}</span>
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
                        <div class="con-item con-item-search">
                            <el-input :placeholder="$t('holder.certificateStatisticsSearch')" v-model="keyword" class="cm-search">
                                <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.certificateNo")}}
                            </th>
                            <th>
                                {{$t("label.buyDate")}}
                            </th>
                            <th>
                                {{$t("label.school")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th>
                                {{$t("label.student")}}
                            </th>
                            <th>
                                {{$t("label.grantDate")}}
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
                               {{item.createdAt|formatDate('yyyy-MM-dd')}}
                            </td>
                            <td>
                                {{item.schoolSerialCode}}
                            </td>
                            <td>
                                {{item.userId?$t('btn.used'):$t('btn.unused')}}
                            </td>
                            <td>
                                {{item.userId?item.user.email:'-'}}
                            </td>
                            <td>
                                <span v-if="item.userId">
                                    {{item.updatedAt|formatDate('yyyy-MM-dd')}}
                                </span>
                                <span v-if="!item.userId">-</span>
                            </td>
                            <td>
                                <el-button class="small handle-btn" v-if="item.userId" @click="toViewCertificate(item)">{{$t('btn.viewCertificate')}}</el-button>
                                <span v-if="!item.userId">-</span>
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
        <canvas width="1200" id="canvas"  height="675" style="display:none;border:1px solid #d3d3d3;background:#ffffff;"></canvas>
        <el-dialog :title='$t("title.newCoach")' class="edit-dialog cm-dialog school-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.email")}}</span>
                    <input type="text" v-model="newForm.email" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.level")}}</span>
                    <el-select v-model="newForm.level" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in levelOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.school")}}</span>
                    <el-select v-model="newForm.school" class="handle cm-select">
                        <el-option
                            v-for="(item,index) in schoolOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.status")}}</span>
                    <el-select v-model="newForm.status" class="handle cm-select" disabled>
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="save">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .add-msg-dialog{
        color: #5360aa;
        .el-dialog{
            width: 580px !important;
        }
       .el-dialog__header{
           text-align: center;
           padding: 30px 20px;
           .el-dialog__title{
               font-size: 28px;
               color: #5360aa;
           }
       }
        .el-dialog__body{
            padding-top: 0px;
        }
        textarea{
            width: 100%;
            height: 270px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding: 20px;
            color: #5360aa;
            font-size: 16px;
            resize: none;
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
                account:{},
                coach:{},

                levelOptions:[],

                selectedLevel:null,


                dialogFormVisible:false,

                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
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
                    possessorId:this.id,
                    mfiLevel:this.selectedLevel,
                    certificateState:null,
                    searchContent:this.keyword,
                    schoolSerialCode:'',
            }
                this.pager.loading=true;
                Vue.api.getInstructorBuyCertificate(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.certificateList);
                        list.forEach((item,i)=>{
                            item.user=JSON.parse(item.user);
                        })
                        this.entryList=list;
                        console.log('this.entryList:', this.entryList);
                        this.pager.total=data.count;
                    }
                });
            },
            levelChange:function (data) {
                this.getList();
            },
            toViewCertificate:function (item) {
                console.log('item:',item);
                this.draw({
                    id:'canvas',
                    avatar:Vue.basicConfig.filePrefix+item.user.headPic,
                    name:item.user.name+' '+item.user.familyName,
                    level:item.mfiLevel,
                    certificateNo:item.serialCode,
                    date:Vue.formatDate(item.updatedAt,'yyyy-MM-dd'),
                    issuer:item.schoolSerialCode,
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
            drawText:function (ctx,text,x,y) {
                ctx.save();
                ctx.font = "32px ' Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei'";
                ctx.fillStyle = "#666";
                ctx.fillText(text,x,y,300);
                ctx.restore();
            },
            draw:function (options) {
                let that=this;
                var canvas=document.getElementById(options.id);
                var ctx=canvas.getContext("2d");

                ctx.save();
                let bgImg=new Image();
                bgImg.src=this.bgImg;
                bgImg.onload=function(){
                    ctx.drawImage(bgImg,0,0);
                    ctx.restore();

                    ctx.save();
                    var img = new Image();
                    img.src = options.avatar;
                    img.onload=function () {
                        that.circleImg(ctx, img, 95, 101, 150);
                        ctx.restore();

                        //
                        that.drawText(ctx,options.name,490,170);
                        that.drawText(ctx,options.level,880,170);

                        that.drawText(ctx,options.certificateNo,490,275);
                        that.drawText(ctx,options.date,880,275);

                        that.drawText(ctx,options.issuer,490,380);
                        //
                        let dataUrl = canvas.toDataURL('image/jpeg');
                        options.callback&&options.callback(dataUrl);
                    }
                }
            },
        },
        mounted () {
            this.account=Vue.getAccountInfo();
            this.coach=JSON.parse(localStorage.getItem('curCoach'));
            this.coach=this.account.type=='coach'?this.account:this.coach;
            this.id=this.account.type=='coach'?this.account.id:this.$route.params.id;
            console.log('this.coach:',this.coach);
            //
            this.levelOptions=this.genLevelConfig({level:this.account.mfiLevel});
            this.levelOptions.unshift({
                value:null,
                label:this.$t("btn.all"),
            });
            /**/
            this.getList();

        },
    }
</script>
