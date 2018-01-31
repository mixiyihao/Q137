
import React from 'react';
import styles from './styleTeacherLessonHomework.js';
import HomeworkList from './homeworkList/homeworkList.js';
import HomeworkStatistics from './homeworkStatistics/homeworkStatistics.js';


export default class TeacherLessonHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    componentDidMount() {

    }
    render() {
        let props = this.props;
        return (
            <div style={styles.y_teacherLessonHomeworkBox}>
                <HomeworkList homeworkList={this.props.homeworkList}/>
                {
                    this.state.userJudge != "T" ?
                        null
                        :
                        <HomeworkStatistics
                            classesList={props.classesList}
                            lessonID={props.lessonID}
                        />
                }

            </div>
        );
    }
}
