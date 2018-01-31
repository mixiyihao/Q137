/**
 * Created by heshuai on 2017/1/16.
 */
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import '../components/public/LineMessage/stylePopup.css'
import url from './url.js';

$(document).ready(function () {
    $(".h-popup").on("click", ".h-closs", function () {
        $(".h-popup").css("display", "none");
        $(".h-spopup").css("display", "none");
        $("#app").css("position", "relative");

    });
    $(".h-popup").on("click", ".h-compgo", function () {
        $(".h-popup").css("display", "none");
        $(".h-spopup").css("display", "none");
        $("#app").css("position", "relative");
    });
});
$.llsajax = function (my) {
    // if (my.url.indexOf('Luser/InterviewSchoolReward') == -1 && my.url.indexOf('message/findnoreadliststop4') == -1 && my.url.indexOf('Luser/findCountByTime') == -1 && my.url.indexOf('message/findnoreadmessagecount') == -1 && my.url.indexOf('userlog/findSlog') == -1 && my.url.indexOf('questionBank/selectQuestionsById') == -1 && my.url.indexOf('UserComment/getComment') == -1 && my.url.indexOf('UserComment/editComment') == -1 && my.url.indexOf('homework/findClassByLesson') == -1 && my.url.indexOf('lesson/lessonTestControl') == -1 && my.url.indexOf('lesson/videoControl') == -1) {
    //     Pace.restart();
    // }
    $.ajax({
        url: url.WEBURL + my.url,
        data: my.data,
        type: my.type,
        contentType: my.contentType || 'application/x-www-form-urlencoded',
        async: my.async,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.result == 200) {
                my.success(data);

            } else if (data.result == 500) {
                localStorage.setItem('isIn',false);
                sessionStorage.setItem("classItem", false);  
                // hashHistory.push("/");
                window.location.href='./index.html';
            } else if (data.result == 404) {
                var arr = '<div class="h-popup"><div class="h-spopup"> <p><span class="h-closs iconfont icon-guanbi"></span></p> <span class="h-ycimg"></span> <p class="h-infos">' + data.message + '</p> <button class="h-compgo">知道了</button> </div> </div>'
                $(".html-container").append(arr);
                $(".h-popup").css("display", "block");
                $(".h-spopup").css("display", "block");
                // $("#app").css("position", "fixed");
                $(".h-popup").on("click", ".h-closs", function () {
                    $(".h-popup").css("display", "none");
                    $(".h-spopup").css("display", "none");
                    $(".html-container").css("position", "relative");
                });
                $(".h-popup").on("click", ".h-compgo", function () {
                    $(".h-popup").css("display", "none");
                    $(".h-spopup").css("display", "none");
                    $(".html-container").css("position", "relative");
                });
            }
        },
        error: function (err) {
            if (err.status == 404) {
                hashHistory.push("/pageto404");
            } else if (err.status == 500) {
                // hashHistory.push("/");
            } else if (err.status == 0) {
            }
        },
    });
}

$.llsajaxupload = function (my) {
    $.ajax({
        url: url.WEBURL + my.url,
        data: my.data,
        type: my.type,
        async: my.async,
        cache: my.cache,
        processData: my.processData,
        contentType: my.processData,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.result == 200) {
                my.success(data);
            } else if (data.result == 500) {
                // hashHistory.push("/");
                window.location.href='./index.html';
                sessionStorage.setItem("classItem", false)
            } else if (data.result == 404) {
                var arr = '<div class="h-popup"><div class="h-spopup"> <p><span class="h-closs iconfont icon-guanbi"></span></p> <span class="h-ycimg"></span> <p class="h-infos">' + data.message + '</p> <button class="h-compgo">知道了</button> </div> </div>'
                $(".html-container").append(arr);
                $(".h-popup").css("display", "block");
                $(".h-spopup").css("display", "block");
                // $(".html-container").css("position", "fixed");
                $(".h-popup").on("click", ".h-closs", function () {
                    $(".h-popup").css("display", "none");
                    $(".h-spopup").css("display", "none");
                    $(".html-container").css("position", "relative");
                });
                $(".h-popup").on("click", ".h-compgo", function () {
                    $(".h-popup").css("display", "none");
                    $(".h-spopup").css("display", "none");
                    $(".html-container").css("position", "relative");
                });
            }
        },
        error: function (err) {
            my.error(err);
            // if (err.status == 404) {
            //     hashHistory.push("/pageto404");
            // } else if (err.status == 500) {
            //     hashHistory.push("/");
            // } else if (err.status == 0) {
            // }
        }
    });
}

export default $.llsajax;
