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
        level:'等級',
        auditDate:'審核日期',
        email:"郵箱",
        school:"學校",
        fName:'姓',
        lName:'名',
        gender:'性別',
        birth:'生日',
        contact:'號碼',
        eContact:'緊急聯系人',
        insurance:'保險證明',
        firstAid:'急救證明',
        courseNo:'課程號',
        courseName:'課程名稱',
        site:'地點',
        startTime:'開始時間',
        health:'健康狀況證明',
        theory:'理論學習',
        pool:'泳池學習',
        openWater:'開放水域學習',
        auditType:'審核類別',
        type:'類別',
        submitDate:'提交日期',
        orderNo:'訂單號',
        buyer:'購買賬號',
        count:'數量',
        amount:'金額',
        orderTime:'訂單時間',
        studio:'多媒體課程',
        rest:'{msg}證書剩余',
        create:'创建时间',
        certificateNo:'證書編號',
        buyDate:'購買日期',
        student:'學員',
        grantDate:'日期',
        instructorName:'教練名稱',
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
        upload:'請上傳文件',
        coachSearch:'郵箱/名稱',
        email:'請輸入郵箱',
        level:'請選擇等級',
        school:'請選擇學校',
        courseSearch:'課程名稱',
        certificateStatisticsSearch:'賬號/姓名 模糊檢索',
        startTime:'請選擇開課時間',
        selectedStudent:'請選擇學員',
        emailStr:"請輸入郵箱，多個郵箱以','分隔",
        fName:'請輸入姓',
        lName:'請輸入名',
        gender:'請輸入性別',
        eContact:'請輸入緊急聯系人',
        insurance:'請上傳保險證明',
        firstAid:'請上傳急救證明',
        avatar:'請上傳頭像',
        reason:'請輸入原因',
    },
    btn:{
        adminLogin:'管理員登錄',
        superLogin:'超級管理員登錄',
        coachLogin:'教練登錄',
        studentLogin:'學員登錄',
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
        download:'下載文件',
        detail:'詳情',
        all:'全部',
        newCoach:'新建教練賬號',
        nonactivated:'未激活',
        certified:'已審核',
        pending:'待審核',
        fail:'審核不通過',
        disable:'禁用',
        viewAll:'查看全部',
        student:"學員信息",
        course:'課程信息',
        AuthorizationRecord:'授權記錄',
        completeStatus:'完成',
        waitingStatus:'待定',
        pendingGrant:'待定',
        waitingGrant:'等待授予',
        unused:'未授予',
        used:'已授予',
        granted:'已授予',
        grant:'授予',
        studentModule:'學員',
        auditModule:'審核',
        certificateModule:'證書統計',
        settingModule:'設置',
        configurable:'可自行設置',
        dueAudit:'教練賬號到期證書審核',
        toInstructor:'學員轉教練賬號審核',
        auditPending:'待審核',
        auditPass:'已通過',
        auditFail:'已駁回',
        myCourse:'我的課程',
        newCourse:'新的課程',
        viewCertificate:'查看證書',
        close:'關閉',
        buyToGrant:'購買並授予證書',
        addStudent:'添加學員',
        email:'郵件',
        fromMyStudent:'從我的學員選擇',
        newStudent:'爲學員新建賬號',
        myStudent:'我的學員',
        my:'我的',
        activation:'激活賬號',
        editInfo:'編輯信息',
        toPass:'通過',
        toReject:'駁回',
        applyForAudit:'申請審核',
    },
    title:{
        super:'超級管理員',
        admin:'管理員',
        coach:'教練',
        student:'學員',
        school:'學校',
        administratorList:'管理員列表',
        resetPwd:'密碼重置',
        tips:'溫馨提示',
        schoolAdmin:'學校管理',
        addSchool:'新增學校',
        editSchool:'編輯學校',
        message:'站內消息',
        addMsg:'新的消息',
        allCoach:'所有教練',
        newCoach:'新建教練',
        lCertificate:'等級證書',
        oCertificate:'其他',
        levelSetting:'等級設置',
        schoolSetting:'學校設置',
        auditingSetting:'審核設置',
        someoneCourse:'{msg}的課程信息',
        courseDetail:'{msg} 課程詳情',
        certificateStatistics:'證書統計',
        newCourse:'新的課程',
        studentInfo:'學員信息',
        addStudent:'添加學員',
        studentList:'學員列表',
        someoneStudent:'{msg}的學員信息',
        course:'課程信息',
        newStudent:'新的學員',
        certificateRecord:'我的證書授權記錄',
        instructorActivation:'教練賬號激活',
        studentActivation:'學員賬號激活',
        myCourseStatus:'我的課程狀態',
        accountSetting:'賬號設置',
        auditFail:'審核失敗',
        allStudent:'所有學員',
        someoneCertificateRecord:'{msg}的證書授權記錄',
    },
    tips:{
        login:'登錄中...',
        loginS:'登錄成功',
        loginF:'登錄失敗',
        setting:'設置中...',
        settingS:'設置成功',
        settingF:'設置失敗，{msg}',
        delete:'刪除中...',
        deleteS:'刪除成功',
        deleteF:'刪除失敗，{msg}',
        save:'保存中...',
        saveS:'保存成功',
        saveF:'保存失敗，{msg}',
        handle:'操作中...',
        handleS:'操作成功',
        handleF:'操作失敗，{msg}',
        delAdmin:'確定刪除管理員賬號：{msg}？',
        delMsg:'確定刪除消息：{msg}？',
        developing:'功能開發中',
        grant:'確定授予：{msg}{level}证书？',
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
