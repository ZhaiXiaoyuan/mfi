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
                    <div class="block-bd">
                       <p class="title cm-title">{{$t("title.courseDetail",{ msg:course.courseNo})}}</p>
                        <el-row>
                            <el-col :span="12" class="info-item">
                                <span class="label">{{$t('label.courseNo')}}：</span>
                                <span class="value">{{course.courseNo}}</span>
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
                <span class="title">{{$t("title.myCourseStatus")}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th v-if="checkNeed('healthCertification')">
                                {{$t("label.health")}}
                            </th>
                            <th v-if="checkNeed('theory')">
                                {{$t("label.theory")}}
                            </th>
                            <th v-if="checkNeed('pool')">
                                {{$t("label.pool")}}
                            </th>
                            <th v-if="checkNeed('tricks')">
                                {{$t("label.tricks")}}
                            </th>
                            <th v-if="checkNeed('theoryExam')">
                                {{$t("label.theoryExam")}}
                            </th>
                            <th v-if="checkNeed('studioRoutine')">
                                {{$t("label.studio")}}
                            </th>
                            <th v-if="checkNeed('studioPerformance')">
                                {{$t("label.studioPerformance")}}
                            </th>
                            <th v-if="checkNeed('tricksPerformance')">
                                {{$t("label.tricksPerformance")}}
                            </th>
                            <th v-if="checkNeed('dynamicRoutine')">
                                {{$t("label.dynamicRoutine")}}
                            </th>
                            <th v-if="checkNeed('staticRoutine')">
                                {{$t("label.staticRoutine")}}
                            </th>
                            <th v-if="checkNeed('rescuePerformance')">
                                {{$t("label.rescuePerformance")}}
                            </th>
                            <th v-if="checkNeed('staticRoutineWOMerFin')">
                                {{$t("label.staticRoutineWOMerFin")}}
                            </th>
                            <th v-if="checkNeed('dualRoutine')">
                                {{$t("label.dualRoutine")}}
                            </th>
                            <th v-if="checkNeed('soloPerformance')">
                                {{$t("label.soloPerformance")}}
                            </th>
                            <th v-if="checkNeed('teachingTheory')">
                                {{$t("label.teachingTheory")}}
                            </th>
                            <th v-if="checkNeed('teachingStudio')">
                                {{$t("label.teachingStudio")}}
                            </th>
                            <th v-if="checkNeed('teachingPool')">
                                {{$t("label.teachingPool")}}
                            </th>
                            <th v-if="checkNeed('waterSafety')">
                                {{$t("label.waterSafety")}}
                            </th>
                            <th v-if="checkNeed('freeDivingCertification')">
                                {{$t("label.freeDivingCertification")}}
                            </th>
                            <th v-if="checkNeed('scubaOrFreeDivingCertification')">
                                {{$t("label.scubaOrFreeDivingCertification")}}
                            </th>
                            <th v-if="checkNeed('scubaOrFreeDivingInstructor')">
                                {{$t("label.scubaOrFreeDivingInstructor")}}
                            </th>
                            <th v-if="checkNeed('teachingSkills')">
                                {{$t("label.teachingSkills")}}
                            </th>
                            <th v-if="checkNeed('performance')">
                                {{$t("label.performance")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td v-if="checkNeed('healthCertification')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.healthCertification=='pass'}">{{partStatus[item.mfiLevelState.healthCertification]}}</span>
                            </td>
                            <td v-if="checkNeed('theory')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.theory=='pass'}"> {{partStatus[item.mfiLevelState.theory]}}</span>
                            </td>
                            <td v-if="checkNeed('pool')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.pool=='pass'}"> {{partStatus[item.mfiLevelState.pool]}}</span>
                            </td>
                            <td v-if="checkNeed('tricks')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.tricks=='pass'}"> {{partStatus[item.mfiLevelState.tricks]}}</span>
                            </td>
                            <td v-if="checkNeed('theoryExam')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.theoryExam=='pass'}"> {{partStatus[item.mfiLevelState.theoryExam]}}</span>
                            </td>
                            <td v-if="checkNeed('studioRoutine')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.studioRoutine=='pass'}"> {{partStatus[item.mfiLevelState.studioRoutine]}}</span>
                            </td>
                            <td v-if="checkNeed('studioPerformance')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.studioPerformance=='pass'}"> {{partStatus[item.mfiLevelState.studioPerformance]}}</span>
                            </td>
                            <td v-if="checkNeed('tricksPerformance')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.tricksPerformance=='pass'}"> {{partStatus[item.mfiLevelState.tricksPerformance]}}</span>
                            </td>
                            <td v-if="checkNeed('dynamicRoutine')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.dynamicRoutine=='pass'}"> {{partStatus[item.mfiLevelState.dynamicRoutine]}}</span>
                            </td>
                            <td v-if="checkNeed('staticRoutine')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.staticRoutine=='pass'}"> {{partStatus[item.mfiLevelState.staticRoutine]}}</span>
                            </td>
                            <td v-if="checkNeed('rescuePerformance')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.rescuePerformance=='pass'}"> {{partStatus[item.mfiLevelState.rescuePerformance]}}</span>
                            </td>
                            <td v-if="checkNeed('staticRoutineWOMerFin')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.staticRoutineWOMerFin=='pass'}"> {{partStatus[item.mfiLevelState.staticRoutineWOMerFin]}}</span>
                            </td>
                            <td v-if="checkNeed('dualRoutine')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.dualRoutine=='pass'}"> {{partStatus[item.mfiLevelState.dualRoutine]}}</span>
                            </td>
                            <td v-if="checkNeed('soloPerformance')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.soloPerformance=='pass'}"> {{partStatus[item.mfiLevelState.soloPerformance]}}</span>
                            </td>
                            <td v-if="checkNeed('teachingTheory')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.teachingTheory=='pass'}"> {{partStatus[item.mfiLevelState.teachingTheory]}}</span>
                            </td>
                            <td v-if="checkNeed('teachingStudio')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.teachingStudio=='pass'}"> {{partStatus[item.mfiLevelState.teachingStudio]}}</span>
                            </td>
                            <td v-if="checkNeed('teachingPool')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.teachingPool=='pass'}"> {{partStatus[item.mfiLevelState.teachingPool]}}</span>
                            </td>
                            <td v-if="checkNeed('waterSafety')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.waterSafety=='pass'}"> {{partStatus[item.mfiLevelState.waterSafety]}}</span>
                            </td>
                            <td v-if="checkNeed('freeDivingCertification')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.freeDivingCertification=='pass'}"> {{partStatus[item.mfiLevelState.freeDivingCertification]}}</span>
                            </td>
                            <td v-if="checkNeed('scubaOrFreeDivingCertification')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.scubaOrFreeDivingCertification=='pass'}"> {{partStatus[item.mfiLevelState.scubaOrFreeDivingCertification]}}</span>
                            </td>
                            <td v-if="checkNeed('scubaOrFreeDivingInstructor')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.scubaOrFreeDivingInstructor=='pass'}"> {{partStatus[item.mfiLevelState.scubaOrFreeDivingInstructor]}}</span>
                            </td>
                            <td v-if="checkNeed('teachingSkills')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.teachingSkills=='pass'}"> {{partStatus[item.mfiLevelState.teachingSkills]}}</span>
                            </td>
                            <td v-if="checkNeed('scubaOrFreeDivingInstructor')">
                                <span class="cm-text" :class="{'pass':item.mfiLevelState.performance=='pass'}"> {{partStatus[item.mfiLevelState.performance]}}</span>
                            </td>
                            <td>
                                <span class="cm-text">{{grantStatus[typeof item.certificate=='object'?'granted':item.certificate]}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <ul class="cm-entry-block-list">
                    <li v-for="(item,index) in entryList" class="entry">
                        <div class="entry-hd">
                            <div class="info-item"> <span class="cm-text">{{grantStatus[typeof item.certificate=='object'?'granted':item.certificate]}}</span></div>
                        </div>
                        <div class="entry-bd">
                            <div class="info-item" v-if="checkNeed('healthCertification')">{{$t("label.health")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.healthCertification=='pass'}">{{partStatus[item.mfiLevelState.healthCertification]}}</span></div>
                            <div class="info-item" v-if="checkNeed('theoryExam')">{{$t("label.theory")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.theoryExam=='pass'}"> {{partStatus[item.mfiLevelState.theoryExam]}}</span></div>
                            <div class="info-item" v-if="checkNeed('studioRoutine')">{{$t("label.studio")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.studioRoutine=='pass'}"> {{partStatus[item.mfiLevelState.studioRoutine]}}</span></div>
                            <div class="info-item" v-if="checkNeed('studioPerformance')">{{$t("label.studioPerformance")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.studioPerformance=='pass'}"> {{partStatus[item.mfiLevelState.studioPerformance]}}</span></div>
                            <div class="info-item" v-if="checkNeed('tricksPerformance')">{{$t("label.tricksPerformance")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.tricksPerformance=='pass'}"> {{partStatus[item.mfiLevelState.tricksPerformance]}}</span></div>
                            <div class="info-item" v-if="checkNeed('dynamicRoutine')">{{$t("label.dynamicRoutine")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.dynamicRoutine=='pass'}"> {{partStatus[item.mfiLevelState.dynamicRoutine]}}</span></div>
                            <div class="info-item" v-if="checkNeed('staticRoutine')">{{$t("label.staticRoutine")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.staticRoutine=='pass'}"> {{partStatus[item.mfiLevelState.staticRoutine]}}</span></div>
                            <div class="info-item" v-if="checkNeed('rescuePerformance')">{{$t("label.rescuePerformance")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.rescuePerformance=='pass'}"> {{partStatus[item.mfiLevelState.rescuePerformance]}}</span></div>
                            <div class="info-item" v-if="checkNeed('staticRoutineWOMerFin')">{{$t("label.staticRoutineWOMerFin")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.staticRoutineWOMerFin=='pass'}"> {{partStatus[item.mfiLevelState.staticRoutineWOMerFin]}}</span></div>
                            <div class="info-item" v-if="checkNeed('dualRoutine')">{{$t("label.dualRoutine")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.dualRoutine=='pass'}"> {{partStatus[item.mfiLevelState.dualRoutine]}}</span></div>
                            <div class="info-item" v-if="checkNeed('soloPerformance')">{{$t("label.soloPerformance")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.soloPerformance=='pass'}"> {{partStatus[item.mfiLevelState.soloPerformance]}}</span></div>
                            <div class="info-item" v-if="checkNeed('teachingTheory')">{{$t("label.teachingTheory")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.teachingTheory=='pass'}"> {{partStatus[item.mfiLevelState.teachingTheory]}}</span></div>
                            <div class="info-item" v-if="checkNeed('teachingStudio')">{{$t("label.teachingStudio")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.teachingStudio=='pass'}"> {{partStatus[item.mfiLevelState.teachingStudio]}}</span></div>
                            <div class="info-item" v-if="checkNeed('teachingPool')">{{$t("label.teachingPool")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.teachingPool=='pass'}"> {{partStatus[item.mfiLevelState.teachingPool]}}</span></div>
                            <div class="info-item" v-if="checkNeed('waterSafety')">{{$t("label.waterSafety")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.waterSafety=='pass'}"> {{partStatus[item.mfiLevelState.waterSafety]}}</span></div>
                            <div class="info-item" v-if="checkNeed('freeDivingCertification')">{{$t("label.freeDivingCertification")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.freeDivingCertification=='pass'}"> {{partStatus[item.mfiLevelState.freeDivingCertification]}}</span></div>
                            <div class="info-item" v-if="checkNeed('scubaAndFreeDivingCertification')">{{$t("label.scubaAndFreeDivingCertification")}}<span class="gap">:</span><span class="cm-text" :class="{'pass':item.mfiLevelState.scubaAndFreeDivingCertification=='pass'}"> {{partStatus[item.mfiLevelState.scubaAndFreeDivingCertification]}}</span></div>
                        </div>
                        <div class="entry-ft"></div>
                    </li>
                </ul>
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
    @media screen and (max-width: 1000px) {
        .pass{
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            padding: 0px 15px;
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
                        label:this.$t('label.pass'),
                        value:'pass',
                    },
                    {
                        label:this.$t('label.need'),
                        value:'need',
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
                neededData: [],

            }
        },
        created(){

        },
        watch:{

        },
        computed: {
        },
        methods: {
            getCourse:function () {
                let params={
                    ...Vue.sessionInfo(),
                    courseId:this.id,
                }
                Vue.api.getCourseDetail(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.course={
                            ...data.course,
                            instructorEmail:data.instructorEmail,
                            instructorName:data.instructorName,
                        }
                        console.log('this.course:',this.course);
                        this.neededData = this.getNeededStatus(this.course.mfiLevel);
                        this.course.courseNo=this.course.school+this.course.courseId.substring(this.course.courseId.length-5)
                        this.getStudentMfiLevelState();
                    }
                });
            },
            getStudentMfiLevelState:function () {
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.id,
                    mfiLevel:this.course.mfiLevel,
                }
                Vue.api.getStudentMfiLevelState(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList.push(data);
                    }
                });
            },
            checkNeed:function (key) {
                return this.neededData.indexOf(key) > -1
            },
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
            this.account=Vue.getAccountInfo();
            /**/
            this.getCourse();
        },
    }
</script>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
