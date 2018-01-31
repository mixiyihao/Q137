
import React from 'react';
import CreactTestSubject from './creactTestSubject.js';
import styles from './styleCreactTestSubjectMain.js';

export default class CreactTestSubjectMian extends React.Component {
    constructor() {
        super();
    }
    render() {  
        return (
            <div>
                {this.props.subjectValue.map((item, index) => {
                    return <CreactTestSubject key={index} {...item} {...this.props} index={index}/>
                })}
            </div>
        )
    }
}
