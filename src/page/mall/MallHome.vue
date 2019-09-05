<template>
    <div class="page-content coach-list">
        <div class="cm-panel">
            <div class="panel-hd">
                <span class="title">{{$t("title.mall")}}</span>
               <!-- <span class="cm-btn cm-handle-btn" @click="addRedeemCode()">临时测试</span>-->
            </div>
            <div class="panel-bd">
                <div class="cm-list-block">
                    <div class="block-hd">
                        <div class="con-item">
                            <el-menu :default-active="activeType" class="cm-tab-menu" mode="horizontal" @select="setType">
                                <el-menu-item index="goods">{{$t("btn.goods")}}</el-menu-item>
                                <el-menu-item index="certificate" v-if="account.type=='school'||account.type=='coach'">{{$t("btn.certificate")}}</el-menu-item>
                                <el-menu-item index="buyRecord" v-if="account.type=='student'">{{$t("btn.buyRecord")}}</el-menu-item>
                                <el-menu-item index="buyRecord" v-if="account.type=='admin'">{{$t("btn.orderAdmin")}}</el-menu-item>
                                <el-menu-item index="exchangeRecord" v-if="account.type=='school'||account.type=='coach'">{{$t("btn.exchangeRecord")}}</el-menu-item>
                                <el-menu-item index="exchangeRecord" v-if="account.type=='admin'">{{$t("btn.exchangeAdmin")}}</el-menu-item>
                            </el-menu>
                        </div>
                        <div class="con-item right" v-if="activeType=='exchangeRecord'"><p class="tips">{{$t("tips.track")}}</p></div>
                    </div>
                    <div class="block-bd" v-if="activeType=='goods'&&!curGoods">
                        <div class="cm-content-box cm-watermark">
                            <ul class="cm-goods-list">
                                <li v-for="(item,index) in entryList" :key="item.id" @click="setCurGoods(item)">
                                    <div class="cover" :style="{background: 'url('+(basicConfig.filePrefix+item.imageUrl)+') no-repeat center',backgroundSize: 'cover'}"></div>
                                    <p class="name">{{item.name}}&times;{{item.count}}</p>
                                    <p class="name" v-if="item.price">${{item.price}}</p>
                                    <div class="handle">
                                        <div class="cm-btn cm-handle-btn handle-btn" v-if="item.sale" @click="openBuyModal(item,$event)">{{$t("btn.buy")}}</div>
                                        <div class="cm-btn cm-handle-btn handle-btn" v-if="item.exchange" @click="openExchangeModal(item,$event)">{{$t("btn.exchange")}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="block-bd" v-if="curGoods">
                        <div class="cm-content-box cm-goods-box">
                            <div class="box-hd">
                                <span class="cm-btn back-btn" @click="setCurGoods(null)">{{$t("btn.back")}}</span>
                            </div>
                            <div class="box-bd">
                                <el-row class="info-row">
                                    <el-col :span="7" class="info-item">
                                        <span class="label">{{$t('label.goodsType')}}：</span>
                                        <span class="value">
                                            <span v-if="curGoods.sale">商品</span>
                                            <span v-if="curGoods.exchange">礼品</span>
                                        </span>
                                    </el-col>
                                    <el-col :span="7" class="info-item">
                                        <span class="label">{{$t('label.goodsName')}}：</span>
                                        <span class="value">{{curGoods.name}}&times;{{curGoods.count}}</span>
                                    </el-col>
                                    <el-col :span="7" class="info-item">
                                        <div v-if="!curGoods.price">&nbsp;</div>
                                        <div v-if="curGoods.price">
                                            <span class="label">{{$t('label.price')}}：</span>
                                            <span class="value">${{curGoods.price}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="3" class="info-item">
                                        <span class="cm-btn cm-handle-btn cm-handle-md-btn" v-if="curGoods.sale" @click="openBuyModal(curGoods,$event)">{{$t('btn.buy')}}</span>
                                        <span class="cm-btn cm-handle-btn cm-handle-md-btn" v-if="curGoods.exchange" @click="openExchangeModal(curGoods,$event)">{{$t('btn.exchange')}}</span>
                                    </el-col>
                                </el-row>
                                <div class="goods-content cm-watermark">
                                    <img :src="basicConfig.filePrefix+curGoods.imageUrl" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="block-bd" v-if="activeType=='certificate'&&account.type=='school'">
                        <div class="cm-content-box cm-goods-box">
                            <div class="cm-certificate-goods-panel cm-watermark">
                               <!-- <div class="icon-wrap">
                                    <i class="icon logo-icon"></i>
                                </div>-->
                                <ul class="type-list">
                                    <li class="type-item" v-for="(item,index) in certificateGoodsList" :key="index">
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
                    </div>
                    <div class="block-bd" v-if="activeType=='certificate'&&account.type=='coach'">
                        <div class="cm-content-box cm-goods-box">
                            <div class="cm-certificate-goods-panel cm-watermark">
                             <!--   <div class="icon-wrap">
                                    <i class="icon logo-icon"></i>
                                </div>-->
                                <ul class="type-list">
                                    <li class="type-item">
                                        <div class="item-hd">

                                        </div>
                                        <div class="item-bd" style="padding: 40px 0px;">
                                            <div class="goods-item"  v-for="(goods,index) in certificateGoodsList" :key="index" v-if="!goods.disabled">
                                                <p class="icon-wrap">
                                                    <i class="icon shell-icon"></i>
                                                </p>
                                                <p>{{goods.name}}&nbsp;{{$t("value.cCount",{count:goods.count})}}</p>
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
                    </div>

                    <div class="block-bd" v-if="activeType=='buyRecord'&&account.type=='student'" v-loading="buyRecordPager.loading">
                        <table class="cm-entry-list">
                            <thead>
                            <tr>
                                <th>
                                    {{$t("label.goodsCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsName")}}
                                </th>
                                <th>
                                    {{$t("label.amount")}}
                                </th>
                                <th>
                                    {{$t("label.expressAddress")}}
                                </th>
                                <th>
                                    {{$t("label.trackingNumber")}}
                                </th>
                                <th>
                                    {{$t("label.status")}}
                                </th>
                                <th>
                                    {{$t("label.message")}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in buyRecordEntryList">
                                <td>
                                    {{item.goodsRecord.goodsId}}
                                </td>
                                <td>
                                    {{item.goodsInfo.name}}
                                </td>
                                <td>
                                    ${{item.goodsInfo.price}}
                                </td>
                                <td>
                                    {{item.goodsRecord.expressAddress}}
                                </td>
                                <td>
                                    {{item.goodsRecord.expressNo?item.goodsRecord.expressNo:'-'}}
                                </td>
                                <td>
                                    {{$t("btn."+item.goodsRecord.state+'Order')}}
                                </td>
                                <td>
                                    {{item.goodsRecord.msg?item.goodsRecord.msg:'-'}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <ul class="cm-entry-block-list">
                            <li v-for="(item,index) in buyRecordEntryList" class="entry">
                                <div class="entry-hd">
                                    <div class="info-item">{{item.goodsRecord.expressNo?item.goodsRecord.expressNo:'-'}}</div>
                                    <div class="info-item right">{{$t("btn."+item.goodsRecord.state+'Order')}}</div>
                                </div>
                                <div class="entry-bd">
                                    <div class="info-item">{{$t("label.goodsCode")}}<span class="gap">:</span>{{item.goodsRecord.goodsId}}</div>
                                    <div class="info-item">{{$t("label.goodsName")}}<span class="gap">:</span>{{item.goodsInfo.name}}</div>
                                    <div class="info-item">{{$t("label.amount")}}<span class="gap">:</span> ${{item.goodsInfo.price}}</div>
                                    <div class="info-item">{{$t("label.expressAddress")}}<span class="gap">:</span>{{item.goodsRecord.expressAddress}}</div>
                                    <div class="info-item">{{$t("label.message")}}<span class="gap">:</span>{{item.goodsRecord.msg?item.goodsRecord.msg:'-'}}</div>
                                </div>
                                <div class="entry-ft">

                                </div>
                            </li>
                        </ul>
                        <el-pagination
                            class="cm-pager"
                            @current-change="getBuyRecordList"
                            :prev-text='$t("btn.prev")'
                            :next-text='$t("btn.next")'
                            :current-page="buyRecordPager.pageIndex"
                            :page-size="buyRecordPager.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="buyRecordPager.total">
                        </el-pagination>
                    </div>
                    <div class="block-bd" v-if="activeType=='buyRecord'&&account.type=='admin'" v-loading="buyRecordPager.loading">
                        <table class="cm-entry-list">
                            <thead>
                            <tr>
                                <th>
                                    {{$t("label.account")}}
                                </th>
                                <th>
                                    {{$t("label.orderNo")}}
                                </th>
                                <th>
                                    {{$t("label.amount")}}
                                </th>
                                <th>
                                    {{$t("label.goodsCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsName")}}
                                </th>
                                <th>
                                    {{$t("label.expressAddress")}}
                                </th>
                                <th>
                                    {{$t("label.trackingNumber")}}
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
                            <tr v-for="(item,index) in buyRecordEntryList">
                                <td>
                                    {{item.userEmail}}
                                </td>
                                <td width="200">
                                    {{item.goodsRecord.id}}
                                </td>
                                <td>
                                    ${{item.goodsInfo.price}}
                                </td>
                                <td>
                                    {{item.goodsRecord.goodsId}}
                                </td>
                                <td>
                                    {{item.goodsInfo.name}}
                                </td>
                                <td style="width: 20%;">
                                    {{item.goodsRecord.expressAddress}}
                                </td>
                                <td>
                                    {{item.goodsRecord.expressNo?item.goodsRecord.expressNo:'-'}}
                                </td>
                                <td>
                                    {{$t("btn."+item.goodsRecord.state+'Order')}}
                                </td>
                                <td>
                                    <el-button class="small handle-btn" v-if="item.goodsRecord.state=='wait'" @click="openOrderHandleModal(item,2)">{{$t('btn.finishOrder')}}</el-button>
                                    <el-button class="small handle-btn" v-if="item.goodsRecord.state=='wait'" @click="openOrderHandleModal(item,3)">{{$t('btn.cancel')}}</el-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <el-pagination
                            class="cm-pager"
                            @current-change="getBuyRecordList"
                            :prev-text='$t("btn.prev")'
                            :next-text='$t("btn.next")'
                            :current-page="buyRecordPager.pageIndex"
                            :page-size="buyRecordPager.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="buyRecordPager.total">
                        </el-pagination>
                    </div>

                    <div class="block-bd" v-if="activeType=='exchangeRecord'&&(account.type=='coach'||account.type=='school')" v-loading="exchangeRecordPager.loading">
                        <table class="cm-entry-list">
                            <thead>
                            <tr>
                                <th>
                                    {{$t("label.randomCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsName")}}
                                </th>
                                <th>
                                    {{$t("label.expressAddress")}}
                                </th>
                                <th>
                                    {{$t("label.trackingNumber")}}
                                </th>
                                <th>
                                    {{$t("label.status")}}
                                </th>
                                <th>
                                    {{$t("label.message")}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in exchangeRecordEntryList">
                                <td>
                                    {{item.redeemRecord.redeemCodeId}}
                                </td>
                                <td>
                                    {{item.redeemRecord.goodsId}}
                                </td>
                                <td>
                                    {{item.goodsName}}
                                </td>
                                <td>
                                    {{item.redeemRecord.expressAddress}}
                                </td>
                                <td>
                                    {{item.redeemRecord.expressNo?item.redeemRecord.expressNo:'-'}}
                                </td>
                                <td>
                                    {{$t("btn."+item.redeemRecord.state+'Exchange')}}
                                </td>
                                <td>
                                    {{item.redeemRecord.msg?item.redeemRecord.msg:'-'}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <el-pagination
                            class="cm-pager"
                            @current-change="getExchangeRecordList"
                            :prev-text='$t("btn.prev")'
                            :next-text='$t("btn.next")'
                            :current-page="exchangeRecordPager.pageIndex"
                            :page-size="exchangeRecordPager.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="exchangeRecordPager.total">
                        </el-pagination>
                    </div>
                    <div class="block-bd" v-if="activeType=='exchangeRecord'&&(account.type=='admin')" v-loading="exchangeRecordPager.loading">
                        <table class="cm-entry-list">
                            <thead>
                            <tr>
                                <th>
                                    {{$t("label.account")}}
                                </th>
                                <th>
                                    {{$t("label.randomCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsCode")}}
                                </th>
                                <th>
                                    {{$t("label.goodsName")}}
                                </th>
                                <th>
                                    {{$t("label.expressAddress")}}
                                </th>
                                <th>
                                    {{$t("label.trackingNumber")}}
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
                            <tr v-for="(item,index) in exchangeRecordEntryList">
                                <td>
                                    {{item.userEmail?item.userEmail:'-'}}
                                </td>
                                <td>
                                    {{item.redeemRecord.redeemCodeId}}
                                </td>
                                <td>
                                    {{item.redeemRecord.goodsId}}
                                </td>
                                <td>
                                    {{item.goodsName}}
                                </td>
                                <td>
                                    {{item.redeemRecord.expressAddress}}
                                </td>
                                <td>
                                    {{item.redeemRecord.expressNo?item.redeemRecord.expressNo:'-'}}
                                </td>
                                <td>
                                    {{$t("btn."+item.redeemRecord.state+'Exchange')}}
                                </td>
                                <td>
                                    <el-button class="small handle-btn" v-if="item.redeemRecord.state=='wait'" @click="openExchangeHandleModal(item,2)">{{$t('btn.finishExchange')}}</el-button>
                                    <el-button class="small handle-btn" v-if="item.redeemRecord.state=='wait'" @click="openExchangeHandleModal(item,3)">{{$t('btn.cancel')}}</el-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <el-pagination
                            class="cm-pager"
                            @current-change="getExchangeRecordList"
                            :prev-text='$t("btn.prev")'
                            :next-text='$t("btn.next")'
                            :current-page="exchangeRecordPager.pageIndex"
                            :page-size="exchangeRecordPager.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="exchangeRecordPager.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :title='$t("title.buy")' class="edit-dialog cm-dialog buy-dialog" :visible.sync="buyModalFlag" v-if="buyModalFlag" width="40%">
            <div class="form" v-if="buyStep==1">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.expressAddress")}}</span>
                    <input type="text" v-model="buyForm.expressAddress" class="cm-input">
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="buyModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="saveBuy()">{{$t("btn.nextStep")}}</div>
                </div>
            </div>
            <div class="form order-info" v-if="buyStep==2">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.expressAddress")}}：</span>
                    <span class="value" style="margin-left: -20px;">{{buyForm.expressAddress}}</span>
                </div>
                <div class="cm-input-row">
                    <pay-btn :options="{target:curEntry.id,address:buyForm.expressAddress,callback:toPay}"></pay-btn>
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="buyModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="setBuyStep(1)">{{$t("btn.lastStep")}}</div>
                </div>
            </div>
        </el-dialog>

        <el-dialog :title='$t("title.exchange")' class="edit-dialog cm-dialog" :visible.sync="exchangeModalFlag" v-if="exchangeModalFlag" width="40%">
            <div class="form">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.redeemCode")}}</span>
                    <input type="text" v-model="exchangeForm.redeemCode" class="cm-input">
                </div>
                <div class="cm-input-row">
                    <span class="field">{{$t("label.expressAddress")}}</span>
                    <input type="text" v-model="exchangeForm.expressAddress" class="cm-input">
                </div>
            </div>
            <div class="handle-list">
                <div class="cm-btn cm-handle-btn handle-btn" @click="exchangeModalFlag=false">{{$t("btn.cancel")}}</div>
                <div class="cm-btn cm-handle-btn handle-btn" @click="saveExchange">{{$t("btn.submit")}}</div>
            </div>
        </el-dialog>

        <el-dialog title='' class="edit-dialog cm-dialog" :visible.sync="orderHandleModalFlag" v-if="orderHandleModalFlag" width="40%" :modal-append-to-body="false">
            <div class="form" v-if="orderHandleStep==1">
                <div class="cm-input-row" style="padding: 50px 0px;">
                   <span class="cm-btn cm-handle-btn" @click="setOrderHandleStep(2)">{{$t("btn.finishOrder")}}</span>
                    <span class="cm-btn cm-handle-btn cm-handle-info-btn" style="margin-left: 50px;" @click="setOrderHandleStep(3)">{{$t("btn.cancel")}}</span>
                </div>
            </div>
            <div class="form" v-if="orderHandleStep==2">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.trackingNumber")}}：</span>
                    <input type="text" v-model="orderHandleForm.expressNo" class="cm-input">
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="orderHandleModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="saveHandleOrder()">{{$t("btn.submit")}}</div>
                </div>
            </div>
            <div class="form" v-if="orderHandleStep==3">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.reason")}}：</span>
                    <input type="text" v-model="orderHandleForm.msg" class="cm-input">
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="orderHandleModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="saveHandleOrder()">{{$t("btn.submit")}}</div>
                </div>
            </div>
        </el-dialog>

        <el-dialog title='' class="edit-dialog cm-dialog" :visible.sync="exchangeHandleModalFlag" v-if="exchangeHandleModalFlag" width="40%">
            <div class="form" v-if="exchangeHandleStep==1">

            </div>
            <div class="form" v-if="exchangeHandleStep==2">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.trackingNumber")}}：</span>
                    <input type="text" v-model="exchangeHandleForm.expressNo" class="cm-input">
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="exchangeHandleModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="saveHandleExchange()">{{$t("btn.submit")}}</div>
                </div>
            </div>
            <div class="form" v-if="exchangeHandleStep==3">
                <div class="cm-input-row">
                    <span class="field">{{$t("label.reason")}}：</span>
                    <input type="text" v-model="exchangeHandleForm.msg" class="cm-input">
                </div>
                <div class="handle-list">
                    <div class="cm-btn cm-handle-btn handle-btn" @click="exchangeHandleModalFlag=false">{{$t("btn.cancel")}}</div>
                    <div class="cm-btn cm-handle-btn handle-btn" @click="saveHandleExchange()">{{$t("btn.submit")}}</div>
                </div>
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
                account:{},
                activeType:'goods',//goods、certificate、exchangeRecord、buyRecord

                pager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                entryList:[],
                curEntry:null,
                curGoods:null,

                exchangeModalFlag:false,
                exchangeForm:{},

                exchangeRecordPager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                exchangeRecordEntryList:[],
                curExchangeEntry:null,


               buyRecordPager:{
                    pageSize:20,
                    pageIndex:1,
                    total:0,
                    loading:false,
                },
                buyRecordEntryList:[],
                curOrderEntry:null,

                buyModalFlag:false,
                buyForm:{},
                buyStep:1,

                orderHandleModalFlag:false,
                orderHandleForm:{},
                orderHandleStep:1,


                exchangeHandleModalFlag:false,
                exchangeHandleForm:{},
                exchangeHandleStep:1,

                certificateGoodsList:[],

                goodsHostConfig:{},
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
                }
                this.pager.loading=true;
                Vue.api.getGoodsList(params).then((resp)=>{
                    this.pager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.goodsList;
                        list.forEach((item,i)=>{
                            let configObj=this.goodsHostConfig[item.id];
                            Object.assign(item,configObj);
                        })
                        this.entryList=list;
                        this.pager.total=data.count;
                        //临时测试
                      /*  this.curGoods=this.entryList[0];*/
                    /*  this.openBuyModal(this.entryList[0]);*/
                    }
                });
            },
            setCurGoods:function (item) {
              this.curGoods=item;
            },
            getExchangeRecordList:function (pageIndex) {
                this.exchangeRecordPager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.type=='admin'?'':this.account.id,
                    pageIndex:this.exchangeRecordPager.pageIndex,
                    pageSize:this.exchangeRecordPager.pageSize,
                }
                this.exchangeRecordPager.loading=true;
                Vue.api.getExchangeList(params).then((resp)=>{
                    this.exchangeRecordPager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.exchangeRecordEntryList=data.redeemRecordList;
                        this.exchangeRecordPager.total=data.count;
                        console.log('this.exchangeRecordEntryList:',this.exchangeRecordEntryList);
                    }
                });
            },
            getBuyRecordList:function (pageIndex) {
                this.buyRecordPager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.type=='admin'?'':this.account.id,
                    pageIndex:this.buyRecordPager.pageIndex,
                    pageSize:this.buyRecordPager.pageSize,
                }
                this.buyRecordPager.loading=true;
                Vue.api.getGoodsRecordList(params).then((resp)=>{
                    this.buyRecordPager.loading=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.buyRecordEntryList=data.goodsRecordList;
                        this.buyRecordPager.total=data.count;
                        console.log('this.buyRecordEntryList:',this.buyRecordEntryList);
                    }
                });
            },
            setType:function (value) {
                this.activeType=value;
                this.curGoods=null;
                if(value=='goods'){
                    this.getList(1);
                }else if(value=='exchangeRecord'){
                    this.getExchangeRecordList(1);
                }else if(value=='buyRecord'){
                    this.getBuyRecordList(1);
                }
            },
            openExchangeModal:function (item,$event) {
                if($event){
                    Vue.tools.stopPropagation($event);
                }
                this.curEntry=item;
                this.exchangeModalFlag=true;
                this.exchangeForm={};
            },
            addRedeemCode:function () {
                let params={
                    goodsId:this.entryList[0].id,
                }
                Vue.api.addRedeemCode(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('getCode:',data);
                    }else{

                    }
                });
            },
            saveExchange:function () {
                if(!this.exchangeForm.redeemCode){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.redeemCode")});
                    return;
                }
                if(!this.exchangeForm.expressAddress){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.expressAddress")});
                    return;
                }
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.id,
                    redeemCode:this.exchangeForm.redeemCode,
                    expressAddress:this.exchangeForm.expressAddress,
                    userType:this.account.type=='school'?'school':'instructor',
                    goodsId:this.curEntry.id,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.exchange(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.exchangeModalFlag=false;
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS")});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });
            },
            openBuyModal:function (item,$event) {
                if($event){
                    Vue.tools.stopPropagation($event);
                }
                this.curEntry=item;
                this.buyModalFlag=true;
                this.buyForm={};
                this.setBuyStep(1);
            },
            setBuyStep:function (value) {
                this.buyStep=value;
            },
            saveBuy:function () {
                if(!this.buyForm.expressAddress){
                    Vue.operationFeedback({type:'warn',text:this.$t("holder.expressAddress")});
                    return;
                }
                this.setBuyStep(2);
             /*   let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.id,
                    goodsId:this.curEntry.id,
                    expressAddress:this.buyForm.expressAddress,
                }
                let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                Vue.api.addOrder(params).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.setBuyStep(2);
                        fb.setOptions({type:'complete', text:this.$t("tips.handleS"),delayForDelete:0});
                    }else{
                        fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                    }
                });*/

            },
            openOrderHandleModal:function (item,step) {
                this.curOrderEntry=item;
                this.orderHandleModalFlag=true;
                this.orderHandleForm={};
                this.setOrderHandleStep(step?step:2);
            },
            setOrderHandleStep:function (value) {
                this.orderHandleStep=value;
            },
            saveHandleOrder:function () {
              if(this.orderHandleStep==2){
                   if(!this.orderHandleForm.expressNo){
                       Vue.operationFeedback({type:'warn',text:this.$t("holder.trackingNumber")});
                       return;
                   }
                  let params={
                      ...Vue.sessionInfo(),
                      id:this.curOrderEntry.goodsRecord.id,
                      expressNo:this.orderHandleForm.expressNo
                  }
                  let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                  Vue.api.fulfillGoodsRecord(params).then((resp)=>{
                      if(resp.respCode=='2000'){
                          this.orderHandleModalFlag=false;
                          this.curOrderEntry.goodsRecord.state='finish';
                          this.curOrderEntry.goodsRecord.expressNo=this.orderHandleForm.expressNo;
                          fb.setOptions({type:'complete', text:this.$t("tips.handleS"),delayForDelete:0});
                      }else{
                          fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                      }
                  });
              }else if(this.orderHandleStep==3){
              /*    if(!this.orderHandleForm.msg){
                      Vue.operationFeedback({type:'warn',text:this.$t("holder.reason")});
                      return;
                  }*/
                  let params={
                      ...Vue.sessionInfo(),
                      id:this.curOrderEntry.goodsRecord.id,
                      msg:this.orderHandleForm.msg?this.orderHandleForm.msg:'',
                  }
                  let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                  Vue.api.cancelGoodsRecord(params).then((resp)=>{
                      if(resp.respCode=='2000'){
                          this.orderHandleModalFlag=false;
                          this.curOrderEntry.goodsRecord.state='cancel';
                          this.curOrderEntry.goodsRecord.msg=this.orderHandleForm.msg;
                          fb.setOptions({type:'complete', text:this.$t("tips.handleS"),delayForDelete:0});
                      }else{
                          fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                      }
                  });
              }
            },
            openExchangeHandleModal:function (item,step) {
                this.curExchangeEntry=item;
                this.exchangeHandleModalFlag=true;
                this.exchangeHandleForm={};
                this.setExchangeHandleStep(step?step:2);
            },
            setExchangeHandleStep:function (value) {
                this.exchangeHandleStep=value;
            },
            saveHandleExchange:function () {
                if(this.exchangeHandleStep==2){
                    if(!this.exchangeHandleForm.expressNo){
                        Vue.operationFeedback({type:'warn',text:this.$t("holder.trackingNumber")});
                        return;
                    }
                    let params={
                        ...Vue.sessionInfo(),
                        id:this.curExchangeEntry.redeemRecord.id,
                        expressNo:this.exchangeHandleForm.expressNo
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                    Vue.api.fulfillRedeemRecord(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.exchangeHandleModalFlag=false;
                            this.curExchangeEntry.redeemRecord.state='finish';
                            this.curExchangeEntry.redeemRecord.expressNo=this.exchangeHandleForm.expressNo;
                            fb.setOptions({type:'complete', text:this.$t("tips.handleS"),delayForDelete:0});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                        }
                    });
                }else if(this.exchangeHandleStep==3){
                    /*    if(!this.exchangeHandleForm.msg){
                     Vue.operationFeedback({type:'warn',text:this.$t("holder.reason")});
                     return;
                     }*/
                    let params={
                        ...Vue.sessionInfo(),
                        id:this.curExchangeEntry.redeemRecord.id,
                        msg:this.exchangeHandleForm.msg?this.exchangeHandleForm.msg:'',
                    }
                    let fb=Vue.operationFeedback({text:this.$t("tips.handle")});
                    Vue.api.cancelRedeemRecord(params).then((resp)=>{
                        if(resp.respCode=='2000'){
                            this.exchangeHandleModalFlag=false;
                            this.curExchangeEntry.redeemRecord.state='cancel';
                            this.curExchangeEntry.redeemRecord.msg=this.exchangeHandleForm.msg;
                            fb.setOptions({type:'complete', text:this.$t("tips.handleS"),delayForDelete:0});
                        }else{
                            fb.setOptions({type:'warn', text:this.$t("tips.handleF",{msg:resp.respMsg})});
                        }
                    });
                }
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
                            alertInstance.close();
                            clearInterval(interval);
                            Vue.operationFeedback({type:'complete',text:this.$t("tips.payS")});
                            if(item&&item.gift){
                                this.alert({
                                    title:this.$t("title.tips"),
                                    html:'<div style="text-align: center;"><p style="font-size: 16px;">'+this.$t("tips.giftTips",{msg:this.$t("value."+item.gift)})+'</p></div>',
                                    yes:this.$t("btn.sure"),
                                })
                            }
                        }else{

                        }
                    });
                },5000)
            },
        },
        mounted () {
            /**/
            this.account=Vue.getAccountInfo();
            /**/
            for(let key in Vue.tools.hostedIdConfig){
                let valObj=Vue.tools.hostedIdConfig[key];
                if(valObj.type==this.account.type){
                    this.goodsHostConfig[valObj.code]={...valObj,id:key};
                }
            }
            console.log('this.goodsHostConfig:',this.goodsHostConfig);
          /*  Vue.tools.hostedIdConfig.forEach((item,i)=>{
                console.log('item:',item);
            })*/
            /**/
            if(this.account.type=='school'){
                this.certificateGoodsList=this.account.level=='center'?Vue.tools.centerGoodsList:Vue.tools.fiveStarCenterGoodsList;
            }else if(this.account.type=='coach'){
                let levelOptions=this.genLevelConfig({level:this.account.type=='coach'?this.account.mfiLevel:'all'});
                for(let i=0;i<levelOptions.length;i++){
                    let levelItem=levelOptions[i];
                    for(let j=0;j<Vue.tools.instructorCertificateGoodsList.length;j++){
                        let goods=Vue.tools.instructorCertificateGoodsList[j];
                        if(levelItem.value==goods.level){
                            this.certificateGoodsList.push(goods);
                            break;
                        }
                    }
                }
            }
            /**/
            this.setType('goods');
        },
    }
</script>
