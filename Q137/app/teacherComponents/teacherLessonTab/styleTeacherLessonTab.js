
var styles = {
    classBoxCenter: {
        position: "relative"
    },
    classBoxFix: {
        position: "fixed",
        left: "0px",
        top: "0px"
    },
    classBoxTab: {
        width:"100%",
        height:"49px",
        background:"#fff",
        minWidth:"1100px",
        position:"relative",
        top:"0px",
        left:"0",
        borderBottom:"1px solid #eee"
    },
    classBoxUlCenterTitle: {
        height: "49px",
        lineHeight: "49px",
        width: "200px",
        background: "#61cae8",
        color: "#fff",
        textIndent: "10px",
        fontSize: "16px",
        float: "left"
    },
    classBoxUlCenter: {
        margin: "auto",
        width: "1100px",
    },
    classBoxUl: {
        width: "656px",
        float: "left",
        height:"49px",
        top:"0",
        left:"0",
        borderBottom: "1px solid #eeeeee",
        boxSizing:"border-box",
        position: "relative",
        marginLeft: "12px"
    },
    classBoxLiShow: {
        width:"130px",
        height:"49px",
        float:"left",
        borderTop: "3px solid transparent",
        lineHeight:"47px",
        textAlign:"center",
        color:"#bababa",
        cursor: "pointer",
        borderLeft: "1px solid transparent",
        borderRight: "1px solid transparent",
        MozUserSelect: "none", /*火狐*/
        WebkitUserSelect: "none", /*webkit浏览器*/
        msUserSelect: "none", /*IE10*/
        khtmlUserSelect: "none", /*早期浏览器*/
        userSelect: "none",
    },
    classBoxLiHide1: {
        display: "none"
    },
    classBoxSpan: {
        float:"right",
        color:"#e6e6e6",
        fontWeight:"100",
        fontSize:"18px"
    },
    addStyleLi: {
        width:"130px",
        height:"49px",
        float:"left",
        borderTop: "3px solid #49c0e0",
        lineHeight:"48px",
        textAlign:"center",
        color: "#616161",
        cursor: "pointer",
        borderLeft: "1px solid #eee",
        borderRight: "1px solid #eee",
        background: "#f3f6fa",
        borderBottom: "1px solid transparent",
        MozUserSelect: "none", /*火狐*/
        WebkitUserSelect: "none", /*webkit浏览器*/
        msUserSelect: "none", /*IE10*/
        khtmlUserSelect: "none", /*早期浏览器*/
        userSelect: "none",
    },
    addStyleLiRight: {
        width:"120px",
        height:"30px",
        lineHeight:"30px",
        textAlign:"center",
        cursor: "pointer",
        background: "#4ac0e0",
        MozUserSelect: "none", /*火狐*/
        WebkitUserSelect: "none", /*webkit浏览器*/
        msUserSelect: "none", /*IE10*/
        khtmlUserSelect: "none", /*早期浏览器*/
        userSelect: "none",
        display: "inline-block",
        float: "right",
        marginTop: "9px",
        color: "#fff",
        padding: 0,
    },
    examRights: {
        width: "106px",
        height: "30px",
        border: "1px solid #dbdddc",
        background: "#fff",
        float: "right",
        color: "#50c3e2",
        marginTop: "9px",
        marginRight: "5px",
    },
    examRights2: {
        width: "106px",
        height: "30px",
        border: "1px solid #4ec4e2",
        background: "#4ec4e2",
        float: "right",
        color: "#fff",
        marginTop: "9px",
        marginRight: "5px",
    },
    examRightsIconBox: {
        cursor: "pointer",
        width: "102px",
        height: "28x",
    },
    examRightsIconBoxG: {
        cursor: "pointer",
        width: "102px",
        height: "28x",
        color: "#dbdddc",
        // opacity: "0.6",
        // filter: "alpha(opacity=60)"
    },
    examRightsIcon: {
        float: "left",
        width: "20px",
        height: "28px",
        lineHeight: "28px",
        textAlign: "center",
        marginLeft: "5px",
        fontSize: "16px"
    },
    examRightsIconG: {
        float: "left",
        width: "20px",
        height: "28px",
        lineHeight: "28px",
        textAlign: "center",
        marginLeft: "5px",
        fontSize: "16px",
        color: "rgb(219, 221, 220)"
    },
    examRightsMsg: {
        float: "left",
        display: "inline-block",
        lineHeight: "28px",
        fontSize: "14px",
        paddingLeft: "5px"
    },
    examRightsMsgG: {
        float: "left",
        display: "inline-block",
        lineHeight: "28px",
        fontSize: "14px",
        paddingLeft: "5px",

    },
    examRightsListBoxShow: {
        position: "relative",
        display: "block"
    },
    examRightsListBoxHide: {
        position: "relative",
        display: "none"
    },
    examRightsListBoTriangle: {
        width: "0",
        height: "0",
        borderLeft: "14px solid transparent",
        borderBottom: "10px solid #fff",
        borderRight: "14px solid transparent",
        float: "left",
        position: "absolute",
        left: "42px",
        top: "25px",
        zIndex: "100"
    },
    examRightsList: {
        position: "absolute",
        minHeight: "150px",
        width: "438px",
        background: "#fff",
        top: "35px",
        right: "0px",
        zIndex: "99",
        boxShadow: "rgba(0, 0, 0, 0.098) 0 0 10px",
        padding: "0 16px"
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
};

export default styles;
