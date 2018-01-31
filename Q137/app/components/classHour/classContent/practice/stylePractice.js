
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
        padding: "10px 0 0 230px"
    },
    practiceBoxTeacher: {
        width: "970px",
        margin: "auto",
        overflow: "hidden"
    },
    classroomCaption: {
        fontSize: "16px",
        height: "45px",
        lineHeight: "22px",
        textIndent: "11px",
        background: "url(" + require('../../../../images/leftNavBar/bj_02.gif') + ") no-repeat 0 10px",
        padding: "10px 0 12px 0",
        color: "#606060",
        width: "120px"
    },
    practiceContent: {
        width: "962px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px"
    },
    practiceContentStudent: {
        width: "1013px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px",
        marginLeft: "12px",
    },
    practiceContentStudent2: {
        width: "1013px",
        background: "#fff",
        overflow: "hidden",
        marginBottom: "10px",
        marginLeft: "12px",
        boxShadow: "rgba(0, 0, 0, 0.0980392) 0px 2px 5px"
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
        marginLeft: "30px",
        color: "#606060",
        // lineHeight: "42px",
        width: "975px",
        display: "flex",
        display: "-webkit-flex",
        // alignItems: "center",
        // justifyContent: "space-between",
        marginRight: "12px",
        position: "relative",
    },
    practiceCaption2: {
        fontSize: "16px",
        minHeight: "43px",
        lineHeight: "22px",
        // textIndent: "11px",
        marginLeft: "30px",
        color: "#606060",
        // lineHeight: "42px",
        width: "975px",
        display: "flex",
        display: "-webkit-flex",
        // alignItems: "center",
        // justifyContent: "space-between",
        borderBottom: "1px dashed #e7e7e7",
        marginRight: "12px",
        position: "relative",
    },
    practiceCaptionNumbre: {
        float: "left",
        marginTop: "11px",
        marginRight: "3px"
    },
    practiceCaptionTextarea: {
        paddingTop: "10px",
        paddingBottom: "10px",
        width: "790px",
        minHeight: "43px",
        float: "left",
        display: "flex",
        display: "-webkit-flex",
        alignItems: "center",
        paddingLeft: "4px",
        wordWrap:"break-word",
        wordBreak: "break-all",
        // hyphens:"auto"
        // resize: "none",
        // border: "none",
        // background: "#fff",
        // overflowY: "visible",
        // height: "100%"
    },
    practiceCaptionI: {
        // display: "inline-block",
        // height: "43px",
        // lineHeight: "43px",
        // width: "10px"
    },
    practiceStop: {
        float: "right",
        width: "100px",
        minHeight: "5px",
        display: "block",
        fontSize: "14px",
        color: "#909090",
        cursor: "pointer",
        position: "absolute",
        right: "0px",
        top: "50%"
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
        width: "104px",
        height: "33px",
        lineHeight: "33px",
        marginLeft: "40px",
        color: "#1380f9",
        border: "1px solid #9de5f4",
        borderBottom: "none",
        marginTop: "8px",
        position: "relative",
        background: "#fbfbfb"
    },
    practiceSpan: {
        width: "65px",
        height: "32px",
        display: "block",
        lineHeight: "32px",
        marginLeft: "5px",
        float: "left",
    },
    practiceTriangleRight: {
        width: "18px",
        height: "32px",
        float: "left",
        lineHeight: "32px",
        display: "inline-block",
        marginLeft: "11px"
    },
    practiceLine: {
        height: "1px",
        background: "#fbfbfb",
        width: "102px",
        position: "absolute",
        left: "0",
        bottom: "-1px",
        zIndex: "10"
    },
    practicThinking: {
        width: "965px",
        minHeight: "280px",
        border: "1px solid #9de5f4",
        marginLeft: "40px",
        position: "relative",
        overflowY: "auto",
        background: "#fbfbfb",
    },
    practicThinkingCenter: {
        minHeight: "280px",
        color: "#b1b1b1"
    },
    practicThinkingCenterText: {
        width: "100%",
        resize: "none",
        border: "none",
        height: "280px",
        color: "rgb(112,112,112)",
        background: "transparent",
        padding: "10px",
        overflowY: "scroll"
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
        height: "33px",
        lineHeight: "32px",
        marginLeft: "40px",
        marginTop: "20px",
        width: "104px",
        background: "rgb(74, 192, 224)",
        color: "#fff",
        cursor: "pointer",
        position: "relative",
        marginBottom: "17px",
        padding: "0"
    },
    practiceTitleClick: {
        height: "33px",
        lineHeight: "32px",
        marginLeft: "40px",
        marginTop: "20px",
        width: "104px",
        background: "#fbfbfb",
        border: "1px solid #9de5f4",
        borderBottom: "none",
        color: "#1680fa",
        position: "relative",
        padding: "0"
    },
    practiceSpan2: {
        width: "65px",
        height: "32px",
        display: "block",
        lineHeight: "32px",
        marginLeft: "5px",
        float: "left",
    },
    practiceTriangleRight2: {
        width: "18px",
        height: "32px",
        float: "left",
        lineHeight: "32px",
        display: "inline-block",
        marginLeft: "11px"
    },
    practicThinking2Hide: {
        display: "none"
    },
    practicThinking2Show: {
        width: "965px",
        minHeight: "280px",
        border: "1px solid #9de5f4",
        marginLeft: "40px",
        position: "relative",
        overflowY: "auto",
        background: "#fbfbfb",
        marginBottom: "17px"
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
        marginLeft: "40px",
        marginBottom: "20px",
        marginTop: "20px"
    },
    practiceImagehide: {
        display: "none"
    },
    practiceCenter: {
        display: "none"
    },
    practiceMsg: {
        position: "absolute",
        left: "115px",
        top: "0px",
        color: "#fc0e01",
        width: "260px",
        height: "16px",
        fontSize: "12px"
    },
    practiceBigImgHide: {
        display: "none",
    },
    practiceBigImgShow: {
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(30, 30, 30, 1)",
        zIndex: "600",
    },
    practiceBigImgA: {
        position: "absolute",
        right: "12px",
        top: "12px",
        width: "26px",
        height: "26px",
        lineHeight: "26px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "rgba(83, 83, 83, .8)",
        color: "#1e1e1e",
        borderRadius: "100%",
        zIndex: "99",
    },
    practiceBigImgA2: {
        position: "absolute",
        right: "12px",
        top: "12px",
        width: "26px",
        height: "26px",
        lineHeight: "26px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#4ac0e0",
        color: "#1e1e1e",
        borderRadius: "100%",
        zIndex: "99",
    },
    practiceBigImg: {
        position: "absolute",
        left: "50%",
        top: "50%",
        maxHeight: "900px",
    }
}

export default styles;
