import React from 'react';
export default class ComponentItem extends  React.Component{
    constructor(){
        super();
        this.state={
            startNum:0
        }
    }
    componentWillReceiveProps(propsObj){
        let PropsItems=propsObj.ObjComponent
        let startNum=0;
        if(propsObj.ObjComponent[0]!=undefined){
        switch(this.props.index){
            case 0:
            startNum=Number(PropsItems[0])
            break;
            case 1:
             startNum=Number(PropsItems[1])
            break;
            case 2:
            startNum=Number(PropsItems[2])
            break;
            case 3:
             startNum=Number(PropsItems[3])
            break;
            default:
            break;
        }
        }
        this.setState({
            startNum:startNum
        })
    }
    render(){
        return(
            <div>
               <div className="classEvaluation_wrap_msgTitle">{this.props.index + 1}.{this.props.value.msg}</div>
                <div className="classEvaluation_wrap_msgStar">
                    <div className="classEvaluation_wrap_msgStarBox SeeevaItemtouch">
                        <span className={this.state.startNum >= 1? "iconfont icon-star1 " : "iconfont icon-star"}></span>
                        <span className={this.state.startNum >= 2? "iconfont icon-star1 " : "iconfont icon-star"}></span>
                        <span className={this.state.startNum >= 3? "iconfont icon-star1 " : "iconfont icon-star"}></span>
                        <span className={this.state.startNum >= 4? "iconfont icon-star1 " : "iconfont icon-star"}></span>
                        <span className={this.state.startNum >= 5? "iconfont icon-star1 " : "iconfont icon-star"}></span>
                    </div>
                </div>    
            </div>
        )
    }
}
