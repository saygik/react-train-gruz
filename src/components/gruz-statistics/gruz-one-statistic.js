import React, {Component} from 'react'
// import AnimatedNumber from 'react-animated-number'
 import AnimatedNumber from "animated-number-react"
class GruzOneStatistic extends Component {
    formatValue = value => value.toFixed(0);
    render() {
        const {value} = this.props
        return (
            <div>
            <span style={{fontSize: '2.4rem', color: 'grey' }}>
                <AnimatedNumber
                    value={value}
                    formatValue={this.formatValue}
                />
            </span>
            </div>
        )
    }
}

export default GruzOneStatistic
