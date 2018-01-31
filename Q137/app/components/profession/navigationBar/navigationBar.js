
import React from 'react';

export default class NavigationBar extends React.Component {
    constructor() {
        super();
    }
    scrollToAnchor(anchorName) {
        this.props.scrollToAnchor(anchorName);
    }
    render() {
        let styles = {
            firstLi: {
                marginLeft: "40px"
            }
        }
        return (
            <div ref="navigation" className="z-navigation z-navigationStudent">
                <div className="z-navigationWrap">
                    <ul>
                        <li style={sessionStorage.getItem("userJudge") == "S" ? styles.firstLi : null} onClick={this.scrollToAnchor.bind(this,'screens')}>课程介绍</li>
                        <li className="kj" onClick={this.scrollToAnchor.bind(this,'screens1')}>课程章节</li>
                    </ul>
                </div>
            </div>
        );
    }
}