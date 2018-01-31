
import React from 'react';
import styles from './styleCreateTopicTitle.js';

export default class CreateTopicTitle extends React.Component {
    constructor() {
        super();
    }
    // 从题库中选题
    onSelectedTopic() {
        this.props.onSelectedTopic();
    }
    render() {
        return (
            <div style={styles.createTopicTitleBox}>
                <span style={styles.createTopicTitleFrom} className="commonButton button" onClick={this.onSelectedTopic.bind(this)}>从题库选题</span>
            </div>
        );
    }
}
