import React, { Component } from 'react';
import './TMComponentcontrol.css';
import Editassistant from './assistantConfig/Editassistant.jsx';
import Insertassistant from './assistantConfig/Insertassistant.jsx';
import JobTransfer from '../../../../teachingManagement/components/authorityManagement/jobTransfer/jobTransfer.jsx';
import ReactDOM from 'react-dom';

export default class TMComponentcontrol extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            height: this.props.height,
            width: this.props.width,
        })
    }

    componentDidUpdate() {
        this.TMranderDom();
    }

    TMranderDom() {
        let configtag = this.props.configtag;
        if (configtag != null) {
            switch (configtag) {
                case "insert":
                    ReactDOM.unmountComponentAtNode(document.getElementById("TMChoose"));
                    ReactDOM.render(
                        <Insertassistant
                            message={this.props.message}
                            AllclassList={this.props.AllclassList}
                            tmChoseConfigpage={this.props.tmChoseConfigpage.bind(this)}
                            typeStr={this.props.typeStr}
                            userJudge={this.props.userJudge}
                        />,
                        document.getElementById("TMChoose")
                    );
                    break;
                case "edit":
                    ReactDOM.unmountComponentAtNode(document.getElementById("TMChoose"));
                    ReactDOM.render(
                        <Editassistant
                            message={this.props.message}
                            editid={this.props.editid}
                            teacherMessage={this.props.teacherMessage}
                            AllclassList={this.props.AllclassList}
                            tmChoseConfigpage={this.props.tmChoseConfigpage.bind(this)}
                            userJudge={this.props.userJudge}
                        />,
                        document.getElementById("TMChoose")
                    );
                    break;
                case "transfer":
                    ReactDOM.unmountComponentAtNode(document.getElementById("TMChoose"));
                    ReactDOM.render(
                        <JobTransfer
                            message={this.props.message}
                            editid={this.props.editid}
                            teacherMessage={this.props.teacherMessage}
                            AllclassList={this.props.AllclassList}
                            tmChoseConfigpage={this.props.tmChoseConfigpage.bind(this)}
                            typeStr={this.props.typeStr}
                            userJudge={this.props.userJudge}
                        />,
                        document.getElementById("TMChoose")
                    );
                    break;
            }
        }
    }

    render() {
        let { ShoworHidden } = this.props;
        return (
            <div className="TMComponentcontrol" style={{ display: ShoworHidden ? "block" : "none" }}>
                <div className="TMComponentContent">
                    <div id="TMChoose"></div>
                </div>
            </div>
        )
    }
}
