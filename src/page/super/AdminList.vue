<template>
    <div class="page-content admin-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.administratorList")}}</span>
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
                                {{item.user}}
                            </td>
                            <td>
                                <span class="status active" v-if="item.state=='enable'"> {{$t("label.enable")}}</span>
                                <span class="status disabled" v-if="item.state=='disable'">{{$t("label.disable")}}</span>
                            </td>
                            <td>
                                <el-switch
                                    class="handle"
                                    :index="index"
                                    @change="statusSwitch(index)"
                                    active-value="enable"
                                    inactive-value="disable"
                                    active-color="#5560aa"
                                    v-model="item.state">
                                </el-switch>
                                <span class="cm-btn handle" @click="toSetPwd(index);">{{$t("btn.resetPwd")}}</span>
                                <span class="cm-btn handle" @click="del(index)">{{$t("btn.del")}}</span>
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

       <!-- 重置密码弹窗-->
        <el-dialog :title='$t("title.resetPwd")' class="edit-dialog cm-dialog set-pwd-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.account")}}</span>
                    <input type="text" v-model="editForm.user" class="cm-input cm-disabled">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.pwd")}}</span>
                    <div class="input-item">
                        <input :type="showPassword?'text':'password'" v-model="editForm.pwd" class="cm-input">
                        <i class="icon" :class="{'eye-close-icon':showPassword,'eye-open-icon':!showPassword}" @click="showPassword=!showPassword"></i>
                    </div>
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="dialogFormVisible=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="updatePwd">{{$t("btn.ok")}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>

</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                dialogFormVisible:false,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                isSetting:false,
                editForm:null,
                showPassword:false,
            }
        },
        created(){

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
                    searchContent:null,
                }
                this.pager.loading=true;
                Vue.api.getAdminList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.adminList);
                        this.pager.total=data.count;
                        /*  console.log('this.entryList:',this.entryList[0]);*/
                    }
                });
            },
            statusSwitch:function (index) {
                if(this.isSetting){
                    return;
                }
                let item=this.entryList[index];
                let params={
                    ...Vue.sessionInfo(),
                    id:item.id,
                    state:item.state
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.setting")});
                this.isSetting=true;
                Vue.api.setAdminState(params).then((resp)=>{
                    this.isSetting=false;
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete', text:this.$t("tips.settingS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.settingF",{ msg: resp.respMsg})});
                    }
                });
            },
            del:function (index) {
                let item=this.entryList[index];
                this.$confirm(this.$t('tips.delAdmin',{msg:item.user}),  this.$t('title.tips'), {
                    confirmButtonText: this.$t('btn.sure'),
                    cancelButtonText: this.$t('btn.cancel'),
                    type: 'warning'
                }).then(() => {
                    let params={
                        ...Vue.sessionInfo(),
                        id:item.id,
                        state:'del'
                    }
                    let fb=Vue.operationFeedback({text:this.$t('btn.ok'),});
                    Vue.api.setAdminState(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.entryList.splice(index,1);
                            fb.setOptions({type:'complete', text:this.$t('tips.deleteS')});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t('tips.deleteF',{msg:resp.respMsg})});
                        }
                    });
                }).catch(() => {

                });
            },
            toSetPwd:function (index) {
                let item=this.entryList[index];
                this.editForm=Object.assign({},this.entryList[index]);
                this.dialogFormVisible=true;
            },
            updatePwd:function () {
                if(!this.editForm.pwd){
                    Vue.operationFeedback({type:'warn',text:this.$t('holder.pwd')});
                    return;
                };
                let fb=Vue.operationFeedback({text:this.$t('tips.save')});
                let params={
                    ...Vue.sessionInfo(),
                    ...this.editForm,
                    password:this.editForm.pwd
                }
                Vue.api.updateAdmin(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.dialogFormVisible=false;
                        fb.setOptions({type:'complete', text:this.$t('tips.saveS')});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t('tips.saveF',{msg:resp.respMsg})});
                    }
                });
            }
        },
        mounted () {
            /**/
            this.getList();

        },
    }
</script>
