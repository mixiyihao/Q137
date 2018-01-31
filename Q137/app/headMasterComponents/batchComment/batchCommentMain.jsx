import React from 'react';
import BatchCommentItem from './batchCommentItem.jsx';

export default class BatchCommentMain extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <tbody>
            {this.props.todos.map((todo, index) => {
                return <BatchCommentItem key={index} {...todo} index={index} {...this.props} />
            })}
            </tbody>
        );
    }
}