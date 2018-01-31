/**
 * Created by YH on 2017/2/24.
 */

var styles = {
    y_homeworkCommentBox: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "#000",
        filter: "alpha(opacity=30)",
        opacity: "0.3",
        zIndex: "998"
    },
    y_homeworkCommentCenter: {
        position: "fixed",
        top: "130px",
        left: "50%",
        width: "534px",
        height: "300px",
        border: "1px solid #52bce3",
        zIndex: "999",
        background: "#fff"
    },
    y_homeworkCommentTitle: {
        height: "30px",
        margin: "0 20px",
        borderBottom: "1px solid #e8e8e8",
        position: "relative"
    },
    y_homeworkCommentTitleMsg: {
        float: "left",
        height: "30px",
        width: "30px",
        textAlign: "center",
        lineHeight: "30px",
        color: "#2b2b2b"
    },
    y_homeworkCommentTitleClose: {
        float: "right",
        height: "29px",
        width: "30px",
        textAlign: "center",
        lineHeight: "29px",
        color: "#2b2b2b",
        cursor: "pointer",
        fontSize: "14px",
        background: "#fff",
        position: "absolute",
        right: "-20px",
        top: "0px"
    },
    y_homeworkCommentTitleClose2: {
        float: "right",
        height: "29px",
        width: "30px",
        textAlign: "center",
        lineHeight: "29px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
        background: "rgb(75, 192, 225)",
        position: "absolute",
        right: "-20px",
        top: "0px"
    },
    y_homeworkCommentStydent: {
        lineHeight: "20px",
        marginTop: "10px",
        paddingLeft: "26px",
        color: "#2b2b2b"
    },
    y_homeworkCommentSelect: {
        marginTop: "10px",
        overflow: "hidden",
        paddingLeft: "20px",
    },
    y_homeworkCommentSelect1: {
        marginLeft: "32px",
        float: "left",
    },
    y_homeworkCommentSelect1Span: {
        float: "left",
        height: "20px",
        width: "44px",
        textAlign: "center",
        lineHeight: "22px",
        display: "block"
    },
    y_homeworkCommentSelect1Select: {
        float: "left",
        boxSizing: "content-box",
        width: "50px",
        height: "20px",
        lineHeight: "20px",
        color: "#656565",
        border: "1px solid #b0b0b0",
        appearance: "none",
        mozAppearance: "none",
        webkitAppearance: "none",
        background: "url(./static/fonts/aa.svg) no-repeat 98% center",
        backgroundSize: "15px 13px",
    },
    y_homeworkCommentSelect1Span2: {
        float: "left",
        height: "20px",
        width: "34px",
        textAlign: "center",
        lineHeight: "22px",
        display: "block"
    },
    y_homeworkCommentSelect2: {
        marginLeft: "32px",
        float: "left",
    },
    y_homeworkCommentSelect2Span: {
        float: "left",
        height: "20px",
        width: "44px",
        textAlign: "center",
        lineHeight: "22px",
        display: "block"
    },
    y_homeworkCommentScoreSpan: {
        height: "20px",
        width: "40px",
        display: "inline-block",
        lineHeight: "24px",
        textAlign: "center",
        float: "left"
    },
    y_homeworkCommentSelect2Select: {
        float: "left",
        boxSizing: "content-box",
        width: "50px",
        height: "20px",
        lineHeight: "20px",
        color: "#656565",
        border: "1px solid #b0b0b0",
        appearance: "none",
        mozAppearance: "none",
        webkitAppearance: "none",
        background: "url(./static/fonts/aa.svg) no-repeat 98% center",
        backgroundSize: "15px 13px",
    },
    y_homeworkCommentSelect2Span2: {
        float: "left",
        height: "20px",
        width: "34px",
        textAlign: "center",
        lineHeight: "22px",
        display: "block"
    },
    y_homeworkCommentTextareaBox: {
        marginTop: "15px",
        marginLeft: "5px",
        overflow: "hidden",
        paddingLeft: "20px",
    },
    y_homeworkCommentTextareaTitle: {
        height: "26px",
        width: "70px",
        display: "block",
        float: "left",
        textAlign: "center",
        lineHeight: "26px",
        color: "#505050",
    },
    y_homeworkCommentTextareaDiv: {
        float: "left",
        width: "392px",
        height: "130px",
        position: "relative"
    },
    y_homeworkCommentTextarea: {
        width: "415px",
        height: "123px",
        resize: "none",
        padding: "3px 10px",
        fontSize: "12px",
        border: "1px solid #f2f2f2",
        outLint: "none"
    },
    y_homeworkCommentTextarea2: {
        width: "415px",
        height: "123px",
        resize: "none",
        padding: "3px 10px",
        fontSize: "12px",
        border: "1px solid #4ac0e0",
        outLint: "none"
    },
    y_homeworkCommentTextareaMsg: {
        position: "absolute",
        bottom: "-10px",
        left: "18px",
        height: "50px",
        zIndex: "100",
        width: "100%",
    },
    y_homeworkCommentTextareaMsgSpan: {
        float: "right",
        color: "#a0a0a0",
        fontSize: "12px",
        height: "40px",
        textAlign: "center",
        lineHeight: "40px"
    },
    y_homeworkCommentEnter: {
        width: "78px",
        height: "30px",
        float: "left",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
        marginLeft: "95px",
        marginTop: "10px",
        border: "1px solid #f6f6f6",
        fontSize: "14px",
        background: "#fff",
        color: "#606060"
    },
    y_homeworkCommentHide: {
        width: "78px",
        height: "30px",
        float: "left",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
        marginLeft: "10px",
        background: "#49c0e0",
        marginTop: "10px",
        border: "1px solid #b4dff0",
        fontSize: "14px",
        color: "#fff"
    }
}

export default styles;
