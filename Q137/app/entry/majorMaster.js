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

// 业务主管路由
export const rootRoute = {
    path: '/',
    indexRoute: {
        // 学员情况
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../classAdviser/components/studentAchievement/studentAchievement.jsx').default)
            }, 'studentAchievement');
        },
        onEnter: (nextState, replace) => requireAuth(nextState, replace)
    },
    childRoutes: [
        //班主任 资源中心
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
        //班主任负责人 个人中心
        {
            path: 'assinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/tinformations/tinformation.js').default)
                }, 'assinformations');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 意见反馈
        {
            path: 'tinformations',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/tinformation.js').default)
                }, 'tinformations');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 在线提问
        {
            path: 'teaSearchMain',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/searchMain/searchMain.jsx').default)
                }, 'teaSearchMain');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 专业介绍页面
        {
            path: 'asscherProfession',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherProfession/teacherProfession.js').default)
                }, 'asscherProfession');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 课程管理页面
        {
            path: 'courseManagement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/courseManagement/courseManagement.jsx').default)
                }, 'courseManagement');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 课时管理页面
        {
            path: 'lessonManagement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/lessonManagement/lessonManagement.jsx').default)
                }, 'lessonManagement');
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
        // 课时展示页面
        {
            path: 'teacherLesson',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/teacherLesson/teacherLesson.js').default)
                }, 'teacherLesson');
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
                }, 'LKG');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 创建期末试卷
        {
            path: 'createFinalPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/createFinalPaper/createFinalPaper.jsx').default)
                }, 'createFinalPaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑期末试卷
        {
            path: 'editFinalPaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/editFinalPaper/editFinalPaper.jsx').default)
                }, 'editFinalPaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 创建阶段测验试卷
        {
            path: 'createStagePaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/createStagePaper/createStagePaper.jsx').default)
                }, 'createFinalPaper');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑阶段测验试卷
        {
            path: 'editStagePaper',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/editStagePaper/editStagePaper.jsx').default)
                }, 'editFinalPaper');
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
        // test页面
        {
            path: 'testPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/testPage.jsx').default)
                }, 'testPage');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // test页面
        {
            path: 'uploadpage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/updatePaper/updatePaper.jsx').default)
                }, 'uploadpage');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        {
            path: 'previewpage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/updatePaper/previewPaper.jsx').default)
                }, 'previewpage');
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
                    cb(null, require('../majorMaster/components/teacherQuestion/teacherQuestion.jsx').default)
                }, 'teacherQuestion');

            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 编辑试题
        {
            path: 'teacherReviceEdit',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/teacherReviceEdit').default)
                }, 'teacherReviceEdit');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //期末试卷库
        {
            path: 'teacherteststorefinal',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherteststorefinal.js').default)
                }, 'teacherteststorefinal');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //阶段测试试卷库
        {
            path: 'teacherStagePaperLibrary',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherStagePaperLibrary.jsx').default)
                }, 'teacherStagePaperLibrary');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验试卷库
        {
            path: 'teacherteststorequizz',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherteststorequizz.js').default)
                }, 'teacherteststorequizz');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //期末试卷发布页面 
        {
            path: 'teacherfinallist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherfinallist.js').default)
                }, 'teacherfinallist');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //小测验发布页面 
        {
            path: 'teacherquizzlist',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherquizzlist.js').default)
                }, 'teacherquizzlist');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 试卷分析
        {
            path:'finalEXanalyze',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/finalEXanalyze.js').default)
                },'finalEXanalyze');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },
        //发布页面
        {
            path: 'teacherPublishedpapers',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../majorMaster/components/Examinationmanagement/teacherPublishedpapers.js').default)
                }, 'teacherPublishedpapers');
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
    ), document.getElementById('major_container')
);