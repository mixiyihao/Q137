// let url = {
// 	// WEBURL: "http://103.244.59.105:8020/lls-web/"
// 	WEBURL: "http://10.103.241.3:8080/lls-web/"
// 	// WEBURL: "http://10.103.123.215:10000/lls-web/"
// 	// WEBURL:'http://edusys.lenovo.com/lls-web/'
// };

let url = {};
if (process.env.NODE_ENV === "production") {
    url.WEBURL = 'http://' + window.location.href.split('/')[2] + '/lls-web/';
} else {
    url.WEBURL = "http://10.103.241.3:8080/lls-web/";
    // url.WEBURL = "http://localhost:10001/lls-web/"
}

export default url;
