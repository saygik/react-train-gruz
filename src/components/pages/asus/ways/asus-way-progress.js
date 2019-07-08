import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const AsusWayProgress = ({name,currentVar,staticVar}) => {
    const progressVar=staticVar>0 ? currentVar/staticVar*100 : 0

    return  <div className={'p-1'}>
        <ProgressBar striped variant={getColorByValue(progressVar)} now={progressVar} label={`${name}: ${currentVar}/${staticVar}`} />
    </div>

}
const   getColorByValue = (value)=>{
    let lngColor='success'
    if (value>75)   lngColor='warning'
    if (value>=100) lngColor='danger'
    return lngColor
}
export default AsusWayProgress
