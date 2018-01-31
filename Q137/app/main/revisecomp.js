/**
 * Created by heshuai on 2017/1/11.
 */

import React from 'react';
import ReviseComple from '../components/revisecomplete/revisecomple/revisecomple.js';


export default class revisecomple extends React.Component {
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


    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto"
            },

        }
        return (
            <div>
                <ReviseComple/>
            </div>

        )
    }
}