
let SJQEvent=(function(){
    var list = {},
        listen,
        trigger,
        fnq,
        remove;
    listen = function(key,fn){ //监听事件函数
        if(!list[key]){
            list[key] = []; //如果事件列表中还没有key值命名空间，创建
        }
        list[key].push(fn); //将回调函数推入对象的“键”对应的“值”回调数组
    };
    trigger = function(){ //触发事件函数
        var key = Array.prototype.shift.call(arguments); //第一个参数指定“键”
        var msg = list[key];
        if(!msg || msg.length === 0){
            return false; //如果回调数组不存在或为空则返回false
        }
        for(var i = 0; i < msg.length; i++){
            msg[i].apply(this, arguments); //循环回调数组执行回调函数
        }
    };
    remove = function(key, fn){ //移除事件函数
        var msg = list[key];
        if(!msg){
            return false; //事件不存在直接返回false
        }
        if(!fn){
            delete list[key]; //如果没有后续参数，则删除整个回调数组
        }else{
            for(var i = 0; i < msg.length; i++){
                if(fn === msg[i]){
                    msg.splice(i, 1); //删除特定回调数组中的回调函数
                }
            }
        }
    };
    fnq=function(data){
      console.log(data);
          return data;
        };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove,
        fnq:fnq
    }
  })()
module.exports = SJQEvent;
