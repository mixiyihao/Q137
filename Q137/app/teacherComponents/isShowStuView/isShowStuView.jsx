import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StuClassRoom from '../../components/classHour/classContent/classRoom/ClassRoom.js';
import StudentHandbook from '../../components/classHour/classContent/studentHandbook/studentHandbook.js';
import StuVideoReview from '../../components/classHour/classContent/videoReview/stuVideoReview.js';
import StuHomework from '../../components/classHour/classContent/homeWork/stuHomework.js';
import StuPractice from '../../components/classHour/classContent/practice/stuPractice.js';

export default class IsShowStuView extends Component {
    constructor() {
        super();
        this.state = {
            tabIDView: 0,
            classroomStyle: {
                padding: "10px 0 50px 125px",
                background: "#f4f4f5",
                minHeight: "600px",
            },
            StudentHandbookStyle: {
                margin: "10px 0px 0px 125px",
                minHeight: "600px"
            },
            StuPracticeStyle: {
                padding: "10px 0 0 125px",
            },
            StuVideoReview: {
                height: "500px",
                padding: "10px 150px 0px 125px",
                minHeight: "700px",
            },
            StuHomeworkStyle: {
                padding: "10px 0px 20px 125px",
                background: "rgb(244, 244, 245)",
                minHeight: "80vh",
            }
        }
    }
    componentDidMount() {
        // ReactDOM.render(
        //     <StuClassRoom classroomStyle={this.state.classroomStyle} dataList={this.props.dataList} className={this.props.lesson.name} />,
        //     document.getElementById("classRoomContentView")
        // );
    }
    onLessonUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        if (this.state.tabIDView !== nextProps.tabIDView) {
            console.log("11111111----");
            switch (nextProps.tabIDView) {
                case 0:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContentView"));
                    ReactDOM.render(
                        <StuClassRoom classroomStyle={this.state.classroomStyle} dataList={this.props.dataList} className={this.props.lesson.name} />,
                        document.getElementById("classRoomContentView")
                    );
                    break;
                case 1:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContentView"));
                    ReactDOM.render(
                        <StudentHandbook StudentHandbookStyle={this.state.StudentHandbookStyle} markdown={this.props.markdown} />,
                        document.getElementById("classRoomContentView")
                    );
                    break;
                case 2:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContentView"));
                    ReactDOM.render(
                        <StuPractice StuPracticeStyle={this.state.StuPracticeStyle} practiceListList={this.props.lesson.practiceListList} />,
                        document.getElementById("classRoomContentView")
                    );
                    break;
                case 3:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContentView"));
                    ReactDOM.render(
                        <StuVideoReview StuVideoReview={this.state.StuVideoReview} lessonresourceList={this.props.lesson.lessonresourceList} />,
                        document.getElementById("classRoomContentView")
                    );
                    break;
                case 4:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContentView"));
                    ReactDOM.render(
                        <StuHomework StuHomeworkStyle={this.state.StuHomeworkStyle} homeworkList={this.props.lesson.homeworkList} userHomework={this.props.lesson.userHomework} userHomeworkLength={this.props.userHomeworkLength} onLessonUpdate={this.onLessonUpdate.bind(this)} score={""} />,
                        document.getElementById("classRoomContentView")
                    );
                    break;
            }
            this.state.tabIDView = nextProps.tabIDView;
            this.setState({
                tabIDView: this.state.tabIDView
            });

        }

    }
    render() {
        let styles = {
            minHeight: {
                minHeight: "500px",
            },
            wrap: {
                width: "1280px",
                margin: "auto",
                position: "relative",
                minHeight: "550px"
            }
        };
        return (
            <div style={styles.wrap}>
                <div id="classRoomContentView" style={styles.minHeight}></div>
            </div>
        );
    }
}