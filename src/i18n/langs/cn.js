/**
 * Created by Administrator on 2018/5/22 0022.
 */
//cn.js
const cn = {
    label:{
        account:'账号',
        pwd:'密码',
        status:'状态',
        handle:'操作',
        enable:'启用',
        disable:'停用',
        phone:'手机',
        name:'姓名',
        country:'国家',
        region:'地区',
        address:'地址',
        code:'编号',
        province:'省份/地区',
        city:'城市',
        stick:'置顶',
        show:'展示',
        hide:'隐藏',
        title:'标题',
        file:'文件',
        time:'时间',
    },
    holder: {
        account:'请输入账号',
        pwd:'请输入密码',
        phone:'请输入手机',
        name:'请输入姓名',
        schoolSearch:'国家/地区/编号 模糊检索',
        country:'请输入国家',
        province:'请输入省份/地区',
        city:'请输入城市',
        address:'请输入地址',
        code:'请输入编号',
        title:'请输入标题',
        upload:'请上传文件'
    },
    btn:{
        adminLogin:'管理员登录',
        superLogin:'超级管理员登录',
        login:'登 录',
        help:'帮助',
        administrator:'管理员',
        add:'添加',
        massage:'站内消息',
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
        download:'下载文件'
    },
    title:{
        super:'超级管理员',
        admin:'管理员',
        school:'学校',
        administratorList:'管理员列表',
        resetPwd:'密码重置',
        tips:'温馨提示',
        schoolAdmin:'学校管理',
        addSchool:'新增学校',
        editSchool:'编辑学校',
        message:'站内消息',
        addMsg:'新的消息',
    },
    tips:{
        login:'登录中...',
        loginS:'登录成功',
        loginFail:'登录失败',
        setting:'设置中...',
        settingS:'设置成功',
        settingF:'设置失败，{msg}',
        delete:'删除中...',
        deleteS:'删除成功',
        deleteF:'删除失败，{msg}',
        save:'保存中...',
        saveS:'保存成功',
        saveF:'保存失败，{msg}',
        delAdmin:'确定删除管理员账号：{msg}？',
        delMsg:'确定删除消息：{msg}？'
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
        }
    }
}

export default cn;
