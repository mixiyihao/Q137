/**
 * Created by heshuai on 2017/1/11.
 */

import React from 'react';
import ReviseBody from '../components/revise/reviseBody/reviseBody.js';


export default class revise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revise: 1,
            compData: [],
            leftNavIndex: 2
        };
    }

    componentWillMount() {
        let compData = sessionStorage.getItem("userJudge");
        this.setState({
            compData: compData
        })
    }

    onClickMessage() {
    }

    onClickMessage() {
    }

    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto"
            },

        }
        return (
            <div>
                <ReviseBody/>
            </div>
        )
    }
}