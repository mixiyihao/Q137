import React from 'react'
import './layout.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Layout extends React.Component {
    render () {
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="react-container"
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname} className={this.props.location.pathname}>
                    {this.props.children}
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}