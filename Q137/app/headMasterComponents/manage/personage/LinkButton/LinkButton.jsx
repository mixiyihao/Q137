import React from 'react';
import { Link, hashHistory } from 'react-router';
import './LinkButton.css';

export default class LinkButton extends React.Component {
    constructor() {
        super();
    }
    onLinkTo() {
        const { name, studentno, majorname, classname, schoolname, userid, term, nowTerm, tab,  st, ci } = this.props.obj;
        hashHistory.push({
            pathname: '/OverviewDetail',
            query: {
                n: Base64.encodeURI(name),
                s: Base64.encodeURI(studentno),
                m: Base64.encodeURI(majorname),
                c: Base64.encodeURI(classname),
                l: Base64.encodeURI(schoolname),
                i: Base64.encodeURI(userid),
                t: Base64.encodeURI(term),
                nt: Base64.encodeURI(nowTerm),
                a: this.props.tabID,
                tab: Base64.encodeURI(tab),
                st: st,
                ci: ci,
                gs: this.props.GS || "S"
            },
        })
    }
    render() {
        return (
            <div className="LinkButton_LookBox">
                <a onClick={this.onLinkTo.bind(this)} className="LinkButton_Look button">查看详情</a>
            </div>
        );
    }
}