import React from 'react';

export default class NavigationBar extends React.Component {
    constructor() {
        super();
        this.state = {
            isFixed: false,
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', function () {
            if ($(window).scrollTop() > 184) {
                $('.z-navigation').addClass('comDiv');
            } else {
                $('.z-navigation').removeClass('comDiv');
            }
        })
    }
    scrollToAnchor(anchorName) {
        this.props.scrollToAnchor(anchorName);
    }
    render() {
        let styles = {
            firstLi: {
                marginLeft: "40px"
            },
        }
        return (
            <div ref="navigation" className="z-navigation z-navigationStudent">
                <div className="z-navigationWrap">
                    <ul>
                        <li style={sessionStorage.getItem("userJudge") == "S" ? styles.firstLi : null} onClick={this.scrollToAnchor.bind(this,'screens')}>专业介绍</li>
                        <li className="kj" onClick={this.scrollToAnchor.bind(this,'screens1')}>专业章节</li>
                    </ul>
                </div>
            </div>
        );
    }
}