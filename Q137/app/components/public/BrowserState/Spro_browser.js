 function onGool() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    let Browser=""
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      
        Browser= 1
      
    } else if (isEdge) {
     
        Browser= 1
   
    } else {
    
        Browser=2
    
    }
    return Browser;
  }
module.exports = onGool;