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

// 班主任总监路由
export const rootRoute = {
    path: '/',
    indexRoute: {
        // 学员情况
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../classAdviser/components/adviserAdministration/adviserAdministration.jsx').default)
            }, 'adviserAdministration');
        }
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
        //班主任负责人 消息中心
        {
            path: 'message',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../assistantSup/components/message/message.js').default)
                }, 'message');
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
        //助教负责人 日志
        {
            path: 'teacherLog',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/teacherLog/teacherLog.jsx').default)
                }, 'teacherLog');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        //助教负责人 我的贡献
        {
            path: 'myContribution',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/myContribution/myContribution.jsx').default)
                }, 'myContribution')
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 助教管理
        {
            path: 'classAdviserJurisdiction',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/classAdviserJurisdiction/classAdviserJurisdiction.js').default)
                }, 'classAdviserJurisdiction');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },

        // 反馈管理
        {
            path: 'caEvaluate',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/evaluateComponents/evaMain.jsx').default)
                }, 'caEvaluate')
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
        // 学员情况详情
        {
            path: 'adminManage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../classAdviser/components/manage/manage.jsx').default)
                }, 'adminManage');
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
        // 预览调查问卷
        {
            path: 'evaluatingtemplate',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../main/teacher/evaluatingtemplate.jsx').default)
                }, 'evaluatingtemplate');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 反馈管理查看详情页面
        {
            path: 'Satisfaction',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../headMasterComponents/satisfactionDetails/satisfactionDetails.js').default)
                }, 'Satisfaction');
            },
            onEnter: (nextState, replace) => requireAuth(nextState, replace)
        },
        // 反馈管理查看结果页面
        {
            path: 'Seeevares',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../headMasterComponents/Seeevares/Seeevares.js').default)
                }, 'Seeevares');
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
    ), document.getElementById('master_container')
);