
import React from 'react';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import styles from './styleStuHomework.js';
import BomoBox from '../../../../teacherComponents/bombBox/bombBox.js'

export default class Homework extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadData: [],
			bombBoxMsg: [], // 弹出框警告信息
			isHidden: true, // 弹框显示消失阀门
			valueID: [],
			userHomeworkLength: 0,
			userHomework: [],
			homeworkID: [],
			homeworkLessonID: [],
			Browser: [],
		}
	}
	componentWillMount() {
		if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
		this.onGool();
	}
	// 判断浏览器类型
	onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }
    // 获取作业信息
	getLessonByAjax(classID) {
        $.llsajax({
            url: "lesson/findLessonById/" + classID,
            type: "POST",
            async: true,
            success: lessonMessage => {
                this.setState({
                    userHomeworkLength: lessonMessage.lesson.userHomework ? lessonMessage.lesson.userHomework.textname : 0,
					userHomework: lessonMessage.lesson.userHomework == null ? [] : lessonMessage.lesson.userHomework,
					homeworkID: lessonMessage.lesson.userHomework == null ? [] : lessonMessage.lesson.userHomework.id,
					homeworkLessonID: lessonMessage.lesson.userHomework == null ? [] : lessonMessage.lesson.userHomework.lesson_id
                });
            }
        });
	}
	componentDidMount() {
		if (window.location.hash.indexOf("&") > 0) {
			this.setState({
				valueID: Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
			});
		} else {
			this.setState({
				valueID: Base64.decode(window.location.hash.split("?")[1].split("=")[1])
			});
		}
	}
	// 根据iframe内容高度设置外部高度
	SetCwinHeight() {
		let iframeid = document.getElementById("homeworkIframe"); //iframe id
		iframeid.height = $("#homeworkIframe").contents().find("body").height() + 100;
	}
	// 显示作业问题列表
	_showQuestionList() {
		return this.props.homeworkList.map((value, key) => {
			return (
				<div style={styles.homeworkList} key={key}>
					<iframe key={key} style={styles.iframeBox} onLoad={this.SetCwinHeight.bind(this)} height="1" id="homeworkIframe" scrolling="no" frameBorder="0" width="100%" src={value.picurl == null ? "" : url.WEBURL + value.picurl}></iframe>
				</div>
			);
		})
	}
	// 图片加载失败显示占位图
	showImgLoad(id) {
		$(".homeworkListPic").eq(id).prop('src', require('../../../../images/public/errorImg.png'));
	}
	// 获取上传文件用户名
	loadTextValue() {
		let textName = this.refs.file.files[0].name;
		this.refs.textname.value = textName;
		this.refs.uploadFileSpanValue.innerHTML = textName;
		document.getElementById("homeworkFlie").style.display = "none";
		document.getElementById("uploadFile").style.display = "block";
	}
	deleteHomework() {
        document.getElementById("homeworkBoxBody").style.display = "none";
		if (window.location.hash.indexOf("&") > 0) {
			this.getLessonByAjaxDelete(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
		} else {
			this.getLessonByAjaxDelete(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
		}
        document.getElementById("homeworkFlie").style.display = "block";
		$('#uploadForm')[0].reset();
		this.props.onLessonUpdate();
	}
	getLessonByAjaxDelete(lessonid) {
		$.llsajax({
			url: "lesson/deletehw",
			data: {
				lessonid: lessonid
			},
			type: 'POST',
			async: false,
			success: deletehwData => {
			}
		})
	}
	//文件上传功能
	OnFile() {
		let formData = new FormData($('#uploadForm')[0]);
		if (this.refs.file.files[0].size < 20971520) {
			$.llsajaxupload({
				url: "lesson/uploadhw",
				data: formData,
				type: 'POST',
				cache: false,
				processData: false,
				contentType: false,
				success: uploadData => {
					this.setState({
						uploadData: uploadData.UserHomework > 15 ? uploadData.UserHomework.substr(0, 15) + "..." : uploadData.UserHomework,
						homeworkID: uploadData.UserHomework.id,
						homeworkLessonID: uploadData.UserHomework.lesson_id
					});
                    document.getElementById("uploadFile").style.display = "none";
                    document.getElementById("homeworkBoxBody").style.display = "block";
				}
			});
		} else {
			this.setState({
				isHidden: !this.state.isHidden,
				bombBoxMsg: "上传文件大小超出20M"
			});
		}
	}
	showHomeworkFlie() {
		$('#uploadForm')[0].reset();
        document.getElementById("homeworkFlie").style.display = "block";
        document.getElementById("uploadFile").style.display = "none";
	}
	// 弹出框取消
	hideClick() {
		this.setState({
			isHidden: !this.state.isHidden
		});
	}
    // getEchartBarXAxisTitle() {
     //    var preBarFontCount = 12;
     //    var insertContent = "\n";
     //    var newTitle = "";
     //    var titleSuf = "";
     //    var title = this.state.userHomeworkLength != 0 ? this.state.userHomework.textname : this.state.uploadData.textname;
     //    if (!!title) {
     //        let rowCount = Math.ceil(title.length / preBarFontCount);
     //        if (rowCount > 1) {
     //            for (var j = 1; j <= rowCount; j++) {
     //                if (j === 1) {
     //                    newTitle += title.substring(0, preBarFontCount) + insertContent;
     //                    titleSuf = title.substring(preBarFontCount);
     //                } else {
     //                    var startIndex = 0;
     //                    var endIndex = preBarFontCount;
     //                    if (titleSuf.length > 12) {
     //                        newTitle += titleSuf.substring(startIndex, endIndex) + insertContent;
     //                        titleSuf = titleSuf.substring(endIndex);
     //                    } else if (titleSuf.length > 0) {
     //                        newTitle += titleSuf.substring(startIndex);
     //                    }
     //                }
     //            }
     //        }
     //    }
     //    return newTitle;
	// }
	render() {
        return (
			<div id="homeworkContent" style={this.props.StuHomeworkStyle ? this.props.StuHomeworkStyle : styles.homeworkContent}>
				<div style={styles.homeworkCaption}>作业与评语</div>
				<div style={styles.homeworkBox}>
					<div style={styles.homeworkBoxTitle}>
						<div style={styles.homeworkBoxLi1}>作业文件</div>
						<div style={styles.homeworkBoxLi2}>成绩</div>
						<div style={styles.homeworkBoxLi3}>教师评语</div>
					</div>
					<table id="homeworkBoxBody" style={this.state.userHomeworkLength != 0 ? styles.homeworkBoxBodyShow : styles.homeworkBoxBodyHide}>
						<tbody>
							<tr style={styles.homeworkBoxBodyTr}>
								<td style={styles.homeworkBoxTextname}>
									<div style={styles.homeworkBoxBodySpan}>{this.state.userHomeworkLength != 0 ? this.state.userHomework.textname : this.state.uploadData.textname}</div>
									<i onClick={this.deleteHomework.bind(this)} style={this.props.score == null ? styles.homeworkBoxBodyIShow : styles.homeworkBoxBodyIHide} className="iconfont icon-SHANCHU- deleteI y_practiceTransform">

									</i>
									<a href={url.WEBURL + "homework/downHw?lessonid=" + this.state.homeworkLessonID + "&homeworkid=" + this.state.homeworkID + "&browser=" + this.state.Browser} style={this.props.score == null ? styles.homeworkBoxBodyDonHide : styles.homeworkBoxBodyDonShow} className="iconfont icon-xiazai y_practiceTransform">

									</a>
								</td>
								<td style={styles.homeworkBoxScore}>{this.state.userHomeworkLength != 0 ? this.state.userHomework.score : ""}</td>
								<td style={styles.homeworkBoxComment}>
									<div style={styles.homeworkBoxCommentMsg}>{this.state.userHomeworkLength != 0 ? this.state.userHomework.comment : ""}</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div id="homeworkFlie" ref="homeworkFlie" style={this.state.userHomeworkLength != 0 ? styles.homeworkFlieHide : styles.homeworkFlieShow}>
						<form id="uploadForm" style={styles.uploadForm}>
							<div style={styles.homeworkInputDiv}>
								<i className="iconfont icon-shangchuan" style={styles.homeworkInputIcon}>

								</i>
								<span style={styles.homeworkInputMsg}>上传文件</span>
							</div>
							<input type="hidden" name="lessonid" value={this.state.valueID} />
							<input id="textname" ref="textname" type="hidden" name="textname" />
							<input disabled={this.props.StuHomeworkStyle ? "disabled" : null} ref="file" className="uploadfile" onChange={this.loadTextValue.bind(this)} id="file" type="file" name="uploadfile" style={styles.homeworkInput} />
						</form>
					</div>
					<div style={styles.uploadFile} id="uploadFile">
						<span style={styles.uploadFileSpan}>
							<i id="uploadFileSpanValue" ref="uploadFileSpanValue">

							</i>
							<i style={styles.uploadFileSpanI} onClick={this.showHomeworkFlie.bind(this)}>-</i>
						</span>
						<i style={styles.uploadFileI} onClick={this.OnFile.bind(this)}>确认</i>
					</div>
					<p style={styles.homeworkMessage}>* 上传文件大小不得超过20MB</p>
				</div>
				<div style={styles.homeworkCaption}>题目</div>
				<div style={styles.homeworkListBox}>
					{this._showQuestionList()}
				</div>
				<BomoBox
					hideClick={this.hideClick.bind(this)}
					isHidden={this.state.isHidden}
					bombBoxMsg={this.state.bombBoxMsg}
				/>
			</div>
		);
	}

}
