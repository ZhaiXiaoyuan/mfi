/**
 * Created by Administrator on 2018/5/22 0022.
 */
//tw.js
const tw = {
    label:{
        account:'帳號',
        loginEmail:'登入電郵',
        pwd:'密碼',
        resetPwd:'新密碼',
        status:'狀態',
        handle:'操作',
        enable:'啓用',
        disable:'停用',
        phone:'手機',
        name:'姓名',
        country:'國家/地區',
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
        email:"電郵",
        school:"學校",
        fName:'姓',
        lName:'名',
        gender:'性別',
        birth:'生日',
        contact:'號碼',
        eContactName:'緊急聯系人姓名',
        eContact:'緊急聯系人號碼',
        insurance:'有效教練責任保險',
        firstAid:'有效急救證書',
        courseNo:'課程號',
        courseName:'課程名稱',
        site:'地點',
        startTime:'開始時間',
        health:'健康狀況證明',
        theory:'理論',
        theoryExam:'筆試',
        pool:'泳池',
        openWater:'海洋課',
        auditType:'審核類別',
        type:'類別',
        submitDate:'提交日期',
        orderNo:'訂單號',
        buyer:'購買帳號',
        count:'數量',
        amount:'金額',
        orderTime:'訂單時間',
        studio:'形體',
        rest:'{msg}證書剩余',
        create:'创建时间',
        certificateNo:'證書編號',
        buyDate:'購買日期',
        student:'學員',
        grantDate:'日期',
        instructorName:'教練名稱',
        customerService:"客服",
        postcode:'郵編',
        quantity:'人數',
        schoolName:'學校名',
        paymentAccount:'支付帳號',
        gift20M0:'贈送20 M0',
        schoolNameLen:'學校名稱',
        redeemCode:'兌換碼',
        expressAddress:'運輸地址',
        goodsType:'產品類別',
        goodsName:'產品名稱',
        price:'售價',
        goodsCode:'產品編碼',
        trackingNumber:'運輸單號',
        message:'消息',
        reason:'原因',
        randomCode:'兌換碼',
        verificationCode:'驗證碼',
        instructor:'教練',
        instructorAccount:'教練帳號',
        remaining:'剩余',
        from:'轉發方',
        to:'接收方',
        annualFeelForProfessionalMembers:'專業會員年費',
        instructorQualification:'專業教練註冊年費',
        schoolQualification:'資格延續年費',
        setPwd:'設定新的密碼',
        avatar:'上傳照片',
        tricks: '技巧',
        tricksPerformance: '技巧考核',
        dynamicRoutine: '動態',
        staticRoutine: '靜態',
        rescuePerformance: '救援',
        staticRoutineWOMerFin: '無蹼',
        dualRoutine: '雙人',
        soloPerformance: '個人表演',
        teachingTheory: '教學能力 (理論)',
        teachingStudio: '教學能力 (形體)',
        teachingPool: '教學能力 (泳池)',
        waterSafety: '水下安全',
        freeDiving: '自由潛水員認證',
        scuba: '水肺潛水員認證',
        freeDivingInstuctor: '自由潛水教練認證',
        scubaInstructor: '水肺潛水教練認證',
        AIDA2FreeDiving: 'AIDA 2自由潛水等效的認證',
        freeDivingCertification: '自由潛水相關資格',
        scubaOrFreeDivingCertification: '水肺潛水員或自由潛水員認證',
        scubaOrFreeDivingInstructor: '水肺潛水教練或自由潛水教練認證',
        studioPerformance: '形體考核',
        teachingSkills: '教學能力',
        performance: '技巧考核',
        M0: "M0 人魚體驗",
        M1: "M1 基礎人魚",
        M2: "M2 進階人魚",
        M3: "M3 大師人魚",
        BMI: "BMI 初級人魚教練",
        MI: "MI 人魚教練",
        MIT: "MIT 人魚教練訓練官",
        O1: "O1 基礎海洋人魚",
        O2: "O2 進階海洋人魚",
        OI: "OI 海洋人魚教練",
        J1: "J1 人魚探索者",
        J2: "J2 人魚冒險家",
        J3: "J3 人魚之星",
        JI: "JI 童樂人魚教練",
        G1: "G1 初級戒護專長",
        G2: "G2 進階戒護專長",
        GI: "GI 戒護專長教練",
        P1: "P1 初級攝影安全大師",
        P2: "P2 進階攝影安全大師",
        PI: "PI 攝影安全教練",
        need: '待完成',
        pass: '完成'
    },
    holder: {
        account:'請輸入帳號',
        loginEmail:'請輸入登入電郵',
        pwd:'請輸入密碼',
        newPwd:'請輸入新密碼',
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
        coachSearch:'電郵/名稱',
        email:'請輸入電郵',
        level:'請選擇等級',
        school:'請選擇學校',
        courseSearch:'課程名稱',
        certificateStatisticsSearch:'帳號/姓名 模糊檢索',
        startTime:'請選擇開課時間',
        selectedStudent:'請選擇學員',
        emailStr:"請輸入電郵，多個電郵以','分隔，請註意不要留有空格。",
        fName:'請輸入姓',
        lName:'請輸入名',
        gender:'請輸入性別',
        eContactName:'請輸入緊急聯系人姓名',
        eContact:'請輸入緊急聯系人號碼',
        insurance:'請上傳有效教練責任保險',
        firstAid:'請上傳有效急救證書',
        avatar:'請上傳照片',
        reason:'請輸入原因',
        content:'請輸入內容',
        nayContent:'請輸入內容或者上傳文件',
        postcode:'請輸入郵編',
        schoolName:'請輸入學校名',
        redeemCode:'請輸入兌換碼',
        expressAddress:'請輸入運輸地址',
        trackingNumber:'請輸入運輸單號',
        verificationCode:'請輸入驗證碼',
        instructor:'請選擇教練',
    },
    value:{
        certified:'',
        center:'發展中心',
        advancedCenter:'五星發展中心',
        cCount:'{count}張',
        merleggings:'魚鱗褲',
        leggings:'魚鱗褲',
        stickers:'貼紙',
        pins:'別針',
    },
    btn:{
        adminLogin:'管理員登錄',
        superLogin:'超級管理員登錄',
        coachLogin:'教練登錄',
        studentLogin:'學員登錄',
        schoolLogin:'學校登錄',
        login:'登 錄',
        help:'幫助',
        administrator:'管理員',
        add:'添加',
        message:'站內消息',
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
        addSchool:'新增',
        view:'查看',
        addMsg:'新建',
        upload:'上傳文件',
        reUpload:'重新上傳',
        back:'返回',
        download:'下載文件',
        detail:'詳情',
        all:'全部',
        newCoach:'新建',
        nonActivated:'未激活',
        certified:'已審核',
        /*certified:'已註冊（激活）',*/
        pending:'待審核',
        fail:'不合資格',
        disable:'禁用',
        viewAll:'查看全部',
        student:"學員信息",
        course:'課程信息',
        AuthorizationRecord:'授予記錄',
        completeStatus:'完成',
        waitingStatus:'待定',
        pendingGrant:'待定',
        waitingGrant:'等待授予',
        unused:'未授予',
        used:'已授予',
        granted:'已發證書',
        grant:'授予',
        studentModule:'學員',
        auditModule:'審核',
        certificateModule:'證書統計',
        settingModule:'設置',
        configurable:'個人教練',
        dueAudit:'教練帳號到期證書審核',
        toInstructor:'學員轉教練帳號審核',
        auditPending:'待審核',
        auditPass:'符合資格',
        auditFail:'不合資格',
        auditPassLen:'通過審核',
        myCourse:'我的課程',
        newCourse:'新的課程',
        viewCertificate:'查看證書',
        close:'關閉',
        buyToGrant:'購買並授予證書',
        addStudent:'添加學員',
        email:'發送激發電郵給予學員',
        fromMyStudent:'從"我的學員"中選擇',
        newStudent:'爲學員新建帳號',
        myStudent:'我的學員',
        my:'我的資料',
        activation:'激活帳號',
        editInfo:'編輯信息',
        toPass:'符合資格',
        toReject:'不合資格',
        applyForAudit:'申請審核',
        myAudit:'我的審核',
        go:'前往',
        professionalMembersFeeWaiver:'免除專業會員年費',
        instructorQualificationFeeWaiver:'免除專業教練註冊年費',
        schoolQualificationFeeWaiver:'免除資格延續年費',
        activationEmail:'重新發送激活郵件',
        status:'狀態',
        notPrint:'未打印',
        printing:'打印中',
        hasPrint:'已打印',
        hasSent:'已寄送',
        finish:'已完成',
        studentDetail:'學員詳情',
        toHome:'首頁',
        agree:'同意',
        send:'贈送',
        sent:'已贈送',
        teachingMaterial:'教材',
        newMaterial:'新增',
        save:'保存',
        useDefaultPwd:'設為系統默認',
        buyRecord:'購買記錄',
        coachInfo:'教練信息',
        mall:'人魚商城',
        goods:'商品',
        exchangeRecord:'兌換記錄',
        exchange:'立即兌換',
        buy:'立即購買',
        lastStep:'上一步',
        nextStep:'下一步',
        toPay:'點擊付款',
        waitOrder:'待發貨',
        finishOrder:'已發貨',
        cancelOrder:'已取消',
        exchangeAdmin:'兌換管理',
        orderAdmin:'訂單管理',
        handle:'操作',
        waitExchange:'待發貨',
        finishExchange:'已發貨',
        cancelExchange:'已取消',
        forget:'忘記密碼',
        getCode:'獲取電郵驗證碼',
        pass:'符合資格',
        courseLen:'課程',
        someoneCourse:'{msg}的課程',
        selfCourse:'我開設的課程',
        selfCreate:'他/她開設的課程',
        switchToInstructor:'切換為教練',
        switchToStudent:'切換為學員',
        buyCertificate:'購買證書',
        transpondCertificate:'證書轉發',
        toBuy:'立即購買',
        transpondRecord:'證書轉發記錄',
        schoolCourse:'學校開設的課程',
        certificate:'證書',
        editorDoc:'文本編輯器說明',
        assistToActivate: '',
        new: '新建',
        createAndActivate: '即時為學員輸入資料'
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
        statusSetting:'狀態設置',
        someoneCourse:'{msg}的課程信息',
        courseDetail:'{msg} 課程詳情',
        certificateStatistics:'證書統計',
        newCourse:'新的課程',
        studentInfo:'學員信息',
        addStudent:'為學員新建賬號',
        studentList:'學員列表',
        someoneStudent:'{msg}的學員信息',
        course:'課程信息',
        newStudent:'新的學員',
        certificateRecord:'我的證書授予記錄',
        instructorActivation:'教練帳號激活',
        studentActivation:'學員帳號激活',
        myCourseStatus:'我的課程狀態',
        accountSetting:'帳號設置',
        auditFail:'不合資格',
        allStudent:'所有學員',
        someoneCertificateRecord:'{msg}的證書授予記錄',
        nonActivated:'帳號未激活',
        pending:'帳號審核中',
        certified:'帳號已審核',
        fail:'不合資格',
        disable:'账号已禁用',
        serviceProtocol:'MFI用戶服務協議',
        teachingMaterial:'教材',
        addMaterial:'新增教材',
        editMaterial:'編輯教材',
        materialDetail:'教材詳情',
        mall:'人魚商城',
        exchange:'兌換',
        buy:'購買',
        someoneCoach:'{msg}的教練',
        someoneBuyRecord:'{msg}的購買記錄',
        centerCoupons:'發展中心優惠券',
        fiveStarCenterCoupons:'五星發展中心優惠券',
        schoolCourse:'學校課程',
        toPaypal:'點擊跳轉到paypal進行購買',
        to:'至',
    },
    tips:{
        login:'登錄中...',
        loginS:'登錄成功',
        loginF:'登錄失敗，賬號或密碼有誤！',
        accountDisable:'該賬號已禁用！',
        setting:'設置中...',
        settingS:'設置成功',
        settingF:'設置失敗，{msg}',
        grantS:'授予成功',
        grantF:'授予失敗，{msg}',
        delete:'刪除中...',
        deleteS:'刪除成功',
        deleteF:'刪除失敗，{msg}',
        save:'保存中...',
        saveS:'保存成功',
       /* saveF:'保存失敗，{msg}',*/
        saveF: '{msg}',
        handle:'操作中...',
        handleS:'操作成功',
      /*  handleF:'操作失敗，{msg}',*/
        handleF:'{msg}',
        delAdmin:'確定刪除管理員帳號：{msg}？',
        delMsg:'確定刪除消息：{msg}？',
        del:'確定刪除：{msg}？',
        developing:'功能開發中',
        grant:'確定授予：{msg}{level}证书？',
        forbidden:"您的帳號已禁用！",
        payingTips:'操作中，請勿刷新或關閉窗口！',
        annualFeelForProfessionalMembers:'請繳納專業會員年費',
        instructorQualification:'請繳納專業教練註冊年費',
        schoolQualification:'請繳納資格延續年費',
        mobileTips:'激活成功！',
        apiError:'操作出错，改账号或已存在！',
        professionalMembersFeeWaiver:'確定免除該教練的專業會員年費？',
        instructorQualificationFeeWaiver:'確定免除該教練的專業教練註冊年費？',
        schoolQualificationFeeWaiver:'確定免除該學校的資格延續年費？',
        upload:'上傳中',
        uploadS:'上傳成功',
        uploadF:'上傳失敗',
        pay:'支付中...',
        payS:'支付成功',
        payF:'支付失敗',
        pInt:'數量有誤，請輸入大於零的整數',
        buyM0Tips:'購買{count}張{level}證書',
        track:'可透過運輸單號在運輸公司網站上查詢發貨狀態',
        deviceTips:'尊敬的EOS系統用戶目前版本EOS系統僅支持使用電腦端打開',
        total:'共{msg}條記錄',
        coachCountTips:'未滿三位教練無法開課',
        giftTips:'已完成購買，贈送您{count}條{msg}，兌換序號將寄到您的註冊郵件地址',
        switchFail:'您暫時還不是我們的人魚教練，繼續努力練習，找我們查詢教練專業發展資訊！',
        buyCountTips:'單次購買USD2000或以上等值的證照/ 其他跨級別的證照購買，請直接電郵info@mfimermaid.com。',
        exemptTile:'MFI專業教練註冊年費',
        exemptNotice1:'所有教練每年在3月31號或之前需提供 1）有效急救證書 及 2） 註冊年費(USD180) 以滿足每年註冊的要求。因應現時世界疫情大流行，官方將提供優惠政策：',
        exemptNotice2:'如您在過去一個年度內（截至2020年3月31日），',
        exemptNotice3:'1) 已經購入4套或以上 M1/M2/M3證照，2020年度註冊年費將會豁免收費; ',
        exemptNotice4:'2) 已經購入4套以下 M1/M2/M3證照，2020年度註冊年費將會豁免50%收費 (即USD90)。',
        exemptNotice5:'謝謝您的支持，您已滿足條件 1），所以您的2020註冊年費已獲得豁免。',
        exemptNotice6:'謝謝您的支持，您已滿足條件 2）所以您的2020註冊年費已獲得50%豁免 。',
        activateStudentConfirm: '是否所有資料正確？',
        addStudent: '是否所有資料正確？'
    },
    editor:{
        title: '設置標題',
        p: '正文',
        linkText: '鏈接文字',
        link: '鏈接',
        uploadImage: '上傳圖片',
        editImage:'編輯圖片',
        maxWidth:'最大寬度',
        deleteImage:'刪除圖片',
        onlineImage:'網絡圖片',
        imageLink:'圖片鏈接',
        insert:'插入',
        upload: '上傳',
        fontSize:'字號',
        fontFamily:'字體',
        SongTypeface:'宋體',
        MicrosoftAccorblack:'微軟雅黑',
        fontColor:'文字顏色',
        backgroundColor:'背景顏色',
        list:'設置列表',
        orderedList:'有序列表',
        unorderedList:'無序列表',
        alignment:'對齊方式',
        left:'靠左',
        center:'居中',
        right:'靠右',
        insertTable:'插入表格',
        init: '創建',
        row:'行',
        col:'列的表格',
        insertVideo:'插入視頻',
        format:"格式如：",
        default:'默認',
        sina:'新浪',
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
        },

    }
}

export default tw;
