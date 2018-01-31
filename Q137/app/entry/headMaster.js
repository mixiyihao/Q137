import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import $ from 'jquery';
import '../controller/llsAjax.js';
import '../fonts/iconfont.css';
import '../controller/pace.min.js';

Pace.options.restartOnPushState = false;

function requireAuth(nextState, replace) {
    $(document).ready(function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });
    $.llsajax({
        url: 'urllog/inter',
        type: "post",
        async: true,
        data: {
            url: location.hash
        },
        success: interData => {
            Pace.restart();
        }
    })
}

// 院长、校长路由
export const rootRoute = {
    path: '/',
    indexRoute: {
        // 学员情况
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../assistantSup/components/administration/administration.jsx').default)
            }, 'administrationHead');
        },
        onEnter: (nextState, replace) => requireAuth(nextState, replace)
    },
    childRoutes: [
        // 专业介绍页面
        {
            path: 'asscherProfession',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherProfession/teacherProfession.js').default)
                }, 'asscherProfessionHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //课时
        {
            path: 'teacherLesson',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLesson/teacherLesson.js').default)
                }, 'teacherLesson');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 学员成绩
        {
            path: 'studentAchievement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/studentAchievement/studentAchievement.jsx').default)
                }, 'studentAchievementHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //资源中心
        {
            path: 'assResourceCenter',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/resourceCenter/resourceCenter.jsx').default)
                }, 'assResourceCenterHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //资源中心 查看页面
        {
            path: 'rcpaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/resourceCenter/RCpaper/RCpaper.js').default)
                }, 'rcpaperHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 个人中心
        {
            path: 'assinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/tinformations/tinformation.js').default)
                }, 'assinformationsHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 意见反馈
        {
            path: 'tinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/tinformation.js').default)
                }, 'tinformationsHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 消息中心
        {
            path: 'assmessage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/message/message.js').default)
                }, 'assmessageHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 查看联想期末成绩、查看小测验成绩
        {
            path: 'LKG',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/LKlenovoG.js').default)
                }, 'LKGHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: 'LKSG',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/studentAchievement/seeFinalGrade/seeFinalGrade.jsx').default)
                }, 'LKGHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 权限管理
        {
            path: 'deanJurisdictionMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../deanComp/components/deanJurisdictionMain/deanJurisdictionMain.jsx').default)
                }, 'deanJurisdictionMainHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 习题管理
        {
            path: 'exerciseManagementMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/exerciseManagementMain.js').default)
                }, 'exerciseManagementMainHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 添加练习题
        {
            path: 'editExerciseMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/editExerciseMain.js').default)
                }, 'editExerciseMainHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //期末试卷库
        {
            path: 'teacherteststorefinal',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherteststorefinal.js').default)
                }, 'teacherteststorefinalHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验试卷库
        {
            path: 'teacherteststorequizz',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherteststorequizz.js').default)
                }, 'teacherteststorequizzHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //期末试卷发布页面 
        {
            path: 'teacherfinallist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherfinallist.js').default)
                }, 'teacherfinallistHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验发布页面 
        {
            path: 'teacherquizzlist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherquizzlist.js').default)
                }, 'teacherquizzlistHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 我的提问
        {
            path: 'teaSearchMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/searchMain/searchMain.jsx').default)
                }, 'teaSearchMainHeadHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },

        // 题库
        {
            path: 'teacherQuestion',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherQuestion/teacherQuestion.jsx').default)
                }, 'teacherQuestionHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 我的贡献
        {
            path: 'myContribution',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/myContribution/myContribution.jsx').default)
                }, 'myContributionHead')
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: 'myContributionC',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/myContribution/myContribution.jsx').default)
                }, 'myContributionHead')
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 日志
        {
            path: 'teacherLog',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLog/teacherLog.jsx').default)
                }, 'teacherLogHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 日志详情
        {
            path: 'LogDetail',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLog/LogDetail.jsx').default)
                }, 'LogDetailHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },

        // 学员情况详情
        {
            path: 'adminManage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/manage/manage.jsx').default)
                }, 'adminManageHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 详情
        {
            path: 'OverviewDetail',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../headMasterComponents/manage/overview/overview.jsx').default)
                }, 'OverviewDetailHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //预览试卷
        {
            path: 'previewtestpaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/previewtestpaper.js').default)
                }, 'previewtestpaperHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 课程管理页面
        {
            path: 'courseManagement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/courseManagement/courseManagement.jsx').default)
                }, 'courseManagementHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 课时管理页面
        {
            path: 'lessonManagement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/lessonManagement/lessonManagement.jsx').default)
                }, 'lessonManagementHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 创建测试试卷
        {
            path: 'createTestPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/createPaper/createPaper.jsx').default)
                }, 'createTestPaperHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑测试试卷
        {
            path: 'editTestPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/editPaper/editPaper.jsx').default)
                }, 'editTestPaperHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑试题
        {
            path: 'teacherEditexam',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherEditExam/teacherEditExam.jsx').default)
                }, 'teacherEditexam');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //课程
        {
            path: 'teacherCourse',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherCourse/teacherCourse.js').default)
                }, 'teacherCourse');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 专业
        {
            path: 'asscherProfession',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherProfession/teacherProfession.js').default)
                }, 'asscherProfession');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 404错误页面
        {
            path: '404',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../components/public/404page/404page.js').default)
                }, '404pageHead');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: '*',
            onEnter: (_, replaceState) => replaceState("/404")
        }
    ],
}


render(
    (
        <Router
            history={hashHistory}
            routes={rootRoute}
        />
    ), document.getElementById('header_container')
);