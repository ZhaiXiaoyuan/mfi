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
                                <span class="cm-text">{{grantStatus[item.certificate.length>20?'granted':item.certificate]}}</span>
                            </td>
                            <td v-if="account.type=='school'">
                                <span class="handle" v-if="item.certificate=='pending'||item.certificate=='granted'">&mdash;</span>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="toStudent(item)" v-if="item.certificate=='waiting'||item.certificate=='grant'||(item.certificate&&item.certificate.length>20)">{{$t('btn.detail')}}</el-button>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}" @click="grant(item)"  v-if="item.certificate=='waiting'&&unusedList.length>0">{{$t('btn.grant')}}</el-button>
                                <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}"  v-if="item.certificate=='waiting'" @click="toPay(item)">{{$t('btn.buyToGrant')}}</el-button>
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
                            <td v-if="checkNeed('healthCertification')">
                                <span class="cm-text" v-if="item.mfiLevelState.healthCertification=='-'">{{partStatus[item.mfiLevelState.healthCertification]}}</span>
                                <el-select v-model="item.mfiLevelState.healthCertification" :disabled="item.mfiLevelState.healthCertification=='pass'" @change="saveStatus(item,'healthCertification')" class="status-selector" :class="{'pass':item.mfiLevelState.healthCertification=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.healthCertification!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('theory')">
                                <span class="cm-text" v-if="item.mfiLevelState.theory=='-'">{{partStatus[item.mfiLevelState.theory]}}</span>
                                <el-select v-model="item.mfiLevelState.theory" :disabled="item.mfiLevelState.theory=='pass'"   @change="saveStatus(item,'theory')" class="status-selector" :class="{'pass':item.mfiLevelState.theory=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.theory!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('pool')">
                                <span class="cm-text" v-if="item.mfiLevelState.pool=='-'">{{partStatus[item.mfiLevelState.pool]}}</span>
                                <el-select v-model="item.mfiLevelState.pool" :disabled="item.mfiLevelState.pool=='pass'"   @change="saveStatus(item,'pool')" class="status-selector" :class="{'pass':item.mfiLevelState.pool=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.pool!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('tricks')">
                                <span class="cm-text" v-if="item.mfiLevelState.tricks=='-'">{{partStatus[item.mfiLevelState.tricks]}}</span>
                                <el-select v-model="item.mfiLevelState.tricks" :disabled="item.mfiLevelState.tricks=='pass'"   @change="saveStatus(item,'tricks')" class="status-selector" :class="{'pass':item.mfiLevelState.tricks=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.tricks!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('theoryExam')">
                                <span class="cm-text" v-if="item.mfiLevelState.theoryExam=='-'">{{partStatus[item.mfiLevelState.theoryExam]}}</span>
                                <el-select v-model="item.mfiLevelState.theoryExam" :disabled="item.mfiLevelState.theoryExam=='pass'"   @change="saveStatus(item,'theoryExam')" class="status-selector" :class="{'pass':item.mfiLevelState.theoryExam=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.theoryExam!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('studioRoutine')">
                                <span class="cm-text" v-if="item.mfiLevelState.studioRoutine=='-'">{{partStatus[item.mfiLevelState.studioRoutine]}}</span>
                                <el-select v-model="item.mfiLevelState.studioRoutine" :disabled="item.mfiLevelState.studioRoutine=='pass'" @change="saveStatus(item,'studioRoutine')" class="status-selector" :class="{'pass':item.mfiLevelState.studioRoutine=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.studioRoutine!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('studioPerformance')">
                                <span class="cm-text" v-if="item.mfiLevelState.studioPerformance=='-'">{{partStatus[item.mfiLevelState.studioPerformance]}}</span>
                                <el-select v-model="item.mfiLevelState.studioPerformance" :disabled="item.mfiLevelState.studioPerformance=='pass'" @change="saveStatus(item,'studioPerformance')" class="status-selector" :class="{'pass':item.mfiLevelState.studioPerformance=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.studioPerformance!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('tricksPerformance')">
                                <span class="cm-text" v-if="item.mfiLevelState.tricksPerformance=='-'">{{partStatus[item.mfiLevelState.tricksPerformance]}}</span>
                                <el-select v-model="item.mfiLevelState.tricksPerformance" :disabled="item.mfiLevelState.tricksPerformance=='pass'" @change="saveStatus(item,'tricksPerformance')" class="status-selector" :class="{'pass':item.mfiLevelState.tricksPerformance=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.tricksPerformance!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('dynamicRoutine')">
                                <span class="cm-text" v-if="item.mfiLevelState.dynamicRoutine=='-'">{{partStatus[item.mfiLevelState.dynamicRoutine]}}</span>
                                <el-select v-model="item.mfiLevelState.dynamicRoutine" :disabled="item.mfiLevelState.dynamicRoutine=='pass'" @change="saveStatus(item,'dynamicRoutine')" class="status-selector" :class="{'pass':item.mfiLevelState.dynamicRoutine=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.dynamicRoutine!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('staticRoutine')">
                                <span class="cm-text" v-if="item.mfiLevelState.staticRoutine=='-'">{{partStatus[item.mfiLevelState.staticRoutine]}}</span>
                                <el-select v-model="item.mfiLevelState.staticRoutine" :disabled="item.mfiLevelState.staticRoutine=='pass'" @change="saveStatus(item,'staticRoutine')" class="status-selector" :class="{'pass':item.mfiLevelState.staticRoutine=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.staticRoutine!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('rescuePerformance')">
                                <span class="cm-text" v-if="item.mfiLevelState.rescuePerformance=='-'">{{partStatus[item.mfiLevelState.rescuePerformance]}}</span>
                                <el-select v-model="item.mfiLevelState.rescuePerformance" :disabled="item.mfiLevelState.rescuePerformance=='pass'" @change="saveStatus(item,'rescuePerformance')" class="status-selector" :class="{'pass':item.mfiLevelState.rescuePerformance=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.rescuePerformance!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('staticRoutineWOMerFin')">
                                <span class="cm-text" v-if="item.mfiLevelState.staticRoutineWOMerFin=='-'">{{partStatus[item.mfiLevelState.staticRoutineWOMerFin]}}</span>
                                <el-select v-model="item.mfiLevelState.staticRoutineWOMerFin" :disabled="item.mfiLevelState.staticRoutineWOMerFin=='pass'" @change="saveStatus(item,'staticRoutineWOMerFin')" class="status-selector" :class="{'pass':item.mfiLevelState.staticRoutineWOMerFin=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.staticRoutineWOMerFin!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('dualRoutine')">
                                <span class="cm-text" v-if="item.mfiLevelState.dualRoutine=='-'">{{partStatus[item.mfiLevelState.dualRoutine]}}</span>
                                <el-select v-model="item.mfiLevelState.dualRoutine" :disabled="item.mfiLevelState.dualRoutine=='pass'" @change="saveStatus(item,'dualRoutine')" class="status-selector" :class="{'pass':item.mfiLevelState.dualRoutine=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.dualRoutine!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('soloPerformance')">
                                <span class="cm-text" v-if="item.mfiLevelState.soloPerformance=='-'">{{partStatus[item.mfiLevelState.soloPerformance]}}</span>
                                <el-select v-model="item.mfiLevelState.soloPerformance" :disabled="item.mfiLevelState.soloPerformance=='pass'" @change="saveStatus(item,'soloPerformance')" class="status-selector" :class="{'pass':item.mfiLevelState.soloPerformance=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.soloPerformance!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('teachingTheory')">
                                <span class="cm-text" v-if="item.mfiLevelState.teachingTheory=='-'">{{partStatus[item.mfiLevelState.teachingTheory]}}</span>
                                <el-select v-model="item.mfiLevelState.teachingTheory" :disabled="item.mfiLevelState.teachingTheory=='pass'" @change="saveStatus(item,'teachingTheory')" class="status-selector" :class="{'pass':item.mfiLevelState.teachingTheory=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.teachingTheory!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('teachingStudio')">
                                <span class="cm-text" v-if="item.mfiLevelState.teachingStudio=='-'">{{partStatus[item.mfiLevelState.teachingStudio]}}</span>
                                <el-select v-model="item.mfiLevelState.teachingStudio" :disabled="item.mfiLevelState.teachingStudio=='pass'" @change="saveStatus(item,'teachingStudio')" class="status-selector" :class="{'pass':item.mfiLevelState.teachingStudio=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.teachingStudio!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('teachingPool')">
                                <span class="cm-text" v-if="item.mfiLevelState.teachingPool=='-'">{{partStatus[item.mfiLevelState.teachingPool]}}</span>
                                <el-select v-model="item.mfiLevelState.teachingPool" :disabled="item.mfiLevelState.teachingPool=='pass'" @change="saveStatus(item,'teachingPool')" class="status-selector" :class="{'pass':item.mfiLevelState.teachingPool=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.teachingPool!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('waterSafety')">
                                <span class="cm-text" v-if="item.mfiLevelState.waterSafety=='-'">{{partStatus[item.mfiLevelState.waterSafety]}}</span>
                                <el-select v-model="item.mfiLevelState.waterSafety" :disabled="item.mfiLevelState.waterSafety=='pass'" @change="saveStatus(item,'waterSafety')" class="status-selector" :class="{'pass':item.mfiLevelState.waterSafety=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.waterSafety!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('freeDivingCertification')">
                                <span class="cm-text" v-if="item.mfiLevelState.freeDivingCertification=='-'">{{partStatus[item.mfiLevelState.freeDivingCertification]}}</span>
                                <el-select v-model="item.mfiLevelState.freeDivingCertification" :disabled="item.mfiLevelState.freeDivingCertification=='pass'" @change="saveStatus(item,'freeDivingCertification')" class="status-selector" :class="{'pass':item.mfiLevelState.freeDivingCertification=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.freeDivingCertification!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('scubaOrFreeDivingCertification')">
                                <span class="cm-text" v-if="item.mfiLevelState.scubaOrFreeDivingCertification=='-'">{{partStatus[item.mfiLevelState.scubaOrFreeDivingCertification]}}</span>
                                <el-select v-model="item.mfiLevelState.scubaOrFreeDivingCertification" :disabled="item.mfiLevelState.scubaOrFreeDivingCertification=='pass'" @change="saveStatus(item,'scubaOrFreeDivingCertification')" class="status-selector" :class="{'pass':item.mfiLevelState.scubaOrFreeDivingCertification=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.scubaOrFreeDivingCertification!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('scubaOrFreeDivingInstructor')">
                                <span class="cm-text" v-if="item.mfiLevelState.scubaOrFreeDivingInstructor=='-'">{{partStatus[item.mfiLevelState.scubaOrFreeDivingInstructor]}}</span>
                                <el-select v-model="item.mfiLevelState.scubaOrFreeDivingInstructor" :disabled="item.mfiLevelState.scubaOrFreeDivingInstructor=='pass'" @change="saveStatus(item,'scubaOrFreeDivingInstructor')" class="status-selector" :class="{'pass':item.mfiLevelState.scubaOrFreeDivingInstructor=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.scubaOrFreeDivingInstructor!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('teachingSkills')">
                                <span class="cm-text" v-if="item.mfiLevelState.teachingSkills=='-'">{{partStatus[item.mfiLevelState.teachingSkills]}}</span>
                                <el-select v-model="item.mfiLevelState.teachingSkills" :disabled="item.mfiLevelState.teachingSkills=='pass'" @change="saveStatus(item,'teachingSkills')" class="status-selector" :class="{'pass':item.mfiLevelState.teachingSkills=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.teachingSkills!='-'" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </td>
                            <td v-if="checkNeed('performance')">
                                <span class="cm-text" v-if="item.mfiLevelState.performance=='-'">{{partStatus[item.mfiLevelState.performance]}}</span>
                                <el-select v-model="item.mfiLevelState.performance" :disabled="item.mfiLevelState.performance=='pass'" @change="saveStatus(item,'performance')" class="status-selector" :class="{'pass':item.mfiLevelState.performance=='pass','cm-disabled':item.studentState=='nonActivated'}" v-if="item.mfiLevelState.performance!='-'" placeholder="请选择">
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
                                  <el-button class="small handle-btn" :class="{'cm-disabled':item.studentState=='nonActivated'}"  v-if="item.certificate=='waiting'" @click="toPay(item)">{{$t('btn.buyToGrant')}}</el-button>
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
                        label:this.$t('label.pass'),
                        value:'pass',
                    },
                    {
                        label:this.$t('label.need'),
                        value:'need',
                        disabled: true,
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
                        let data=JSON.parse(resp.respMsg);
                        this.course={...data.course,instructorEmail:data.instructorEmail,instructorName:data.instructorName};
                        this.neededData = this.getNeededStatus(this.course.mfiLevel);
                       /* console.log('neededData:', this.neededData);*/
                        this.getUnusedCertificate();
                    }
                });
            },
            checkNeed:function (key) {
                return this.neededData.indexOf(key) > -1
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
            saveStatus:function (item, key) {
                if(this.isLoading){
                    return;
                }
                var state=item.mfiLevelState;
                let params={
                    ...Vue.sessionInfo(),
                    userId:state.userId,
                    mfiLevel:state.mfiLevel,
                    key: key
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
                        fb.setOptions({type:'complete', text:this.$t("tips.grantS")});
                        callback&&callback();
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.grantF",{msg:resp.respMsg})});
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
                let tips = ''
                if(this.course.mfiLevel=='M0'){
                    tips = this.$t('tips.buyM0Tips',{count:20,level:this.course.mfiLevel});
                }else {
                    tips = this.$t('tips.buyM0Tips',{count:1,level:this.course.mfiLevel}).replace('certificates','certificate')
                }
                let payModalInstance=this.payModal({
                    userId:this.account.id,
                    level:this.course.mfiLevel,
                    title:this.$t('title.toPaypal'),
                    tips:tips,
                    tips2:this.course.mfiLevel=='M0' && this.$t('tips.buyM0Tips',{count:1,level:this.course.mfiLevel}).replace('certificates','certificate'),
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
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
            this.account=Vue.getAccountInfo();
            this.coach=this.account.type=='coach'?this.account:this.coach;

            /**/
            this.getCourse();
            this.getList();
            //
            let testArr=[1,2,3,4]
            for(let i=0;i<4;i++){
                testArr.splice(0,1);
            }
        },
    }
</script>
