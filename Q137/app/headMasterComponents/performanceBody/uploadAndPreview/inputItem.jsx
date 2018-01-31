import React from 'react';
export default class Input extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            initValue: '',
            showTag: false,
        }
    }
    componentDidMount() {
        // //console.log(this.props)
        this.setState({
            value: this.props.value,
            initValue: this.props.value
        })
    }
    componentWillReceiveProps(props) {
        // //console.log(props)
        this.setState({
            value: props.value,
            initValue: props.value
        })
    }
    changeHandle(e) {
        var regExp = /\D/
        var str = e.target.value;
        if (regExp.test(str) == true) {
            this.setState({
                value: this.state.initValue,
                showTag: true,
            })

        } else {
            if (0 <= Number(str) && Number(str) <= 100) {
                this.setState({
                    value: e.target.value,
                    // initValue:e.target.value,
                    showTag: false,
                })
                this.props.change(e)
            } else {
                this.setState({
                    value: this.state.initValue,
                    showTag: true,
                })

            }
        }
        var _this =this
        setTimeout(function () {
            _this.setState({

                showTag: false,
            })
        }, 2000)
    }

    render() {
        let showTag = {
            display: this.state.showTag == true ? "block" : "none",
        }
        // //console.log(this.state.value)
        return (
            <div className='inputComp'>
                <input onChange={this.changeHandle.bind(this)} data-id={this.props.id} value={this.state.value} />
                <p style={showTag}>保存失败，超出可修改的分数范围</p>
            </div>
        )
    }
    // componentDidUpdate() {
        
    // }

}