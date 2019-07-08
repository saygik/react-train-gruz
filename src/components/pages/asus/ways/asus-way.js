import React from 'react'
import {Badge} from 'react-bootstrap'

const AsusWay = ({way}) => {
    const wayInfo= way.kto_vgn
        ? `/${way.lng_sum}/${way.ves_sum}`
        : ``
    return   <div className='pr-1 d-inline'>
        {/*<div className='position-absolute' style={{left:'25px'}}>*/}
            {/*{park.loading && <Loader/>}*/}
        {/*</div>*/}
        <Badge style={{background: '#b9c7c6', cursor: 'pointer'}} >
            <span style={{fontSize:'12px'}}>
                {way.num_way}
                <span className="text-secondary" style={{fontSize:'12px'}}>
                        {way.kto_vgn && ' ' + way.kto_vgn}
                    {wayInfo}
                </span>
            </span>
        </Badge>
    </div>

}
export default AsusWay
