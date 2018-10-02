/**
 * Created by Administrator on 2018/5/22 0022.
 */
//en.js
const en = {
    label:{
        account:'account',
        pwd:'password',
        status:'status',
        handle:'handle',
        enable:'enable',
        disable:'disable',
        phone:'phone',
        name:'name',
        country:'country/region',
        region:'region',
        address:'address',
        code:'code',
        province:'province',
        city:'city',
        stick:'stick',
        show:'enable',
        hide:'disable',
        title:'title',
        file:'file',
        time:'time',
        level:'level',
        auditDate:'audit date',
        email:"email",
        school:'school',
        fName:'family name',
        lName:'name',
        gender:'gender',
        birth:'birthday',
        contact:'contact',
        eContactName:'emergency contact name',
        eContact:'emergency contact',
        insurance:'insurance certificate',
        firstAid:'first aid certificate',
        courseNo:'course no',
        courseName:'course name',
        site:'place',
        startTime:'start time',
        health:'health certification',
        theory:'classroom',
        pool:'pool',
        openWater:'ocean',
        auditType:'audit type',
        type:'type',
        submitDate:'submit date',
        orderNo:'order no',
        buyer:'buyer',
        count:'count',
        amount:'amount',
        orderTime:'time',
        studio:'studio',
        rest:'rest of {msg} ',
        create:'create',
        certificateNo:'certificate no',
        buyDate:'purchase date',
        student:'student',
        grantDate:'grant date',
        instructorName:'instructor name',
        customerService:'customer service',
        postcode:'postcode',
        quantity:'students count',
        schoolName:'school name'
    },
    holder: {
        account:'please enter your account',
        pwd:'please enter your password',
        phone:'please enter your phone',
        name:'please enter your name',
        schoolSearch:'country/region/code',
        country:'please enter the country',
        province:'please enter the province',
        city:'please enter the city',
        address:'please enter the address',
        code:'please enter the code',
        title:'please enter the title',
        upload:'please upload the file',
        coachSearch:'email/name',
        email:'please enter the email',
        level:'please select the level',
        school:'please select the school',
        courseSearch:'course name',
        certificateStatisticsSearch:'account/name',
        startTime:'please select the start time',
        selectedStudent:'please select the student',
        emailStr:"please entry the email,multiple separate width ','",
        fName:'please select the family name',
        lName:'please select the last name',
        gender:'please select the gender',
        eContactName:'please enter the emergency contact name',
        eContact:'please enter the emergency contact',
        insurance:'please upload the insurance certification',
        firstAid:'please upload the first aid certification',
        avatar:'please upload your avatar',
        reason:'please enter the reason',
        content:'please enter the content',
        nayContent:'please enter the content,or upload the file',
        postcode:'please enter your postcode',
        schoolName:'please enter the school name',
    },
    btn:{
        adminLogin:'administrator login',
        superLogin:'super administrator login',
        coachLogin:'instructor login',
        studentLogin:'student login',
        login:'login',
        help:'help',
        administrator:'Administrator',
        add:'Add',
        massage:'Massage',
        coach:'Instructor',
        school:'School',
        logout:'logout',
        resetPwd:'reset-password',
        del:'delete',
        prev:'Prev',
        next:'Next',
        ok:'ok',
        cancel:'cancel',
        sure:'sure',
        submit:'submit',
        edit:'edit',
        addSchool:'new school',
        view:'view',
        addMsg:'new message',
        upload:'upload file',
        reUpload:'upload again',
        back:'back',
        download:'download',
        detail:'detail',
        all:'All',
        newCoach:'new instructor',
        nonActivated:'nonactivated',
        certified:'activate',
        pending:'pending',
        fail:'fail',
        disable:'disable',
        viewAll:'view all',
        student:'student',
        course:'course',
        AuthorizationRecord:'authorization record',
        completeStatus:'pass',
        waitingStatus:'need',
        pendingGrant:'pending',
        waitingGrant:'waiting',
        unused:'unused',
        used:'used',
        granted:'certified ',
        grant:'grant',
        studentModule:'Student',
        auditModule:'Audit',
        certificateModule:'Certificate Statistics',
        settingModule:'Setting',
        configurable:'mfi-individual',
        dueAudit:'instructor due audit',
        toInstructor:'student to instructor',
        auditPending:'pending',
        auditPass:'pass',
        auditFail:'fail',
        myCourse:'Course',
        newCourse:'new course',
        viewCertificate:'certificate',
        close:'close',
        buyToGrant:'buy to grant',
        addStudent:'add student',
        email:'email',
        fromMyStudent:'from my student',
        newStudent:'new student',
        myStudent:'Student',
        my:'My',
        activation:'activation',
        editInfo:'edit',
        toPass:'pass',
        toReject:'reject',
        applyForAudit:'apply for audit',
        myAudit:'my audit',
        go:'go',
        professionalMembersFeeWaiver:'professional members fee waiver',
        instructorQualificationFeeWaiver:'instructor qualification fee waiver',
        schoolQualificationFeeWaiver:'school qualification fee waiver',
        activationEmail:'send the activation email',
    },
    title:{
        super:'Super Administrator',
        admin:'Administrator',
        coach:'Instructor',
        student:'Student',
        school:'School',
        administratorList:'Administrator List',
        resetPwd:'Reset Password',
        tips:'Reminder',
        schoolAdmin:'School Administration',
        addSchool:'New School',
        editSchool:'Edit School',
        message:'Message',
        addMsg:'New Message',
        allCoach:'All Instructor',
        newCoach:'New Instructor',
        lCertificate:'Level Certificate',
        oCertificate:'Other',
        levelSetting:'Level Setting',
        schoolSetting:'School Setting',
        auditingSetting:'Auditing Setting',
        someoneCourse:'{msg}\'s course',
        courseDetail:'{msg} Detail',
        certificateStatistics:'Certificate Statistics',
        newCourse:'New Course',
        studentInfo:'Students',
        addStudent:'Add Student',
        studentList:'Student List',
        someoneStudent:'{msg}\'s student',
        course:'Course',
        newStudent:'New Student',
        certificateRecord:'Certificate Record',
        instructorActivation:'Instructor Activation',
        studentActivation:'Student Activation',
        myCourseStatus:'My Course Status',
        accountSetting:'Account Setting',
        auditFail:'Reject',
        allStudent:'All Student',
        someoneCertificateRecord:'{msg}\'s Certificate Record',
        nonActivated:'nonactivated',
        pending:'pending',
        certified:'activate',
        fail:'fail',
        disable:'disable',
    },
    tips:{
        login:'logining...',
        loginS:'login successfully',
        loginF:'login failure,invalid account or wrong password',
        setting:'setting...',
        settingS:'setting successfully',
        settingF:'setting failure,{msg}',
        delete:'deleting...',
        deleteS:'delete successfully',
        deleteF:'delete failure,{msg}',
        save:'saving...',
        saveS:'save successfully',
        saveF:'save failure,{msg}',
        handle:'handling...',
        handleS:'handle successfully',
        handleF:'handle failure,{msg}',
        delAdmin:'are you sure to delete this Administrator:{msg}？',
        delMsg:'are you sure to delete this message：{msg}？',
        total:'total {msg} records',
        developing:'developing',
        grant:'are you sure to grant {level} to {msg}？',
        forbidden:"your account is forbidden!",
        payingTips:'Handling,please don\'t refresh or close the window!',
        annualFeelForProfessionalMembers:'Please pay the annual fee for professional members',
        instructorQualification:'Please pay the annual fee for instructor qualification',
        schoolQualification:'Please pay the annual fee for school qualification',
        mobileTips:'Activate successfully,please access on the cumputer!',
        apiError:'Error,this account has been used!'
    },
    el: {
        colorpicker: {
            confirm: 'OK',
            clear: 'Clear'
        },
        datepicker: {
            now: 'Now',
            today: 'Today',
            cancel: 'Cancel',
            clear: 'Clear',
            confirm: 'OK',
            selectDate: 'Select date',
            selectTime: 'Select time',
            startDate: 'Start Date',
            startTime: 'Start Time',
            endDate: 'End Date',
            endTime: 'End Time',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            year: '',
            month1: 'January',
            month2: 'February',
            month3: 'March',
            month4: 'April',
            month5: 'May',
            month6: 'June',
            month7: 'July',
            month8: 'August',
            month9: 'September',
            month10: 'October',
            month11: 'November',
            month12: 'December',
            // week: 'week',
            weeks: {
                sun: 'Sun',
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat'
            },
            months: {
                jan: 'Jan',
                feb: 'Feb',
                mar: 'Mar',
                apr: 'Apr',
                may: 'May',
                jun: 'Jun',
                jul: 'Jul',
                aug: 'Aug',
                sep: 'Sep',
                oct: 'Oct',
                nov: 'Nov',
                dec: 'Dec'
            }
        },
        select: {
            loading: 'Loading',
            noMatch: 'No matching data',
            noData: 'No data',
            placeholder: 'Select'
        },
        cascader: {
            noMatch: 'No matching data',
            loading: 'Loading',
            placeholder: 'Select'
        },
        pagination: {
            goto: 'Go to',
            pagesize: '/page',
            total: 'Total {total}',
            pageClassifier: ''
        },
        messagebox: {
            title: 'Message',
            confirm: 'OK',
            cancel: 'Cancel',
            error: 'Illegal input'
        },
        upload: {
            deleteTip: 'press delete to remove',
            delete: 'Delete',
            preview: 'Preview',
            continue: 'Continue'
        },
        table: {
            emptyText: 'No Data',
            confirmFilter: 'Confirm',
            resetFilter: 'Reset',
            clearFilter: 'All',
            sumText: 'Sum'
        },
        tree: {
            emptyText: 'No Data'
        },
        transfer: {
            noMatch: 'No matching data',
            noData: 'No data',
            titles: ['List 1', 'List 2'], // to be translated
            filterPlaceholder: 'Enter keyword', // to be translated
            noCheckedFormat: '{total} items', // to be translated
            hasCheckedFormat: '{checked}/{total} checked' // to be translated
        }
    }
}

export default en;
