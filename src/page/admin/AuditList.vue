<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <ul class="cm-tab-list">
                    <li :class="{'active':state=='pending'}" @click="setState('pending')">{{$t("btn.auditPending")}}</li>
                    <li :class="{'active':state=='pass'}" @click="setState('pass')">{{$t("btn.auditPass")}}</li>
                    <li :class="{'active':state=='fail'}" @click="setState('fail')">{{$t("btn.auditFail")}}</li>
                </ul>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item">
                            <span class="label">{{$t("label.auditType")}}</span>
                            <el-select v-model="selectedType" @change="typeChange" class="handle cm-select">
                                <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
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
                                {{$t("label.level")}}
                            </th>
                            <th>
                                {{$t("label.type")}}
                            </th>
                            <th>
                                {{$t("label.status")}}
                            </th>
                            <th>
                                {{$t("label.submitDate")}}
                            </th>
                            <th>
                                {{$t("label.handle")}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.email}}
                            </td>
                            <td>
                                {{item.name}}&nbsp;{{item.familyName}}
                            </td>
                            <td>
                                {{item.mfiLevel}}
                            </td>
                            <td>
                                {{item.instructorAccountStatus}}
                            </td>
                          <!--  <td>
                                2018.02.22
                            </td>-->
                            <td>
                                <span class="handle" @click="toDetail(index)" :class="{'cm-disabled':item.instructorAccountStatus=='nonActivated'}">{{$t('btn.detail')}}</span>
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
                options:[
                    {
                        value:null,
                        label:this.$t("btn.all"),
                     },
                    {
                        label:this.$t("btn.dueAudit"),
                        value:'instructorDueAudit'
                    },
                    {
                        label:this.$t("btn.toInstructor"),
                        value:'studentToInstructor'
                    },
                ],
                selectedType:null,
                schoolOptions:[ {
                    label:this.$t("btn.configurable"),
                    value:'configurable'
                },],

                listLevelOptions:[],
                listOptions:[],
                selectedLevel:null,
                selectedStatus:null,


                dialogFormVisible:false,
                newForm:{
                    email:null,
                    level:null,
                    status:'nonactivated',
                    school:null,
                },

                state:'pending',//pending:待审核 pass:已审核 fail:以驳回
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
                    type:this.selectedType,
                    state:this.state,
                }
                this.pager.loading=true;
                Vue.api.getAuditList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.auditList);
                        console.log('this.entryList:', this.entryList);
                        this.pager.total=data.count;
                    }
                });
            },
            setState:function (value) {
                this.state=value;
                this.getList();
            },
            typeChange:function (data) {
                console.log('data:',data);
                this.selectedType=data;
                this.getList();
            },
            save:function () {
                if(!this.newForm.email){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.email")});
                    return;
                }
                if(!this.newForm.level){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.level")});
                    return;
                }
                if(!this.newForm.school){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.school")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    email:this.newForm.email,
                    mfiLevel:this.newForm.level,
                    schoolConfigParm:this.newForm.school,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                Vue.api.addCoach(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.getList();
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                    }
                });
            },
            toDetail:function (index) {
                let coach=this.entryList[index];
                localStorage.setItem('curCoach',JSON.stringify(coach));
                this.$router.push({name:'coachDetail',params:{}});
            },
        },
        mounted () {
            /**/
            this.getList();
        },
    }
</script>
