/**
 * Created by Administrator on 2018/5/22 0022.
 */
//cn.js
const cn = {
    label:{
        account:'账号',
        loginEmail:'登记电邮',
        pwd:'密码',
        resetPwd:'新密码',
        status:'状态',
        handle:'操作',
        enable:'启用',
        disable:'停用',
        phone:'手机',
        name:'姓名',
        country:'国家/地区',
        region:'地区',
        address:'地址',
        code:'编号',
        province:'省份',
        city:'城市',
        stick:'置顶',
        show:'展示',
        hide:'隐藏',
        title:'标题',
        file:'文件',
        time:'时间',
        level:'等级',
        auditDate:'审核日期',
        email:"邮箱",
        school:'学校',
        fName:'姓',
        lName:'名',
        gender:'性别',
        birth:'生日',
        contact:'号码',
        eContactName:'紧急联系人姓名',
        eContact:'紧急联系人号码',
        insurance:'保险证明',
        firstAid:'急救证明',
        courseNo:'课程号',
        courseName:'课程名称',
        site:'地点',
        startTime:'开始时间',
        health:'健康状况证明',
        theory:'理论课',
        pool:'泳池课',
        openWater:'海洋课',
        auditType:'审核类别',
        type:'类别',
        submitDate:'提交日期',
        dueAudit:'教练账号到期证书审核',
        toInstructor:'学员转教练账号审核',
        orderNo:'订单号',
        buyer:'购买账号',
        count:'数量',
        amount:'金额',
        orderTime:'订单时间',
        studio:'形体课',
        rest:'{msg}证书剩余',
        create:'创建时间',
        certificateNo:'证书编号',
        buyDate:'购买日期',
        student:'学员',
        grantDate:'日期',
        instructorName:'教练名称',
        customerService:"客服",
        postcode:'邮编',
        quantity:'人数',
        schoolName:'学校名',
        paymentAccount:'支付帳號',
        gift20M0:'赠送20 M0',
        schoolNameLen:'学校名称',
        redeemCode:'兑换码',
        expressAddress:'运输地址',
        goodsType:'产品类别',
        goodsName:'商品名称',
        price:'售价',
        goodsCode:'产品编码',
        trackingNumber:'运输单号',
        message:'消息',
        reason:'原因',
        randomCode:'兑换码',
        verificationCode:'验证码',
        instructor:'教练',
        instructorAccount:'教练账号',
        remaining:'剩余',
        from:'转发方',
        to:'接收方',
        annualFeelForProfessionalMembers:'专业会员年费',
        instructorQualification:'教练资格註册延续年费',
        schoolQualification:'资格延续年费',
        setPwd:'设定新密码',
        avatar:'上传照片',
    },
    holder: {
        account:'请输入账号',
        loginEmail:'请输入登记电邮',
        pwd:'请输入密码',
        newPwd:'请输入新密码',
        phone:'请输入手机',
        name:'请输入姓名',
        schoolSearch:'国家/地区/编号 模糊检索',
        country:'请输入国家',
        province:'请输入省份/地区',
        city:'请输入城市',
        address:'请输入地址',
        code:'请输入编号',
        title:'请输入标题',
        upload:'请上传文件',
        coachSearch:'邮箱/名称',
        email:'请输入邮箱',
        level:'请选择等级',
        school:'请选择学校',
        courseSearch:'课程名称',
        certificateStatisticsSearch:'账号/姓名 模糊检索',
        startTime:'请选择开课时间',
        selectedStudent:'请选择学员',
        emailStr:"请输入邮箱，多个邮箱以','分隔，请注意不要留有空格。",
        fName:'请输入姓',
        lName:'请输入名',
        gender:'请输入性别',
        eContactName:'请输入紧急联系人姓名',
        eContact:'请输入紧急联系人号码',
        insurance:'请上传保险证明',
        firstAid:'请上传急救证明',
        avatar:'请上传照片',
        reason:'请输入原因',
        content:'请输入内容',
        nayContent:'请输入内容或者上传文件',
        postcode:'请输入邮编',
        schoolName:'请输入学校名',
        redeemCode:'请输入兑换码',
        expressAddress:'请输入运输地址',
        trackingNumber:'请输入运输单号',
        verificationCode:'请输入验证码',
        instructor:'请选择教练',
    },
    value:{
        certified:'',
        center:'发展中心',
        advancedCenter:'五星发展中心',
        cCount:'{count}张',
        merleggings:'鱼鳞裤',
        leggings:'鱼鳞裤',
        stickers:'贴纸',
        pins:'别针',
    },
    btn:{
        adminLogin:'管理员登录',
        superLogin:'超级管理员登录',
        coachLogin:'教练登录',
        studentLogin:'学员登录',
        schoolLogin:'学校登录',
        login:'登 录',
        help:'帮助',
        administrator:'管理员',
        add:'添加',
        message:'站内消息',
        coach:'教练',
        school:'学校',
        logout:'退出',
        resetPwd:'密码重置',
        del:'删除',
        prev:'上一页',
        next:'下一页',
        ok:'完成',
        cancel:'取消',
        sure:'确定',
        submit:'确认提交',
        edit:'编辑',
        addSchool:'新的学校',
        view:'查看',
        addMsg:'新的消息',
        upload:'上传文件',
        reUpload:'重新上传',
        back:'返回',
        download:'下载文件',
        detail:'详情',
        all:'全部',
        newCoach:'新建教练账号',
        nonActivated:'未激活',
        certified:'已审核',
      /*  certified:'已註册（激活）',*/
        pending:'待审核',
        fail:'审核不通过',
        disable:'禁用',
        viewAll:'查看全部',
        student:'学员信息',
        course:'课程信息',
        AuthorizationRecord:'授予记录',
        completeStatus:'完成',
        waitingStatus:'待定',
        pendingGrant:'待定',
        waitingGrant:'等待授予',
        unused:'未授予',
        used:'已授予',
        granted:'已发证书',
        grant:'授予',
        studentModule:'学员',
        auditModule:'审核',
        certificateModule:'证书统计',
        settingModule:'设置',
        configurable:'个人教练',
        dueAudit:'教练账号到期证书审核',
        toInstructor:'学员转教练账号审核',
        auditPending:'待审核',
        auditPass:'已通过',
        auditFail:'已驳回',
        auditPassLen:'通过审核',
        myCourse:'我的课程',
        newCourse:'新的课程',
        viewCertificate:'查看证书',
        close:'关闭',
        buyToGrant:'购买并授予证书',
        addStudent:'添加学员',
        email:'邮件',
        fromMyStudent:'从我的学员选择',
        newStudent:'为学员新建账号',
        myStudent:'我的学员',
        my:'我的资料',
        activation:'激活账号',
        editInfo:'编辑信息',
        toPass:'通过',
        toReject:'驳回',
        applyForAudit:'申请审核',
        myAudit:'我的审核',
        go:'前往',
        professionalMembersFeeWaiver:'免除专业会员年费',
        instructorQualificationFeeWaiver:'免除教练资格註册延续年费',
        schoolQualificationFeeWaiver:'免除资格延续年费',
        activationEmail:'重新发送激活邮件',
        status:'状态',
        notPrint:'未打印',
        printing:'打印中',
        hasPrint:'已打印',
        hasSent:'已寄送',
        finish:'已完成',
        studentDetail:'学员详情',
        toHome:'首页',
        agree:'同意',
        send:'赠送',
        sent:'已赠送',
        teachingMaterial:'教材',
        newMaterial:'新的教材',
        save:'保存',
        useDefaultPwd:'设为系统默认',
        buyRecord:'购买记录',
        coachInfo:'教练信息',
        mall:'人鱼商城',
        goods:'商品',
        exchangeRecord:'兑换记录',
        exchange:'立即兑换',
        buy:'立即购买',
        lastStep:'上一步',
        nextStep:'下一步',
        toPay:'点击付款',
        waitOrder:'待发货',
        finishOrder:'已发货',
        cancelOrder:'已取消',
        exchangeAdmin:'兑换管理',
        orderAdmin:'订单管理',
        handle:'操作',
        waitExchange:'待发货',
        finishExchange:'已发货',
        cancelExchange:'已取消',
        forget:'忘记密码',
        getCode:'获取邮箱验证码',
        pass:'已审核',
        courseLen:'课程',
        someoneCourse:'{msg}的课程',
        selfCourse:'我开设的课程',
        selfCreate:'TA开设的课程',
        switchToInstructor:'切换为教练',
        switchToStudent:'切换为学员',
        buyCertificate:'购买证书',
        transpondCertificate:'证书转发',
        toBuy:'立即购买',
        transpondRecord:'证书转发记录',
        schoolCourse:'学校开设的课程',
        certificate:'证书',
        editorDoc:'文本编辑器说明',
    },
    title:{
        super:'超级管理员',
        admin:'管理员',
        coach:'教练',
        student:'学员',
        school:'学校',
        administratorList:'管理员列表',
        resetPwd:'密码重置',
        tips:'温馨提示',
        schoolAdmin:'学校管理',
        addSchool:'新增学校',
        editSchool:'编辑学校',
        message:'站内消息',
        addMsg:'新的消息',
        allCoach:'所有教练',
        newCoach:'新建教练',
        lCertificate:'等级证书',
        oCertificate:'其他',
        levelSetting:'等级设置',
        schoolSetting:'学校设置',
        auditingSetting:'审核设置',
        statusSetting:'状态设置',
        someoneCourse:'{msg}的课程信息',
        courseDetail:'{msg} 课程详情',
        certificateStatistics:'证书统计',
        newCourse:'新的课程',
        studentInfo:'学员信息',
        addStudent:'添加学员',
        studentList:'学员列表',
        someoneStudent:'{msg}的学员信息',
        course:'课程信息',
        newStudent:'新的学员',
        certificateRecord:'我的证书授予记录',
        instructorActivation:'教练账号激活',
        studentActivation:'学员账号激活',
        myCourseStatus:'我的课程状态',
        accountSetting:'账号设置',
        auditFail:'审核失败',
        allStudent:'所有学员',
        someoneCertificateRecord:'{msg}的证书授予记录',
        nonActivated:'账号未激活',
        pending:'账号审核中',
        certified:'账号已审核',
        fail:'账号审核失败',
        disable:'账号已禁用',
        serviceProtocol:'MFI用户服务协议',
        teachingMaterial:'教材',
        addMaterial:'新增教材',
        editMaterial:'编辑教材',
        materialDetail:'教材详情',
        mall:'人鱼商城',
        exchange:'兑换',
        buy:'购买',
        someoneCoach:'{msg}的教练',
        someoneBuyRecord:'{msg}的购买记录',
        centerCoupons:'发展中心优惠券',
        fiveStarCenterCoupons:'五星发展中心优惠券',
        schoolCourse:'学校课程',
        toPaypal:'点击跳转到paypal进行购买',
    },
    tips:{
        login:'登录中...',
        loginS:'登录成功',
        loginF:'登录失败，账号或密码有误！',
        accountDisable:'该账号已禁用！',
        setting:'设置中...',
        settingS:'设置成功',
        settingF:'设置失败，{msg}',
        delete:'删除中...',
        deleteS:'删除成功',
        deleteF:'删除失败，{msg}',
        save:'保存中...',
        saveS:'保存成功',
        saveF:'保存失败，{msg}',
        handle:'操作中...',
        handleS:'操作成功',
        handleF:'操作失败，{msg}',
        delAdmin:'确定删除管理员账号：{msg}？',
        delMsg:'确定删除消息：{msg}？',
        del:'确定删除：{msg}？',
        total:'共{msg}条记录',
        developing:'功能开发中',
        grant:'确定授予：{msg}{level}证书？',
        forbidden:"您的账号已禁用！",
        payingTips:'操作中，请勿刷新或关闭窗口！',
        annualFeelForProfessionalMembers:'请缴纳专业会员年费',
        instructorQualification:'请缴纳教练资格註册延续年费',
        schoolQualification:'请缴纳资格延续年费',
        mobileTips:'激活成功！',
        apiError:'操作出错，改账号或已存在！',
        professionalMembersFeeWaiver:'确定免除该教练的专业会员年费？',
        instructorQualificationFeeWaiver:'确定免除该教练的资格註册延续年费？',
        schoolQualificationFeeWaiver:'确定免除该学校的资格延续年费？',
        upload:'上传中',
        uploadS:'上传成功',
        uploadF:'上传失败',
        pay:'支付中...',
        payS:'支付成功',
        payF:'支付失败',
        pInt:'数量有误，请输入大于零的整数',
        buyM0Tips:'购买{count}张{level}证书',
        track:'可透过运输单号在运输公司网站上查询发货状态',
        deviceTips:'尊敬的EOS系统用户目前版本EOS系统仅支持使用电脑端打开',
        coachCountTips:'未满三位教练无法开课',
        giftTips:'已完成购买，赠送您{count}条{msg}，兑换序号将寄到您的注册邮件地址',
        switchFail:'您暂时还不是我们的人鱼教练，继续努力练习， 找我们查询教练专业发展资讯 ！',
        buyCountTips:'单次购买USD2000或以上等值的证照/ 其他跨级别的证照购买，请直接电邮info@mfimermaid.com。',
    },
    editor:{
        title: '设置标题',
        p: '正文',
        linkText: '链接文字',
        link: '链接',
        uploadImage: '上传图片',
        editImage:'编辑图片',
        maxWidth:'最大宽度',
        deleteImage:'删除图片',
        onlineImage:'网络图片',
        imageLink:'图片链接',
        insert:'插入',
        upload: '上传',
        fontSize:'字号',
        fontFamily:'字体',
        SongTypeface:'宋体',
        MicrosoftAccorblack:'微软雅黑',
        fontColor:'文字颜色',
        backgroundColor:'背景颜色',
        list:'设置列表',
        orderedList:'有序列表',
        unorderedList:'无序列表',
        alignment:'对齐方式',
        left:'靠左',
        center:'居中',
        right:'靠右',
        insertTable:'插入表格',
        init: '创建',
        row:'行',
        col:'列的表格',
        insertVideo:'插入视频',
        format:"格式如：",
        default:'默认',
        sina:'新浪',
    },
    el: {
        colorpicker: {
            confirm: '确定',
            clear: '清空'
        },
        datepicker: {
            now: '此刻',
            today: '今天',
            cancel: '取消',
            clear: '清空',
            confirm: '确定',
            selectDate: '选择日期',
            selectTime: '选择时间',
            startDate: '开始日期',
            startTime: '开始时间',
            endDate: '结束日期',
            endTime: '结束时间',
            prevYear: '前一年',
            nextYear: '后一年',
            prevMonth: '上个月',
            nextMonth: '下个月',
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
            loading: '加载中',
            noMatch: '无匹配数据',
            noData: '无数据',
            placeholder: '请选择'
        },
        cascader: {
            noMatch: '无匹配数据',
            loading: '加载中',
            placeholder: '请选择'
        },
        pagination: {
            goto: '前往',
            pagesize: '条/页',
            total: '共 {total} 条',
            pageClassifier: '页'
        },
        messagebox: {
            title: '提示',
            confirm: '确定',
            cancel: '取消',
            error: '输入的数据不合法!'
        },
        upload: {
            deleteTip: '按 delete 键可删除',
            delete: '删除',
            preview: '查看图片',
            continue: '继续上传'
        },
        table: {
            emptyText: '暂无数据',
            confirmFilter: '筛选',
            resetFilter: '重置',
            clearFilter: '全部',
            sumText: '合计'
        },
        tree: {
            emptyText: '暂无数据'
        },
        transfer: {
            noMatch: '无匹配数据',
            noData: '无数据',
            titles: ['列表 1', '列表 2'],
            filterPlaceholder: '请输入搜索内容',
            noCheckedFormat: '共 {total} 项',
            hasCheckedFormat: '已选 {checked}/{total} 项'
        },
    }
}

export default cn;
