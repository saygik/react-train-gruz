import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const AsusWayProgressSm = ({name,currentVar,staticVar}) => {
    const progressVar=staticVar>0 ? currentVar/staticVar*100 : 0

    return  <div className={'progress-sm'} style={{padding:'2px'}}>
        <ProgressBar variant={getColorByValue(progressVar)} now={progressVar} />
    </div>

}
const   getColorByValue = (value)=>{
    let lngColor='success'
    if (value>75)   lngColor='warning'
    if (value>=100) lngColor='danger'
    return lngColor
}
export default AsusWayProgressSm
