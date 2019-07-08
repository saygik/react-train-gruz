import React from 'react'
import {Badge} from 'react-bootstrap'

const AsusWay = ({way}) => {
    const wayInfo= way.kto_vgn
        ? ` ${way.lng_sum}/${way.ves_sum}/`
        : ``
    return   <div className='pl-5  pr-1'>
        {/*<div className='position-absolute' style={{left:'25px'}}>*/}
            {/*{park.loading && <Loader/>}*/}
        {/*</div>*/}
        <Badge style={{background: '#b9c7c6', cursor: 'pointer'}} >
            <span style={{fontSize:'12px'}}>
                {way.id}
                <span className="text-secondary" style={{fontSize:'12px'}}>
                    {wayInfo}
                    <span className="text-dark">
                    {way.kto_vgn && way.kto_vgn}
                </span>
                </span>
            </span>
        </Badge>
    </div>

}
export default AsusWay
