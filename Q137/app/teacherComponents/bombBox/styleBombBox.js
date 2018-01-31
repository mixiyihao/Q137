var styles = {
    y_bombBox: {
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "10000",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)"
    },
    y_bombBoxCenter: {
        position: "fixed",
        top: "100px",
        left: "50%",
        zIndex: "9999",
        width: "412px",
        height: "228px",
        background: "#fff",
        border: "1px solid #eee",
    },
    y_bombBoxTitle: {
        height: "31px",
    },
    y_bombBoxTitleClose: {
        width: "30px",
        height: "30px",
        float: "right",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
        background: "#fff",
        color: "black",
        fontSize: "12px"
    },
    y_bombBoxTitleClose2: {
        width: "30px",
        height: "30px",
        float: "right",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
        background: "rgb(75, 192, 225)",
        color: "#fff",
        fontSize: "12px"
    },
    y_bombBoxMsg: {
        height: "120px",
        textAlign: "center",
        lineHeight: "170px",
        background: "url(" + require('../../images/search/error.png') + ") no-repeat center 20px",
        backgroundSize: "50px 50px"
    },
    y_bombBoxMsgP: {
        fontSize: "16px",
        color: "#333"
    },
    y_bombBoxTools: {
        height: "80px",
    },
    y_bombBoxToolsDetermine: {
        float: "left",
        cursor: "pointer",
        width: "106px",
        height: "32px",
        border: "1px solid #e8e8e8",
        textAlign: "center",
        lineHeight: "32px",
        fontSize: "14px",
        marginLeft: "150px",
        color: "#606060"
    },
    y_bombBoxToolsCancel: {
        float: "left",
        cursor: "pointer",
        width: "106px",
        height: "32px",
        textAlign: "center",
        lineHeight: "32px",
        background: "#49c0e0",
        border: "1px solid #49c0e0",
        color: "#fff",
        fontSize: "14px",
        marginLeft: "150px"
    }
}

export default styles;
