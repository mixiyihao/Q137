import React from 'react';
import $ from "jquery";
import MHeight from '../../components/finalExam/MHeight.js';
export default class s_previewtestItem2 extends React.Component{
    constructor(props){
         super(props);
         this.state={
          answerHeightItem:2,
          stemLengthItem:2
             }
            }
    componentWillMount(){
        // 答案的长度
        let answerLength=MHeight(this.props.answer,88);
        // 题干的长度
        let stemLength=MHeight(this.props.stem,104);
            this.setState({
                answerHeightItem:answerLength,
                stemLengthItem:stemLength
            }) 
        
    }
    render(){  
        let hei={
            height:(this.state.answerHeightItem*30+3)+"px"
        }
        let stemheight={
            height:(this.state.stemLengthItem*28+4)+"px"
        }
        return(
          <div className="exItem spre_newexItem">
          <div className="radioExam">
            <div className="h-titlItem spre_newexamdiv">
              <p className="spre_p Sprosaq_p"><b className="spre_previewtestItemb Sprosaq_Itemb"><i className="iii" >{Number(this.props.zcindex+this.props.Item+1)<10?"0"+Number(this.props.zcindex+this.props.Item+1):
                  Number(this.props.zcindex+this.props.Item+1)}</i><i className="ii">/{this.props.exLength<10?"0"+this.props.exLength:this.props.exLength}</i></b><textarea className="Sprosaq_Spanstem"
                  style={stemheight} value={this.props.stem}>
                  </textarea></p>
            </div>
             <div className="rightItem spre_newrightItem " ><span className="PTTPRAspan">正确答案:<textarea className="Spreviewansi" style={hei}>
                {this.props.answer}
             </textarea>
             </span></div>
          </div>
        </div>
        )
    }
}
