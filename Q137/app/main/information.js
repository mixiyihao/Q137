import React from 'react';
import $ from 'jquery';

import MainBody from '../components/information/mainBody/spromainBody.js';

export default class information extends React.Component {
    constructor() {
        super();
        this.state = {
            datainfor: [],
            datainfor2: [],
            datainfor3: [],
            datainfor4: [],
            dengji: [],
            fenzi: [],
            fenmu: [],
            upLevelFlag: [],
            datainforname: [],
        }
    }

    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
                minHeight: "550px"
            }
        }
        return (
            <div>
                <MainBody
                    datainfor={this.props.datainfor}
                    datainfor2={this.props.datainfor2}
                    datainfor3={this.props.datainfor3}
                    datainfor4={this.props.datainfor4}
                    dengji={this.props.dengji}
                    fenzi={this.props.fenzi}
                    fenmu={this.props.fenmu}
                    upLevelFlag={this.props.upLevelFlag}
                    datainforname={this.props.datainfor.name}
                />

            </div>
        )
    }
}