import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import $ from 'jquery';
import '../controller/llsAjax.js';
import '../fonts/iconfont.css';
import '../controller/pace.min.js';

(function () {
    window.onunload = function () {
        localStorage.setItem('isIn', false)
    }
})();


Pace.options.restartOnPushState = false;

window.on_spark_player_start = function on_spark_player_start() {
    let coursename = null;
    let lessonname = null;
    let lessonID = null;
    if (window.location.hash.indexOf("&") > 0) {
        lessonID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
    } else {
        lessonID = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
    }
    let leftNavData = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
    for (let i = 0, len = leftNavData.length; i < len; i++) {
        for (let j = 0, len2 = leftNavData[i].lessons.length; j < len2; j++) {
            if (leftNavData[i].lessons[j].id == lessonID) {
                lessonname = leftNavData[i].lessons[j].name;
                coursename = leftNavData[i].name;
                break;
            }
        }
    }
    $.llsajax({
        url: "trajectorylog/insert",
        type: "POST",
        async: true,
        data: {
            type: 7,
            coursename: coursename,
            lessonname: lessonname,
            othername: sessionStorage.getItem("othername")
        },
        success: trajectorylogData => {

        }
    });
};

function requireAuth(nextState,replace) {
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

export const rootRoute = {
    path: '/',
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../components/login/login.js').default)
            }, 'login')
        },
    },
    childRoutes: [
        {
            path:'lesson',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/lesson.js').default)
                },'lesson');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'informat',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/Sproinformation.js').default)
                },'informat');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'message',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/message.js').default)
                },'message');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'classManagementMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/classManagement/classManagement.jsx').default)
                },'classManagementMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'profession',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/profession.js').default)
                },'profession');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'classhours',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/classHour.js').default)
                },'classhours');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'evaluatePageMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/evaluatePageMain.jsx').default)
                },'evaluatePageMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'stuStatisticsOverview',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/stuStatisticsOverview.js').default)
                },'stuStatisticsOverview');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'stuhomework',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/stuHomework.js').default)
                },'stuhomework');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'stuEvaluate',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/evaluate.jsx').default)
                },'stuEvaluate');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'searchMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/searchMain.jsx').default)
                },'searchMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'examinationMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/examinationMain.jsx').default)
                },'examinationMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'resourceCenter',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../components/resourceCenter/resourceCenter.jsx').default)
                },'resourceCenter');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'sproquiz',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../components/quizzes/Sproquiz.js').default)
                },'sproquiz');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'showLessonEvaluate',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/showLessonEvaluate.jsx').default)
                },'showLessonEvaluate');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'lessonEvaluate',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/lessonEvaluate.jsx').default)
                },'lessonEvaluate');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'rcpaper',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../components/resourceCenter/RCpaper.js').default)
                },'rcpaper');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'tmarksubquestion',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/marksq.js').default)
                },'tmarksubquestion');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'evaluatingtemplate',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/evaluatingtemplate.jsx').default)
                },'evaluatingtemplate');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'tinformations',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/tinformation.js').default)
                },'tinformations');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'tmarkpaperlist',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/markpaper.js').default)
                },'tmarkpaperlist');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherteststorefinal',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherteststorefinal.js').default)
                },'teacherteststorefinal');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherteststorequizz',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherteststorequizz.js').default)
                },'teacherteststorequizz');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'finalEXanalyze',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/finalEXanalyze.js').default)
                },'finalEXanalyze');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherfinallist',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherfinallist.js').default)
                },'teacherfinallist');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherquizzlist',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherquizzlist.js').default)
                },'teacherquizzlist');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'previewtestpaper',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/previewtestpaper.js').default)
                },'previewtestpaper');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherProfession',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherProfession.js').default)
                },'teacherProfession');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherQuestion',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherQuestion.js').default)
                },'teacherQuestion');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherEditexam',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherEditexam.js').default)
                },'teacherEditexam');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherReviceEdit',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherReviceEdit').default)
                },'teacherReviceEdit');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherLesson',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherLesson.js').default)
                },'teacherLesson');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherExamResultstatistics',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherExamResultstatistics.js').default)
                },'teacherExamResultstatistics');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'Teachertestlist',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teachertestlist.js').default)
                },'Teachertestlist');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherCourse',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherCourse.js').default)
                },'teacherCourse');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'createTestPaper',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/createTestPaper.js').default)
                },'createTestPaper');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teacherPublishedpapers',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teacherPublishedpapers.js').default)
                },'teacherPublishedpapers');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'editTestPaper',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/editTestPaper.js').default)
                },'editTestPaper');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'StatisticsForm',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../teacherComponents/thLearningStatistic/statisticForm/statisticform.js').default)
                },'StatisticsForm');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teaSearchMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teaSearchMain.jsx').default)
                },'teaSearchMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'exerciseManagementMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/exerciseManagementMain.js').default)
                },'exerciseManagementMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'editExerciseMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/editExerciseMain.js').default)
                },'editExerciseMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'ImportReward',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/importReward.jsx').default)
                },'ImportReward');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teaStudentManagement',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/teaStudentManagement.jsx').default)
                },'teaStudentManagement');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'Seeevares',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/Seeevares/Seeevares.js').default)
                },'Seeevares');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'Satisfaction',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/satisfactionDetails/satisfactionDetails.js').default)
                },'Satisfaction');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'InputTheAttendance',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/inputTheAttendance.js').default)
                },'InputTheAttendance');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'batchAttendance',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/batchAttendance.jsx').default)
                },'batchAttendance');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'LearningManagement',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/learningManagement.js').default)
                },'LearningManagement');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'inputInterview',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/InputInterview.jsx').default)
                },'inputInterview');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'managePage',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/manage/manageBody.js').default)
                },'managePage');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'performance',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/performance.jsx').default)
                },'performance');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'uploader',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/uploader.jsx').default)
                },'uploader');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'preview',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/preview.jsx').default)
                },'preview');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'LKG',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/LKlenovoG.js').default)
                },'LKG');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'LKSG',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/LKschoolG.js').default)
                },'LKSG');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'OverviewDetail',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/manage/overview/overview.jsx').default)
                },'OverviewDetail');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'EvaMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/evaluate/evaMain.jsx').default)
                },'EvaMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'teaResourceCenter',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/resourceCenter/resourceCenter.jsx').default)
                },'teaResourceCenter');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'MyContribution',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/myContribution/myContribution.jsx').default)
                },'MyContribution');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'masStudentManagement',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/masStudentManagement.jsx').default)
                },'masStudentManagement');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'ChangeItem',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/manage/rewards/changeItem/changeItem.jsx').default)
                },'ChangeItem');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'batchCommentMain',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../main/teacher/batchCommentMain.jsx').default)
                },'batchCommentMain');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'pageto404',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../components/public/404page/404page.js').default)
                },'pageto404');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
        },{
            path:'EditItem',
            getComponent(nextState,cb){
                require.ensure([],(require) => {
                    cb(null,require('../headMasterComponents/manage/interview/edit/edit.jsx').default)
                },'EditItem');
            },
            onEnter: (nextState,replace) => requireAuth(nextState,replace)
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
            onEnter: (_, replaceState) => replaceState("/pageto404")
        },
    ]
};


// 存储左边列表数据
sessionStorage.setItem("changeMarksFlag", "1");
sessionStorage.setItem("switchListControl", "-1");
sessionStorage.setItem('constraintMessage', false);

render(
    (
        <Router
            history={hashHistory}
            routes={rootRoute}
        />
    ), document.getElementById('app')
);