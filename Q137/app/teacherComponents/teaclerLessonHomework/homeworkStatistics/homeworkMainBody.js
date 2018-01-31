
import React from 'react';
import styles from './styleHomeworkStatistics.js';
import HomeworkItem from './homeworkItem.js';

export default class HomeworkMainBody extends React.Component {
    render() {
        let styles2 = {
            table: {
                tableLayout: "fixed",
            }
        };
        return (
            <table style={styles2.table}>
                {this.props.todos.map((todo, index) => {
                    return <HomeworkItem key={index} {...todo} index={index} {...this.props} />
                })}
                <div style={this.props.todos.length == 0 ? styles.warningShow : styles.warningHide}>
                    <i style={styles.warningImg}></i>
                    <span style={styles.warningSpan}>当前无作业数据</span>
                </div>
            </table>
        );
    }
}
