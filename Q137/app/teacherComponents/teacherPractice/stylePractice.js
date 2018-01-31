
var styles = {
    practiceBoxNone: {
        background: "#f4f4f5",
        minHeight: "650px",
        overflow: "hidden",
    },
    practiceBoxNoneT: {
        background: "#f4f4f5",
        minHeight: "650px",
        overflow: "hidden",
        paddingBottom: "30px"
    },
    practiceBox: {
        padding: "0px 0 0 230px"
    },
    practiceBoxTeacher: {
        width: "970px",
        margin: "auto",
        overflow: "hidden",
        position: "relative"
    },
    classroomCaption: {
        fontSize: "16px",
        height: "65px",
        lineHeight: "22px",
        textIndent: "11px",
        background: "url(" + require('../../images/leftNavBar/bj_02.gif') + ") no-repeat 0 30px",
        padding: "30px 0 12px 0",
        color: "#606060",
        width: "120px"
    },
    practiceAdd: {
        position: "absolute",
        right: "8px",
        top: "25px",
        width: "95px",
        height: "28px",
        background: "#51c0de",
        color: "#fff",
        cursor: "pointer",
        textAlign: "center",
        lineHeight: "28px"
    },
    practiceContent: {
        width: "962px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px"
    },
    practiceContentStudent: {
        width: "962px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px",
        marginLeft: "45px"
    },
    practiceContent2: {
        width: "850px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px",
        marginLeft: "12px"
    },
    practiceCaption: {
        fontSize: "16px",
        minHeight: "43px",
        lineHeight: "22px",
        // textIndent: "11px",
        paddingLeft: "11px",
        color: "#606060",
        // lineHeight: "42px",
        width: "962px",
        display: "flex",
        display: "-webkit-flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    practiceCaptionTextarea: {
        paddingTop: "10px",
        paddingBottom: "10px",
        width: "846px",
        minHeight: "43px",
        float: "left",
        display: "flex",
        display: "-webkit-flex",
        alignItems: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        // resize: "none",
        // border: "none",
        // background: "#fff",
        // overflowY: "visible",
        // height: "100%"
    },
    practiceCaptionToolBox: {
        float: "left",
        width: "116px",
        minHeight: "5px",
    },
    practiceCaptionI: {
        // display: "inline-block",
        // height: "43px",
        // lineHeight: "43px",
        // width: "10px"
    },
    practiceModify: {
        float: "left",
        minHeight: "5px",
        display: "block",
        color: "#1481fa",
        fontSize: "18px",
        cursor: "pointer"
    },
    practiceDelete: {
        float: "left",
        marginLeft: "12px",
        minHeight: "5px",
        display: "block",
        color: "#1481fa",
        fontSize: "18px",
        cursor: "pointer"
    },
    practiceStop: {
        float: "right",
        width: "46px",
        minHeight: "5px",
        display: "block",
        fontSize: "14px",
        color: "#909090",
        cursor: "pointer"
    },
    practiceStop2: {
        float: "right",
        width: "46px",
        minHeight: "5px",
        display: "none",
        fontSize: "14px",
        color: "#909090",
        cursor: "pointer"
    },
    practiceStopIcon: {
        display: "block",
        float: "right",
        width: "27px",
        height: "43px",
        textAlign: "center"
    },
    practiceTitle: {
        width: "125px",
        height: "32px",
        lineHeight: "32px",
        marginLeft: "18px"
    },
    practiceSpan: {
        width: "85px",
        height: "32px",
        background: "#49c0e0",
        color: "#fff",
        display: "block",
        lineHeight: "32px",
        paddingLeft: "20px",
        float: "left"
    },
    practiceTriangleRight: {
        width: "0",
        height: "0",
        borderTop: "16px solid transparent",
        borderLeft: "9px solid #49c0e0",
        borderBottom: "16px solid transparent",
        float: "left"
    },
    practicThinking: {
        width: "930px",
        minHeight: "280px",
        border: "1px solid #f7f7f7",
        marginTop: "11px",
        marginLeft: "18px",
        position: "relative",
        overflowY: "auto"
    },
    practicThinkingCenter: {
        minHeight: "60px",
        padding: "10px 15px 19px",
        color: "#b1b1b1"
    },
    practicThinkingCenterText: {
        width: "100%",
        resize: "none",
        border: "none",
        background: "#fff",
        height: "200px",
    },
    practicThinkingRead: {
        width: "85px",
        height: "30px",
        color: "#71706e",
        lineHeight: "30px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "14px",
        position: "absolute",
        right: "69px",
        bottom: "23px",
        border: "1px solid #71706e",
        textAlign: "center",
        paddingLeft: "10px"
    },
    practicThinkingReadI: {
        float: "left",
        height: "30px",
        display: "block",
        lineHeight: "30px",
        fontSize: "28px",
        paddingTop: "1px"
    },
    practicThinkingSpan: {
        float: "left"
    },
    practiceTitle2: {
        height: "32px",
        lineHeight: "32px",
        marginLeft: "18px",
        marginTop: "13px",
        marginBottom: "10px"
    },
    practiceSpan2: {
        width: "85px",
        height: "32px",
        background: "#e8e8e8",
        color: "#909090",
        display: "block",
        lineHeight: "32px",
        paddingLeft: "20px",
        float: "left"
    },
    practiceTriangleRight2: {
        width: "0",
        height: "0",
        borderTop: "16px solid transparent",
        borderLeft: "9px solid #e8e8e8",
        borderBottom: "16px solid transparent",
        float: "left"
    },
    practicThinking2Hide: {
        width: "927px",
        height: "280px",
        border: "1px solid #f7f7f7",
        marginTop: "11px",
        marginLeft: "18px",
        marginBottom: "24px",
        overflowY: "auto",
        display: "none"
    },
    practicThinking2Show: {
        width: "927px",
        height: "280px",
        border: "1px solid #f7f7f7",
        marginTop: "11px",
        marginLeft: "18px",
        marginBottom: "24px",
        overflowY: "auto",
        display: "block"
    },
    practiceTitleP: {
        display: "block",
        marginLeft: "10px",
        color: "#e3221b"
    },
    practiceHide: {
        display: "none"
    },
    practiceShow: {
        display: "block"
    },
    practiceImage: {
        width: "350px",
        // marginTop: "10px",
        marginLeft: "18px",
        marginBottom: "20px"
    },
    practiceImagehide: {
        display: "none"
    },
    practiceCenter: {
        display: "none"
    }
}

export default styles;
