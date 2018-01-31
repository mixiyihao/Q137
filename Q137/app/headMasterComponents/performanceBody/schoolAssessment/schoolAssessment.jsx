import React from 'react';
import { hashHistory } from 'react-router';
import ViewPModel from '../spre_publicModel/Sk.jsx';
export default class SchoolAssessment extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        //console.log(this.props.majorname)
        return(
            <div>
                <div>
                   <ViewPModel {...this.props}/>
                </div>
            </div>
        );
    }
}