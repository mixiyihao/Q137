
var styles = {
    videoReviewWrap: {
        background: "rgb(244, 244, 245)",
        minHeight: "500px"
    },
    videoReviewBox: {
        height: "500px",
        padding: "0px 150px 0px 230px",
        minHeight: "700px",
    },
    videoReviewBoxTeacherRight: {
        float: "left",
    },
    videoReviewBoxTeacher: {
        // width: "1100px",
        // margin: "auto",
        height: "500px",
        minHeight: "700px",
        position: "relative"
    },
    videoRights: {
        width: "106px",
        height: "28px",
        border: "1px solid #dbdddc",
        background: "#fff",
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "#50c3e2"
        // cursor: "pointer"
    },
    videoRights2: {
        width: "106px",
        height: "28px",
        border: "1px solid #4ec4e2",
        background: "#4ec4e2",
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "#fff"
    },
    videoRightsIconBox: {
        cursor: "pointer",
        width: "102px",
        height: "26px"
    },
    videoRightsIcon: {
        float: "left",
        width: "20px",
        height: "26px",
        lineHeight: "26px",
        textAlign: "center",
        marginLeft: "5px",
        fontSize: "16px"
    },
    videoRightsMsg: {
        float: "left",
        display: "inline-block",
        lineHeight: "26px",
        fontSize: "14px",
        paddingLeft: "5px"
    },
    videoRightsListBoxHide: {
        position: "relative",
        display: "none"
    },
    videoRightsListBoxShow: {
        position: "relative",
        display: "block"
    },
    videoRightsList: {
        position: "absolute",
        minHeight: "150px",
        width: "438px",
        background: "#fff",
        top: "7px",
        right: "0px",
        zIndex: "99",
        boxShadow: "rgba(0, 0, 0, 0.098) 0 0 10px",
        padding: "0 16px"
    },
    videoRightsListBoTriangle: {
        width: "0",
        height: "0",
        borderLeft: "14px solid transparent",
        borderBottom: "10px solid #fff",
        borderRight: "14px solid transparent",
        float: "left",
        position: "absolute",
        left: "42px",
        top: "0px",
        zIndex: "100"
    },
    classItem: {
        height: "50px",
        borderBottom: "1px solid #f5f5f5",
    },
    classItemTitle: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        color: "#5f5f5f",
        display: "inline-block"
    },
    classItemControll: {
        float: "right",
        width: "94px",
        height: "50px",
    },
    classItemControllIcon: {
        float: "left",
        position: "relative",
        display: "inline-block",
        boxSizing: "border-box",
        height: "20px",
        width: "32px",
        lineHeight: "20px",
        verticalAlign: "middle",
        borderRadius: "20px",
        backgroundColor: "#e2e2e2",
        cursor: "pointer",
        WebkitTransition: "all .3s",
        transition: "all .3s",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
        marginTop: "17px"
    },
    classItemControllMsg: {
        float: "left",
        width: "56px",
        marginLeft: "6px",
        display: "inline-block",
        heigt: "50px",
        lineHeight: "50px",
        color: "#606060"
    },
    videoReviewCaption: {
        fontSize: "16px",
        height: "65px",
        lineHeight: "22px",
        textIndent: "11px",
        background: "url(" + require('../../images/leftNavBar/bj_02.gif') + ") no-repeat 0 30px",
        padding: "30px 0 12px 0",
        color: "#606060",
        overflow: "hidden"
    },
    videoReviewShow: {
        marginLeft: "20px",
        marginTop: "10px",
        marginBottom: "20px",
        float: "left",
        borderRight: "1px solid #f2f2f2",
        borderLeft: "1px solid #f2f2f2",
        position: "relative",
        height: "490px",
        width: "540px"
    },
    videoReviewList: {
        width: "327px",
        height: "400px",
        position: "absolute",
        right: "0",
        top: "60px"
    },
    videoReviewListP: {
        display: "block",
        textAlign: "left",
        // textIndent: "17px",
        height: "42px"
        // lineHeight: "42px"
    },
    videoReviewListCache: {
        float: "right",
        display: "inline-block",
        border: "1px solid #fff",
        width: "102px",
        height: "27px",
        textAlign: "center",
        color: "#fff",
        fontSize: "14px",
        lineHeight: "27px",
        marginTop: "3px",
        marginRight: "3px",
        textIndent: "0px",
        cursor: "pointer",
        opacity: "0.5",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    videoReviewListCache2: {
        float: "right",
        display: "inline-block",
        border: "1px solid #fff",
        width: "102px",
        height: "27px",
        textAlign: "center",
        color: "#8f8f8f",
        fontSize: "14px",
        lineHeight: "27px",
        marginTop: "3px",
        marginRight: "3px",
        textIndent: "0px",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    videoReviewListName: {
        cursor: "pointer",
        width: "170px",
        height: "32px",
        display: "inline-block",
        marginLeft: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    videoReviewCenter: {
        background: "#fff",
        overflow: "hidden",
        width: "893px",
        marginTop: "10px"
    },
    videoReviewShowCenter: {
        width: "893px",
        overflow: "hidden",
        position: "relative",
        minHeight: "595px"
    },
    videoReviewListTitle: {
        height: "48px",
        width: "327px",
        background: "#f7f7f7",
        marginBottom: "16px",
        position: "relative"
    },
    videoReviewListTitleI: {
        display: "block",
        color: "#4ac6e7",
        width: "29px",
        float: "left",
        fontSize: "16px"
    },
    videoReviewListTitleSpan: {
        float: "left",
        fontSize: "16px",
        color: "#2f3a48"
    },
    videoReviewListTitleBox: {
        width: "127px",
        height: "27px",
        position: "absolute",
        top: "10px",
        left: "11px",
        bottom: "0",
        borderBottom: "2px solid #4ac6e7"
    },
    videoReviewListSpan: {
        // cursor: "pointer",
        // padding: "6px 9px 6px 9px",
        margin: "0 auto",
        width: "316px",
        display: "inline-block",
        height: "32px",
        lineHeight: "32px",
        // marginLeft: "10px"
    },
    videoReviewListWrap: {
        overflow: "auto",
        height: "426px"
    },
    videoReviewListI: {
        width: "0",
        height: "0",
        borderTop: "7px solid transparent",
        borderRight: "7px solid #4ac6e7",
        borderBottom: "7px solid transparent",
        float: "left",
        position: "absolute",
        left: "-7px",
        top: "10px",
        zIndex: "-1"
    },
    videoReviewListIShow: {
        width: "0",
        height: "0",
        borderTop: "7px solid transparent",
        borderRight: "7px solid #4ac6e7",
        borderBottom: "7px solid transparent",
        float: "left",
        position: "absolute",
        left: "-6px",
        top: "9px",
    },
    videoTitle: {
        marginLeft: "20px",
        height: "44px",
        lineHeight: "44px",
        fontSize: "18px",
        color: "#2f3a48"
    },
    videoReviewShowMsg: {
        width: "100%",
        height: "40px",
        lineHeight: "40px",
        fontSize: "13px",
        background: "#f5f5f5",
        color: "#909090",
        marginTop: "10px",
        // marginBottom: "20px",
        marginLeft: "20px"
    },
    videoReviewShowMsgP: {
        height: "40px",
        lineHeight: "40px",
        paddingLeft: "10px",
        background: "#fde5d1",
        color: "#f48275"
    },
    videoReviewShowMsgA: {
        display: "inline-block",
        fontStyle: "italic",
    },
    videoReviewShow_msg: {
        position: "absolute",
        top: "29px",
        height: "24px",
        left: "0px",
        lineHeight: "24px",
        color: "#b8b8b8",
        fontSize: "14px",
        marginLeft: "10px"
    },
    videoReviewShow_span: {
        height: "24px",
        lineHeight: "24px",
        display: "inline-block",
        width: "73px",
        textAlign: "center",
        color: "#fff",
        background: "#49c0e0",
        cursor: "pointer"
    },
    videoReviewShow_msgHide: {
        display: "none"
    }
}

export default styles;
