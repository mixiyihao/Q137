function on_spark_player_start() {
    var WEBURL = "http://10.103.241.3/lls-web/";
    var coursename = null;
    var lessonname = null;
    var lessonID = null;
    if (window.location.hash.indexOf("&") > 0) {
        lessonID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
    } else {
        lessonID = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
    }
    var leftNavData = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
    for (var i = 0, len = leftNavData.length; i < len; i++ ) {
        for (var j = 0, len2 = leftNavData[i].lessons.length; j < len2; j++) {
            if (leftNavData[i].lessons[j].id == lessonID) {
                lessonname = leftNavData[i].lessons[j].name;
                coursename = leftNavData[i].name;
                break;
            }
        }
    }
    $.ajax({
        url: WEBURL + 'trajectorylog/insert',
        type: "POST",
        async: true,
        data: {
            type: 7,
            coursename: coursename,
            lessonname: lessonname,
            othername: sessionStorage.getItem("othername")
        },
        success: function (trajectorylogData) {
        }
    });
}