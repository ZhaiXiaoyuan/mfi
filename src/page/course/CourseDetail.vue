<template>
    <div class="page-content page-content-min msg-detail">
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
                    <div class="block-bd">
                       <p class="title cm-title">{{$t("title.courseDetail",{ msg:course.courseId})}}</p>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.allCoach")}}</span>
            </div>
            <div class="panel-bd">
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
                                {{$t("label.pool")}}
                            </th>
                            <th>
                                {{$t("label.openWater")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                           <!-- <th>
                                {{$t("label.handle")}}
                            </th>-->
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
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.confinedWater=='pass'}"> {{partStatus[item.mfiLevelState.confinedWater]}}</span>
                            </td>
                            <td>
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.openWater=='pass'}"> {{partStatus[item.mfiLevelState.openWater]}}</span>
                            </td>
                            <td>
                                <span class="cm-text">{{grantStatus[item.certificate]}}</span>
                            </td>
                          <!--  <td>
                                <span class="handle" v-if="item.certificate=='pending'||item.certificate=='granted'">&mdash;</span>
                                <span class="handle cm-btn" @click="grant(index)"  v-if="item.certificate=='waiting'">{{$t('btn.grant')}}</span>
                            </td>-->
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
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
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
                        console.log('this.entryList:',this.entryList);
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
                        this.course=JSON.parse(resp.respMsg);
                        console.log('this.course:',this.course);
                    }
                });
            }
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
         /*   this.course=JSON.parse(localStorage.getItem('curCourse'));*/
            /**/
            this.getCourse();
            this.getList();
        },
    }
</script>
