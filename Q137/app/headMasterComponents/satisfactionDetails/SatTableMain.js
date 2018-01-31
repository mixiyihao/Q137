import React from 'react';
import SatTable from './SatTable.js';

export default class SatTableMain extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {
                    this.props.ObjInit.map((value, index) => {
                        return (
                            <SatTable key={index} {...value}
                                      {...this.props} index={index}
                            />

                        )
                    })
                }
            </div>

        )
    }
}