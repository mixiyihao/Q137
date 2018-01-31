import flux from 'flux'
import stores from '../sto/sto.js'

//拿到flux模块里的Dispatcher类
let Dispatcher = flux.Dispatcher;
//用Dispatcher类new一个AppDispatcher对象
let Dpc = new Dispatcher();

//调用register方法注册接收到各种actionType的Action之后的回调函数
Dpc.register(function (action) {
    switch (action.actionType) {
        case 'CHANGE_COURSE':
            stores.changeItemHandler(action.flag)
            stores.emitChange()
            break;
        case 'CHANGE_MARK':
            stores.changeIdHandle(action.vals)
            stores.emitId()
            break;
        default:
    }
})

export default Dpc