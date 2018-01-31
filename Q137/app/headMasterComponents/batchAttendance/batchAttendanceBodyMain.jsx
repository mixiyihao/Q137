import React from 'react';
import BatchAttendanceItem from './batchAttendanceItem.jsx';

export default class BatchAttendanceBodyMain extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <tbody>
                {this.props.todos.map((todo, index) => {
                    return <BatchAttendanceItem key={index} {...todo} index={index} {...this.props} />
                })}
            </tbody>
        );
    }
}