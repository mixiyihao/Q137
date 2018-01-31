import Dpc from '../dpc/dpc.js'

class Act {

    //发送ADD_NEW_ITEM的Action的方法
    changeItem(flag) {
        //调用Dispatcher获取actionType为ADD_NEW_ITEM的Action
        Dpc.dispatch({
            actionType: 'CHANGE_COURSE',
            flag: flag
        })
    }
    changeId(vals) {
        //调用Dispatcher获取actionType为ADD_NEW_ITEM的Action
        Dpc.dispatch({
            actionType: 'CHANGE_MARK',
            vals: vals
        })
    }
}

export default Act