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

// 助教总监路由
export const rootRoute = {
    path: '/',
    indexRoute: {
        // 学员情况
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../assistantSup/components/administration/administration.jsx').default)
            }, 'administration');
        },
        onEnter: (nextState, replace) => requireAuth(nextState, replace)
    },
    childRoutes: [
        //助教负责人 我教的课程
        {
            path: 'teacherCourse',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherCourse/teacherCourse.js').default)
                }, 'teacherCourse');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 我教的课时
        {
            path: 'teacherLesson',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLesson/teacherLesson.js').default)
                }, 'teacherLesson');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 资源中心
        {
            path: 'assResourceCenter',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/resourceCenter/resourceCenter.jsx').default)
                }, 'assResourceCenter');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //资源中心 查看页面
        {
            path: 'rcpaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/resourceCenter/RCpaper/RCpaper.js').default)
                }, 'rcpaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 个人中心
        {
            path: 'assinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/tinformations/tinformation.js').default)
                }, 'assinformations');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 在线提问
        {
            path: 'assSearchMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teaSearchMain/teaSearchMain.jsx').default)
                }, 'assSearchMain');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 消息中心
        {
            path: 'assmessage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/message/message.js').default)
                }, 'assmessage');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 我教的专业
        {
            path: 'asscherProfession',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherProfession/teacherProfession.js').default)
                }, 'asscherProfession');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 日志
        {
            path: 'teacherLog',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLog/teacherLog.jsx').default)
                }, 'teacherLog');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 日志详情
        {
            path: 'LogDetail',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLog/LogDetail.jsx').default)
                }, 'teacherLog');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 我的贡献
        {
            path: 'myContribution',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/myContribution/myContribution.jsx').default)
                }, 'myContribution')
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: 'myContributionC',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/myContribution/myContribution.jsx').default)
                }, 'myContribution')
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 学员情况详情
        {
            path: 'adminManage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/manage/manage.jsx').default)
                }, 'adminManage');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 助教用户管理权限
        {
            path: 'assistantJurisdiction',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/assistantJurisdiction/assistantJurisdiction.js').default)
                }, 'assistantJurisdiction');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 我的提问
        {
            path: 'teaSearchMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/searchMain/searchMain.jsx').default)
                }, 'teaSearchMain');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },

        // 详情
        {
            path: 'OverviewDetail',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../headMasterComponents/manage/overview/overview.jsx').default)
                }, 'OverviewDetail');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },

        //期末试卷库
        {
            path: 'teacherteststorefinal',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherteststorefinal.js').default)
                }, 'teacherteststorefinal');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验试卷库
        {
            path: 'teacherteststorequizz',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherteststorequizz.js').default)
                }, 'teacherteststorequizz');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //期末试卷发布页面 
        {
            path: 'teacherfinallist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherfinallist.js').default)
                }, 'teacherfinallist');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验发布页面 
        {
            path: 'teacherquizzlist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherquizzlist.js').default)
                }, 'teacherquizzlist');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //发布页面
        {
            path: 'teacherPublishedpapers',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/Examinationmanagement/teacherPublishedpapers.js').default)
                }, 'teacherPublishedpapers');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //预览试卷
        {
            path: 'previewtestpaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/previewtestpaper.js').default)
                }, 'previewtestpaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 创建测试试卷
        {
            path: 'createTestPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/createPaper/createPaper.jsx').default)
                }, 'createTestPaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑测试试卷
        {
            path: 'editTestPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/editPaper/editPaper.jsx').default)
                }, 'editTestPaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // // 创建期末试卷
        // {
        //     path:'createFinalPaper',
        //     getComponent(nextState,cb){
        //         require.ensure([],(require) => {
        //             cb(null,require('../assistantSup/components/createFinalPaper/createFinalPaper.jsx').default)
        //         },'createFinalPaper');
        //     },
        //     onEnter: (nextState,replace) => requireAuth(nextState,replace)
        // },
        // // 编辑期末试卷
        // {
        //     path:'editFinalPaper',
        //     getComponent(nextState,cb){
        //         require.ensure([],(require) => {
        //             cb(null,require('../assistantSup/components/editFinalPaper/editFinalPaper.jsx').default)
        //         },'editFinalPaper');
        //     },
        //     onEnter: (nextState,replace) => requireAuth(nextState,replace)
        // },
        // 习题管理
        {
            path: 'exerciseManagementMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/exerciseManagementMain.js').default)
                }, 'exerciseManagementMain');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 添加练习题
        {
            path: 'editExerciseMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/editExerciseMain.js').default)
                }, 'editExerciseMain');
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
        // 题库
        {
            path: 'teacherQuestion',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherQuestion/teacherQuestion.jsx').default)
                }, 'teacherQuestion');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 修改密码成功页面
        {
            path: 'tinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/tinformation.js').default)
                }, 'tinformations');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 试卷分析
        {
            path: 'finalEXanalyze',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/finalEXanalyze.js').default)
                }, 'finalEXanalyze');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 权限管理
        {
            path: 'jurisdictionMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../teachingManagement/components/jurisdictionMain/jurisdictionMain.jsx').default)
                }, 'jurisdictionMain');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 学员成绩
        {
            path: 'studentAchievement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/studentAchievement/studentAchievement.jsx').default)
                }, 'studentAchievement');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 查看联想期末成绩、查看小测验成绩
        {
            path: 'LKG',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/LKlenovoG.js').default)
                }, 'LKG');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: 'LKSG',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/studentAchievement/seeFinalGrade/seeFinalGrade.jsx').default)
                }, 'LKSG');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
         // 排名页面
         {
            path: 'rankPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/public/rank/rankPage/rankPage.jsx').default)
                }, 'rankPage');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 404错误页面
        {
            path: '404',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../components/public/404page/404page.js').default)
                }, '404page');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: '*',
            onEnter: (_, replaceState) => replaceState("/404")
        },
    ]
};


render(
    (
        <Router
            history={hashHistory}
            routes={rootRoute}
        />
    ), document.getElementById('assistantSup')
);