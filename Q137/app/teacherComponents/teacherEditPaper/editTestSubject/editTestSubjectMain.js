
import React from 'react';
import EditTestSubject from './editTestSubject.js';
import styles from './styleEditTestSubjectMain.js';

export default class EditTestSubjectMian extends React.Component {
    constructor() {
        super();
    }
    render() {  
        return (
            <div>
                {this.props.subjectValue.map((item, index) => {
                    return <EditTestSubject key={index} {...item} {...this.props} index={index}/>
                })}
            </div>
        )
    }
}
