import React from 'react';
import ComponentItem from './ComponentItem.js';
import $ from 'jquery';
export default class SeeevaComponent extends React.Component{
    constructor(){
        super();
        this.state={
            ObjComponent:[
                "1",
                "2",
                "3",
                "4"
            ],
            detail:[],
        }
    }
    componentWillReceiveProps(propsObj){
          let propsO=propsObj.ObjInit;
          let ObjComponent=[];
          let detail=[]
        switch(this.props.ComponentIndex){
            case 0:
            ObjComponent[0]=propsO.optionA1;
            ObjComponent[1]=propsO.optionA2;
            ObjComponent[2]=propsO.optionA3;
            ObjComponent[3]=propsO.optionA4;
            detail=propsO.detailA
            break;
            case 1:
            ObjComponent[0]=propsO.optionB1;
            ObjComponent[1]=propsO.optionB2;
            ObjComponent[2]=propsO.optionB3;
            ObjComponent[3]=propsO.optionB4;
            detail=propsO.detailB
            break;
            case 2:
            ObjComponent[0]=propsO.optionC1;
            ObjComponent[1]=propsO.optionC2;
            ObjComponent[2]=propsO.optionC3;
            ObjComponent[3]=propsO.optionC4;
            detail=propsO.detailC
            break;
            case 3:
            ObjComponent[0]=propsO.optionD1;
            ObjComponent[1]=propsO.optionD2;
            ObjComponent[2]=propsO.optionD3;
            ObjComponent[3]=propsO.optionD4;
            detail=propsO.detailD
            break;
            default:
            break;
        }
        this.setState({
            ObjComponent:ObjComponent,
            detail:detail
        })

    }
    onTextareaChange(e){

    }
    render(){
        let ItemColor=["#e8ddfd","#ffe3e8","#ffede9","#ffe9fb"]
        let CItemColor=["18px solid #e8ddfd","18px solid #ffe3e8",
        "18px solid #ffede9","18px solid #ffe9fb",]
        let Styleperpon=[
            {
                BG:"rgb(203, 178, 244)",
                C:"rgb(173, 135, 244)"
            },
            {
                BG:"rgb(251, 181, 192)",
                C:"rgb(242, 98, 125)"
            },
            {
                BG:"rgb(255, 192, 174)",
                C:"rgb(249, 88, 36)"
            },
            {
                BG:"rgb(254, 197, 242)",
                C:"rgb(255, 4, 225)"
            }
        ]
        let StyleP={
            background:Styleperpon[this.props.ComponentIndex].BG,
            color:Styleperpon[this.props.ComponentIndex].C
        }
        let indexbgColor={
            background:ItemColor[this.props.ComponentIndex]
        }
        let Sprotwpspan=this.refs.Sprotwospan;
        //console.log(Sprotwpspan);
        let indexibgColor={
            borderLeft: CItemColor[this.props.ComponentIndex],

        }

        let userFlag=sessionStorage.getItem("userJudge");
        let  SeeevaCtextarea={
            width:userFlag=="S"?"836px":""
        }

        return(
             <div className="classEvaluation_wrap_box">
                 <div className="classEvaluation_wrap_oneTitleBox">
                     <div className="SproclassEvaluation_wrap_oneTitle SeeSprodivStyle" style={indexbgColor}>
                         <b style={indexbgColor}>
                             <i style={indexibgColor}></i>
                             <span className="classEvaluation_wrap_oneSpan">{this.props.title}</span>
                             <span className="classEvaluation_wrap_twoSpan">评价对象：{this.props.SeeevaData}</span>
                             <span className="classEvaluation_wrap_threeSpan" style={StyleP}>{this.props.label}</span>
                         </b>
                     </div>
                 </div>
                {this.props.list.map((value,index) => {
                    return <ComponentItem key={index} index={index}  value={value}
                    ObjComponent={this.state.ObjComponent}
                    />
                })}
                <div className="classEvaluation_wrap_textarea">
                    <span>5.其它评价：</span>
                    <textarea style={SeeevaCtextarea} onChange={this.onTextareaChange.bind(this)} value={this.state.detail} className="SeeevaCtextarea" readOnly disabled></textarea>
                </div>
            </div>
        )
    }
}
