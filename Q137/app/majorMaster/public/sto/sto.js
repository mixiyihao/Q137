import EventEmitter from 'events'

class Stores extends EventEmitter {

    constructor() {
        super()
        //初始化数据
        this.flag = false
        this.vals = '-1'
    }
    
    getAll(){
        return this.flag
    }
    getId(){
        return this.vals
    }
    //增加数据的处理函数
    changeItemHandler(flag) {
        this.flag=flag
    }
    changeIdHandle(vals){
        this.vals = vals
    }
    //提交变化
    emitChange() {
        this.emit('change')
    }
    // 监听id
    emitId() {
        this.emit('changeid')
    }
    //监听id，当有变化时调用注册的回调方法
    addChangeIdListener(callback) {
        this.on('changeid', callback)
    }

    //remore监听id函数
    removeChangeIdListener(callback) {
        this.removeListener('changeid', callback)
    }
    //监听函数，当有变化时调用注册的回调方法
    addChangeListener(callback) {
        this.on('change', callback)
    }

    //remore监听函数
    removeChangeListener(callback) {
        this.removeListener('change', callback)
    }
}

//new一个listStore作为单例暴露给其它模块使用
let stores = new Stores()

export default stores