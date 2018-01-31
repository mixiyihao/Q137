var styles = {
    shadowItem: {
        // boxShadow: "0px -3px 5px rgba(0,0,0,.1)",
        position: "fixed",
        left: "0px",
        bottom: "0px",
        width: "100%",
        zIndex: "99",
    },
    y_noteBox: {
        position: "relative",
        height: "36px",
        // background: "#fff",
        // borderTop: "4px solid #49c0e0",
        width: "1100px",
        transition: "height 0.5s ease",
        overflow: "hidden",
        margin: "0 auto",
        // boxShadow: "1 -1px 1px 0px rgb(73, 192, 224)"
    },
    y_noteBoxAnimate: {
        position: "relative",
        height: "204px",
        width: "1100px",
        margin: "0 auto",
    },
    y_noteBoxWrap: {
        width: "890px",
        marginLeft: "205px",
        height: "204px",
        boxShadow: "0px -3px 5px rgba(0,0,0,.1)",
        background: "#fff"
    },
    y_noteBoxWrap2: {
        background: "#fff",
        borderTop: "4px solid #49c0e0",
        width: "890px",
    },
    y_spanBox: {
        width: "100%",
        height: "36px",
        position: "relative",

    },
    y_noteBoxTarget: {
        display: "block",
        color: "#1a87fe",
        width: "60px",
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        position: "absolute",
        top: "0",
        right: "20px",
        transition: "right 0.5s ease-in-out",
        cursor:'pointer'
    },
    y_noteBoxTargetAnimate: {
        display: "block",
        color: "#1a87fe",
        width: "60px",
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        position: "absolute",
        top: "0",
        right: "830px",
        cursor:'pointer',
        transition: "right 0.5s ease-in-out"
    },
    y_noteBoxWrite: {
        display: "block",
        color: "#1a87fe",
        width: "42px",
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        position: "absolute",
        top: "0",
        right: "30px",
        transition: "right 0.5s ease-in-out"
    },
    y_noteBoxWriteAnimate: {
        display: "block",
        color: "#1a87fe",
        width: "42px",
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        position: "absolute",
        top: "0",
        right: "679px",
        transition: "right 0.5s ease-in-out"
    },
    y_noteBoxTop: {
        display: "block",
        color: "#1a87fe",
        width: "15px",
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        position: "absolute",
        top: "0",
        right: "1%",
        cursor: "pointer"
    },
    y_noteBoxTargetMsg: {
        width: "354px",
        height: "150px",
        borderRadius: "2px",
        border: "1px solid #d8d8d8",
        marginLeft: "13px",
        float: "left",
        textAlign: "left",
        padding: "5px",
        background: "#fff"
    },
    y_noteBoxWriteMsgBox: {
        width: "890px",
        height: "164px",
        float: "right",
        background: "#fff",
    },
    y_noteBoxWriteMsg: {
        width: "870px",
        height: "164px",
        borderRadius: "2px",
        border: "1px solid #81d3e9",
        float: "right",
        position: "relative",
        marginRight: "10px"
    },
    y_noteBoxWriteMsgCenter: {
        width: "100%",
        height: "123px",
        resize: "none",
        border: "1px solid #fff",
        outLint: "none",
        color: "#606060",
        padding: "5px"
    },
    y_homeworkStatisticsList: {
        minHeight: "148px"
    },
    y_noteBoxWriteMsgEnter: {
        position: "absolute",
        bottom: "8px",
        right: "10px",
        width: "60px",
        height: "30px",
        display: "block",
        border: "1px solid #eee",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer"
    },
    y_noteBoxWriteMsgStyle: {
        position: "absolute",
        bottom: "8px",
        right: "10px",
        width: "60px",
        height: "30px",
        display: "block",
        border: "1px solid #4ac0e0",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
        color: "#4ac0e0"
    },
    notificationBox: {
        position: "fixed",
        zIndex:'99',
        top: "75px",
        right: "30px",
        width: "150px",
        height: "26px",
        textAlign: "center",
        display: "block",
    },
    notificationBoxHide: {
        position: "fixed",
        top: "75px",
        right: "30px",
        width: "150px",
        height: "26px",
        textAlign: "center",
        display: "none",
    },
    notificationCenter: {
        width: "100%",
        height: "100%",
        background: "#f7944d",
        borderRadius: "4px",
        opacity: "1",
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.0980392) 0px 2px 5px"
    },
    notificationCenterAnimate: {
        width: "0%",
        height: "100%",
        background: "#f7944d",
        borderRadius: "4px",
        opacity: "0",
        overflow: "hidden",
        transition: "all 2.5s ease-in-out",
        boxShadow: "rgba(0, 0, 0, 0.0980392) 0px -3px 5px",
        whiteSpace: "nowrap"
    },
    notificationCenterIcon: {
        float: "left",
        display: "block",
        paddingLeft: "2px",
        width: "18px",
        height: "26px",
        textAlign: "center",
        lineHeight: "26px",
        color: "#fff",
        fontSize: "14px"
    },
    notificationCenterMsg: {
        float: "left",
        width: "118px",
        textAlign: "center",
        lineHeight: "26px",
        color: "#fff",
    },
    notificationCenterMsgAnimate: {
        float: "left",
        width: "0px",
        textAlign: "center",
        lineHeight: "26px",
        color: "#fff",
        transition: "all 2.5s ease-in-out",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    buttonHide: {
        display: "none"
    }
}

export default styles;
