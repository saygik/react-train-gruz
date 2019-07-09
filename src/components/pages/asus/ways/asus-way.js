import React from 'react'
import {Badge} from 'react-bootstrap'
import AsusWayProgressSm from './asus-way-progress-sm'

const AsusWay = ({park, way, fetchVagons}) => {
    const wayInfo= way.kto_vgn
        ? `/${way.lng_sum}/${way.ves_sum}`
        : ``
    const badgeColor=way.expanded ? 'primary' :'secondary'
    return    <div className='pr-1 pb-3 d-inline-block'>
        {!way.empty && <AsusWayProgressSm name={'Длина'} currentVar={way.lng_sum} staticVar={way.long_way} />}
        {!way.empty && <AsusWayProgressSm name={'Вес'} currentVar={way.ves_sum} staticVar={way.weight_way} />}
        <Badge variant={badgeColor} style={{ cursor: 'pointer'}} onClick={()=> fetchVagons({parkId: park.id, wayId: way.id})}>
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
