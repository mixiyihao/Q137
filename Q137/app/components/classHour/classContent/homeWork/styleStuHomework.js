
var styles = {
    homeworkContent: {
        padding: "0px 0 20px 230px",
        background: "#f4f4f5",
        minHeight: "80vh",
    },
    homeworkCaption: {
        fontSize: "16px",
        height: "45px",
        lineHeight: "22px",
        textIndent: "11px",
        background: "url(" + require('../../../../images/leftNavBar/bj_02.gif') + ") no-repeat 0 10px",
        padding: "10px 0 12px 0",
        color: "#606060",
        width: "120px"
    },
    homeworkListBox: {
        paddingLeft: "12px",
        width: "1025px"
    },
    homeworkList: {
        width: "1013px",
        marginBottom: "13px",
        color: "#5f5f5f",
        background: "#fff",
        padding: "20px",
        // marginLeft: "40px"
    },
    homeworkBox: {
        padding: "20px",
        backgroundColor: "#fff",
        width: "1013px",
        marginLeft: "12px"
    },
    homeworkBoxTitle: {
        height: "43px",
        lineHeight: "43px",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1",
        borderBottom: "1px solid #f1f1f1"
    },
    homeworkBoxLi1: {
        float: "left",
        lineHeight: "41px",
        paddingLeft: "20px",
        width: "282px",
        borderLeft: "1px solid #e4e4e4",
    },
    homeworkBoxLi2: {
        float: "left",
        lineHeight: "41px",
        paddingLeft: "20px",
        width: "139px",
        borderLeft: "1px solid #e4e4e4",
    },
    homeworkBoxLi3: {
        float: "left",
        lineHeight: "41px",
        paddingLeft: "20px",
        width: "450px",
        borderLeft: "1px solid #e4e4e4",
    },
    homeworkFlieShow: {
        height: "49px",
        lineHeight: "49px",
        borderLeft: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1",
        borderBottom: "1px solid #f1f1f1",
        display: "block"
    },
    homeworkFlieHide: {
        height: "49px",
        lineHeight: "49px",
        borderLeft: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1",
        borderBottom: "1px solid #f1f1f1",
        display: "none"
    },
    homeworkInput: {
        marginLeft: "10px",
        lineHeight: "normal",
        opacity: "0",
        position: "absolute",
        zIndex: "1",
        height: "48px",
        cursor: "pointer"
    },
    homeworkInputDiv: {
        position: "absolute",
        height: "48px",
        lineHeight: "48px",
        cursor: "pointer",
        marginLeft: "36px",
        cursor: "pointer"
    },
    homeworkButton: {
        float: "right",
        cursor: "pointer"
    },
    homeworkBoxBodySpan: {
        float: "left",
        width: "210px",
        lineHeight: "20px",
        padding: "5px 15px",
        wordBreak: "break-all"
        // height: "49px",
        // whiteSpace:"nowrap",
        // overflow:"hidden",
        // textOverflow:"ellipsis",
    },
    homeworkBoxBodyIShow: {
        color: "#41bfe5",
        // display: "block",
        width: "17px",
        // float: "left",
        marginLeft: "7px",
        marginTop: "2px",
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        // transform: "translate(0,-50%)",
        // OTransform: "translate(0,-50%)",
        // msTransform: "translate(0,-50%)",
        // MozTransform: "translate(0,-50%)",
        // WebkitTransform: "translate(0,-50%)",
    },
    homeworkBoxBodyDonShow: {
        color: "#41bfe5",
        // display: "block",
        width: "17px",
        // float: "left",
        marginLeft: "6px",
        cursor: "pointer",
        position: "absolute",
        top: "50%",
    },
    homeworkBoxBodyDonHide: {
        display: "none"
    },
    homeworkBoxBodyIHide: {
        display: "none",
    },
    uploadFile: {
        height: "49px",
        display: "none",
        borderLeft: "1px solid rgb(241, 241, 241)",
        borderRight: "1px solid rgb(241, 241, 241)",
        borderBottom: "1px solid rgb(241, 241, 241)",
    },
    homeworkBoxTextname: {
        paddingLeft: "20px",
        width: "282px",
        color: "#343537",
        minHeight: "49px",
        verticalAlign: "middle",
        position: "relative"
    },
    homeworkBoxScore: {
        paddingLeft: "20px",
        width: "139px",
        color: "#343537",
        minHeight: "49px",
        verticalAlign: "middle"
    },
    homeworkBoxComment: {
        minHeight: "49px",
        // float: "left",
        width: "480px",
        color: "#343537",
        textAlign: "center",
        lineHeight: "50px",
        verticalAlign: "middle"
    },
    homeworkBoxCommentMsg: {
        textAlign: "left",
        padding: "5px 15px",
        lineHeight: "20px"
    },
    homeworkBoxBodyShow: {
        position: "relative",
        minHeight: "49px",
        lineHeight: "49px",
        borderLeft: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1",
        borderBottom: "1px solid #f1f1f1",
        display: "block",
        overflow: "hidden",

    },
    homeworkBoxBodyHide: {
        minHeight: "49px",
        // lineHeight: "49px",
        borderLeft: "1px solid #f1f1f1",
        borderRight: "1px solid #f1f1f1",
        borderBottom: "1px solid #f1f1f1",
        display: "none"
    },
    homeworkBoxBodyTr: {
        verticalAlign: "middle"
    },
    uploadFileSpan: {
        float: "left",
        minWidth: "30px",
        height: "24px",
        lineHeight: "24px",
        background: "#8ce2f3",
        color: "#fff",
        borderRadius: "24px",
        padding: "0 5px 0 5px",
        marginTop: "12px",
        marginLeft: "21px",
        position: "relative"
    },
    uploadFileSpanI: {
        position: "absolute",
        display: "block",
        width: "14px",
        height: "14px",
        borderRadius: "100%",
        background: "#f30000",
        color: "#fff",
        textAlign: "center",
        lineHeight: "14px",
        fontWeight: "bold",
        right: "-2px",
        top: "-7px",
        cursor: "pointer"
    },
    uploadFileI: {
        display: "block",
        float: "left",
        width: "56px",
        height: "27px",
        textAlign: "center",
        lineHeight: "28px",
        color: "#fff",
        marginTop: "10px",
        marginLeft: "6px",
        background: "#00c6dc",
        border: "1px solid #46a8b1",
        cursor: "pointer"
    },
    homeworkListPic: {
        marginLeft: "30px",
        marginTop: "20px",
        width: "500px",
    },
    homeworkListPicHide: {
        display: "none"
    },
    homeworkMessage: {
        height: "30px",
        lineHeight: "30px",
        color: "red",
        fontSize: "12px",
        textAlign: "left"
    },
    inputFile: {
        width: "30px",
        height: "20px"
    },
    uploadForm: {
        // paddingTop: "10px"
        height: "48px",
        lineHeight: "48px"
    },
    homeworkInputIcon: {
        float: "left",
        fontSize: "20px"
    },
    homeworkInputMsg: {
        float: "left",
        marginLeft: "15px"
    },
    homeworkBoxComp: {
        display: "block",
        position: "absolute",
        top: "36px",
        right: "42px",
        width: "450px",
        height: "144px",
        background: "#fff",
        border: "1px solid #00a2f7",
        zIndex: "100",
        lineHeight: "15px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0px 0px 2px 0px #00a2f5"
    },
    homeworkBoxCompHide: {
        display: "none"
    }
}

export default styles;
