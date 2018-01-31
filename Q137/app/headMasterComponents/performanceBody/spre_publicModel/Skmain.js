import React from 'react';
import SkItem from './SkItem.js';
export default class Skmain extends React.Component {
    constructor() {
        super();
    }
    render() {
       
        return (
            <div>
                {
                    this.props.ObjSpro.map((todo, index) => {
                        return <SkItem key={index} {...todo}
                            index={index} {...this.props}
                            isSave={this.props.isSave}
                            listconfig={this.props.listconfig}
                        />
                    })
                }
            </div>
        );
    }
}