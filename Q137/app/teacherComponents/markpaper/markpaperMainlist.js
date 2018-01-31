import React from 'react';
import {hashHistory} from 'react-router';
export default class MarkpaperMainlist extends React.Component{
  constructor(){
   super();
    this.state={
      typeInfo:"缺考",
      pigaiState:true,
    }
  }
  hashExpigaiSub(){
    let eid=location.hash.split("?id=")[1].split("&")[0];
    hashHistory.push("/tmarksubquestion?eid="+eid+"&sid="+Base64.encodeURI(this.props.id)+"&un="+Base64.encodeURI(this.props.username)+"&F="+location.hash.split("&F=")[1]);
  }
  componentWillMount(){
    this.ChooseState(this.props.state);
  }
  ChooseState(F){
    switch(F){
      case "00":
      this.setState({
        typeInfo:"未批改",
        pigaiState:true,
      })
      break;
      case "10":
      this.setState({
        typeInfo:"客观题未批改",
        pigaiState:false
      })
      break;
      case "01":
      this.setState({
        typeInfo:"主观题未批改",
        pigaiState:true,
      })
      break;
      case "11":
      this.setState({
        typeInfo:"已批改",
        pigaiState:false
      })
      break;
      default:
      this.setState({
        pigaiState:false
      })
      break;
    }
  }
  render(){
    const listConfig=this.props.listConfig;
    let Skey="";
    //if(this.props.index<9&&this.props.page==1){
    if(this.props.index<9){
         Skey="0"+(this.props.index+1)
    }
    else{
     //Skey=(this.props.page-1)*10+(this.props.Skey+1)
        Skey=(this.props.index+1)
    }
    let pigaiStyle={
      cursor:this.state.pigaiState&&this.props.subCount!="0"?"pointer":"normal",
      color:this.state.pigaiState&&this.props.subCount!="0"?"rgb(96,96,96)":"rgb(193,193,193)",
      verticalAlign: "middle"
    }
    let pagaibstyle={
      fontWeight:"normal",
      verticalAlign: "top",
      cursor:this.state.pigaiState&&this.props.subCount!="0"?"pointer":"normal",
      color:this.state.pigaiState&&this.props.subCount!="0"?"rgb(96,96,96)":"rgb(193,193,193)"
    }
    return(
    <ul>
      <li style={{width:listConfig[0]+"%"}}>{Skey}</li>
      <li style={{width:listConfig[1]+"%"}}>{this.props.name}</li>
      <li style={{width:listConfig[2]+"%"}}>{this.props.idcard}</li>
      <li style={{width:listConfig[3]+"%"}}>{this.props.choscore!=null?this.props.choscore:"--"}</li>
      <li style={{width:listConfig[4]+"%"}}>{this.props.subscore!=null?this.props.subscore:"--"}</li>
      <li style={{width:listConfig[5]+"%"}}>{this.props.score!=null?this.props.score:"--"}</li>
      <li style={{width:listConfig[6]+"%"}}>{this.state.typeInfo}</li>
      <li style={{width:listConfig[7]+"%"}} className="Mpmllastli" onClick={this.state.pigaiState&&this.props.subCount!="0"?this.hashExpigaiSub.bind(this):null}>
        <i className="iconfont icon-pigai" 
          style={pigaiStyle}></i>
         <b style={pagaibstyle}>批改试卷</b>
      </li>
    </ul>
  )
  }
}
