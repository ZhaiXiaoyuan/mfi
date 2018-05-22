/**
 * Created by Administrator on 2018/5/22 0022.
 */
//tw.js
const tw = {
    label:{
        account:'賬號',
        pwd:'密碼',
        status:'狀態',
        handle:'操作',
        enable:'啓用',
        disable:'停用',
        phone:'手機',
        name:'姓名',
        country:'國家',
        region:'地區',
        address:'地址',
        code:'編號',
        province:'省份',
        city:'城市',
        stick:'置頂',
        show:'展示',
        hide:'隱藏',
        title:'標題',
        file:'文件',
        time:'時間',
    },
    holder: {
        account:'請輸入賬號',
        pwd:'請輸入密碼',
        phone:'請輸入手機',
        name:'請輸入姓名',
        schoolSearch:'國家/地區/編號 模糊檢索',
        country:'請輸入國家',
        province:'請輸入省份/地區',
        city:'請輸入城市',
        address:'請輸入地址',
        code:'請輸入編號',
        title:'請輸入標題',
        upload:'請上傳文件'
    },
    btn:{
        adminLogin:'管理員登錄',
        superLogin:'超級管理員登錄',
        login:'登 錄',
        help:'幫助',
        administrator:'管理員',
        add:'添加',
        massage:'站內消息',
        coach:'教練',
        school:'學校',
        logout:'退出',
        resetPwd:'密碼重置',
        del:'刪除',
        prev:'上一頁',
        next:'下一頁',
        ok:'完成',
        cancel:'取消',
        sure:'確定',
        submit:'確認提交',
        edit:'編輯',
        addSchool:'新的學校',
        view:'查看',
        addMsg:'新的消息',
        upload:'上傳文件',
        reUpload:'重新上傳',
        back:'返回',
        download:'下載文件'
    },
    title:{
        super:'超級管理員',
        admin:'管理員',
        school:'學校',
        administratorList:'管理員列表',
        resetPwd:'密碼重置',
        tips:'溫馨提示',
        schoolAdmin:'學校管理',
        addSchool:'新增學校',
        editSchool:'編輯學校',
        message:'站內消息',
        addMsg:'新的消息',
    },
    tips:{
        login:'登錄中...',
        loginS:'登錄成功',
        loginFail:'登錄失敗',
        setting:'設置中...',
        settingS:'設置成功',
        settingF:'設置失敗，{msg}',
        delete:'刪除中...',
        deleteS:'刪除成功',
        deleteF:'刪除失敗，{msg}',
        save:'保存中...',
        saveS:'保存成功',
        saveF:'保存失敗，{msg}',
        delAdmin:'確定刪除管理員賬號：{msg}？',
        delMsg:'確定刪除消息：{msg}？'
    },
    el: {
        colorpicker: {
            confirm: '確認',
            clear: '清空'
        },
        datepicker: {
            now: '現在',
            today: '今天',
            cancel: '取消',
            clear: '清空',
            confirm: '確認',
            selectDate: '選擇日期',
            selectTime: '選擇時間',
            startDate: '開始日期',
            startTime: '開始時間',
            endDate: '結束日期',
            endTime: '結束時間',
            prevYear: '前一年',
            nextYear: '後一年',
            prevMonth: '上個月',
            nextMonth: '下個月',
            year: '年',
            month1: '1 月',
            month2: '2 月',
            month3: '3 月',
            month4: '4 月',
            month5: '5 月',
            month6: '6 月',
            month7: '7 月',
            month8: '8 月',
            month9: '9 月',
            month10: '10 月',
            month11: '11 月',
            month12: '12 月',
            // week: '周次',
            weeks: {
                sun: '日',
                mon: '一',
                tue: '二',
                wed: '三',
                thu: '四',
                fri: '五',
                sat: '六'
            },
            months: {
                jan: '一月',
                feb: '二月',
                mar: '三月',
                apr: '四月',
                may: '五月',
                jun: '六月',
                jul: '七月',
                aug: '八月',
                sep: '九月',
                oct: '十月',
                nov: '十一月',
                dec: '十二月'
            }
        },
        select: {
            loading: '加載中',
            noMatch: '無匹配資料',
            noData: '無資料',
            placeholder: '請選擇'
        },
        cascader: {
            noMatch: '無匹配資料',
            loading: '加載中',
            placeholder: '請選擇'
        },
        pagination: {
            goto: '前往',
            pagesize: '項/頁',
            total: '共 {total} 項',
            pageClassifier: '頁'
        },
        messagebox: {
            title: '提示',
            confirm: '確定',
            cancel: '取消',
            error: '輸入的資料不符規定!'
        },
        upload: {
            deleteTip: '按 delete 鍵可刪除',
            delete: '刪除',
            preview: '查看圖片',
            continue: '繼續上傳'
        },
        table: {
            emptyText: '暫無資料',
            confirmFilter: '篩選',
            resetFilter: '重置',
            clearFilter: '全部',
            sumText: 'Sum' // to be translated
        },
        tree: {
            emptyText: '暫無資料'
        },
        transfer: {
            noMatch: '無匹配資料',
            noData: '無資料',
            titles: ['List 1', 'List 2'], // to be translated
            filterPlaceholder: 'Enter keyword', // to be translated
            noCheckedFormat: '{total} items', // to be translated
            hasCheckedFormat: '{checked}/{total} checked' // to be translated
        }
    }
}

export default tw;
