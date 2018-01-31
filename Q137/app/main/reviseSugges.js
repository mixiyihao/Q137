import React from 'react';
import ReviseSuggBody from '../components/newSugges/reviseSugges/reviseSuggesBody.js';
import $ from 'jquery';

export default class reviseSugges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revise: 1,
            compData: [],
            leftNavIndex: 3,
            sugges: []
        };

    }

    componentWillMount() {
        let compData = sessionStorage.getItem("userJudge");
        this.setState({
            compData: compData
        })
        $.llsajax({
            url: "opinion/myopinion",
            type: "post",
            data: {
                pageno: 1,
                perpage: 5
            },
            success: data => {
                if (data != null) {
                    this.setState({
                        sugges: data
                    })
                }
            }

        })
    }

    onClickMessage() {
    }

    // headershow() {
    //     if (this.state.compData == "T") {
    //         let headheight = {
    //             height: "40px"
    //         }
    //         return (
    //             <div style={headheight}>
    //                 <ThReviseHead revise={this.state.revise} />
    //             </div>
    //         )
    //     } else if (this.state.compData == "S") {
    //         return (
    //             <div>
    //                 <Header onClickMessage={this.onClickMessage.bind(this)}/>
    //             </div>
    //         )
    //     }
    // }
    onClickMessage() {
    }

    render() {
       
        let styles = {
            // headWrap: {
            //     width: "1280px",
            //     margin: "auto",
            // },
            Wrap: {
                width: "1280px",
                margin: "auto"
            },
            // height: {
            //     height: "100%"
            // },
            // headWrapTeacher: {
            //     width: "1280px",
            //     margin: "auto",
            //     position: "relative"
            // }
        }
        return (
            <div>
                <ReviseSuggBody sugges={this.state.sugges} handleChooseTab={this.props.handleChooseTab.bind(this)}
                rid={this.props.rid}/>
            </div>
        )
    }
}
