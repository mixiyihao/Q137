
import React from 'react';
import styles from './styleEditTopicTitle.js';

export default class EditTopicTitle extends React.Component {
    constructor() {
        super();
    }
    // 从题库中选题
    onSelectedTopic() {
        this.props.onSelectedTopic();
    }
    // <div style={styles.createTopicTitle}>
    //                 <p style={styles.createTopicTitleP}>还需添加{this.props.radioButtonListNum == "" ? 0 : this.props.editRadioSelectNum - this.props.radioButtonListNum}道单选题，{this.props.multiselectNum == "" ? 0 : this.props.editMultiselectNum - this.props.multiselectNum}道多选题，题库总计{this.props.editRadioSelectNum == "" ? 0 : this.props.editRadioSelectNum}道单选题，{this.props.editMultiselectNum == "" ? 0 : this.props.editMultiselectNum}道多选题</p>
    //             </div>
    render() {
        return (
            <div style={styles.createTopicTitleBox}>     
                <span className="commonButton button" style={styles.createTopicTitleFrom} onClick={this.onSelectedTopic.bind(this)}>从题库选题</span>
            </div>
        );
    }
}
