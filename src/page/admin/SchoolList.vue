<template>
    <div class="page-content msg-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.schoolAdmin")}}</span>
            </div>
            <div class="panel-bd">
                <div class="cm-list-block" v-loading="pager.loading">
                    <div class="block-hd">
                        <div class="con-item con-item-search">
                            <el-input :placeholder='$t("holder.schoolSearch")' v-model="keyword" @keyup.enter.native="getList()"  class="cm-search">
                                <el-button slot="append" class="cm-btn" icon="el-icon-search" @click="getList()"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <table class="cm-entry-list">
                        <thead>
                        <tr>
                            <th>
                                {{$t("label.country")}}
                            </th>
                            <th>
                                {{$t("label.region")}}
                            </th>
                            <th>
                                {{$t("label.address")}}
                            </th>
                            <th>
                                {{$t("label.code")}}
                            </th>
                            <th>{{$t("label.handle")}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in entryList">
                            <td>
                                {{item.country}}
                            </td>
                            <td>
                                {{item.province+item.city}}
                            </td>
                            <td>
                                {{item.address}}
                            </td>
                            <td>
                                {{item.serialCode}}
                            </td>
                            <td>
                                <span class="handle" @click="toEdit(index)">{{$t("btn.edit")}}</span>
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
        <div class="cm-btn cm-add-btn" @click="toAdd">
            <div class="icon-wrap">
                <i class="icon add-cross-icon"></i>
            </div>
            <p>{{$t("btn.addSchool")}}</p>
        </div>
        <el-dialog :title='(editForm.id?$t("title.editSchool"):$t("title.addSchool"))' class="edit-dialog cm-dialog school-dialog" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.country")}}</span>
                    <el-select v-model="editForm.country" filterable>
                        <el-option
                            v-for="item in regionList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                   <!-- <input type="text" v-model="editForm.country" class="cm-input">-->
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.province")}}</span>
                    <input type="text" v-model="editForm.province" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.city")}}</span>
                    <input type="text" v-model="editForm.city" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.address")}}</span>
                    <input type="text" v-model="editForm.address" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.postcode")}}</span>
                    <input type="text" v-model="editForm.postcode" class="cm-input">
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

</style>
<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data() {
            return {
                dialogFormVisible:false,
                keyword:null,
                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                isSetting:false,
                editForm:{
                    country:null,
                    province:null,
                    city:null,
                    address:null,
                    serialCode:null,
                },
                options:[
                    {
                        value:'top',
                        label:this.$t("label.stick"),
                    },
                    {
                        value:'enable',
                        label:this.$t("label.show"),
                    },
                    {
                        value:'disable',
                        label:this.$t("label.hide"),
                    }
                ],

                title:null,
                uploadFb:null,
                uploadedCount:0,
                files:[],
                uploadStatus:null,
                regionList:[],
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
                    searchContent:this.keyword,
                }
                this.pager.loading=true;
                Vue.api.getSchoolList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.schoolList);
                        this.pager.total=data.count;
                     /*   this.entryList.forEach((item,i)=>{

                         })*/
                        console.log('this.entryList:',this.entryList);
                    }
                });
            },
            toAdd:function () {
                this.dialogFormVisible=true;
                this.editForm={};
            },
            save:function () {
                if(!this.editForm.country){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.country")});
                    return;
                }
                if(!this.editForm.province){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.province")});
                    return;
                }
                if(!this.editForm.city){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.city")});
                    return;
                }
                if(!this.editForm.address){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.address")});
                    return;
                }
                if(!this.editForm.postcode){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.postcode")});
                    return;
                }
                let params={
                    ...this.editForm
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.save")});
                if(!params.id){//新增
                    Vue.api.addSchool(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.getList();
                            this.dialogFormVisible=false;
                            fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                        }
                    });
                }else{//编辑
                    Vue.api.updateSchool(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.getList(this.pager.pageIndex);//刷新当前页
                            this.dialogFormVisible=false;
                            fb.setOptions({type:'complete', text:this.$t("tips.saveS")});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.saveF",{msg:resp.respMsg})});
                        }
                    });
                }
            },
            toEdit:function (index) {
                let item=this.entryList[index];
                Object.assign(this.editForm,item);
                this.dialogFormVisible=true;
            },
            getRegionConfig:function () {
                Vue.api.getRegionConfig({ ...Vue.sessionInfo()}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.regionList=JSON.parse(resp.respMsg);
                        if(this.$i18n.locale=='cn'){
                            this.regionList.forEach((item,i)=>{
                                item.label=item.chineseName;
                                item.value=item.code;
                            })
                        }else{
                            this.regionList.forEach((item,i)=>{
                                item.label=item.englishName;
                                item.value=item.code;
                            })
                        }
                    }else{

                    }
                });
            }
        },
        mounted () {
            /**/
            this.getList();
            //
            this.getRegionConfig();
        },
    }
</script>
