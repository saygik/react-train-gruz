import React from 'react'
import {Badge} from 'react-bootstrap'

const AsusWay = ({park, way, fetchVagons}) => {
    const wayInfo= way.kto_vgn
        ? `/${way.lng_sum}/${way.ves_sum}`
        : ``
    return   <div className='pr-1 d-inline'>
        <Badge variant={way.expanded ? 'primary' :'secondary'} style={{ cursor: 'pointer'}} onClick={()=> fetchVagons({parkId: park, wayId: way.id})}>
            <span style={{fontSize:'12px'}}>
                {way.num_way}
                <span style={{fontSize:'12px', color: '#dbdad9'}}>
                        {way.kto_vgn && ' ' + way.kto_vgn}
                    {wayInfo}
                </span>
            </span>
        </Badge>

    </div>

}
export default AsusWay
