import React from 'react'
import AnimatedNumber from "animated-number-react"

const GruzOneStatistic =({value})=>(
            <div>
            <span style={{fontSize: '2.4rem', color: 'grey' }}>
                <AnimatedNumber
                    value={value}
                    formatValue={value => value.toFixed(0)}
                />
            </span>
            </div>
        )
export default GruzOneStatistic
