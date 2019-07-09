import React from 'react'
import {Badge} from 'react-bootstrap'
import AsusVagons from '../vagon'
import AsusWayProgress from './asus-way-progress'

const AsusWayActive = ({park, way, fetchVagons}) => {
    const wayInfo= way.kto_vgn
        ? `/${way.lng_sum}/${way.ves_sum}`
        : ``
    const badgeColor=way.expanded ? 'primary' :'secondary'
    return   <div className={'shadow mb-2 pt-1 pl-2 pb-1'}>
        <div className={'p-2'}>
            <h4>
            <Badge variant={badgeColor} style={{cursor: 'pointer'}} onClick={()=> fetchVagons({parkId: park.id, wayId: way.id})}>
            <span >
                {park.num}{way.num_way}
                <span style={{color: '#dbdad9'}} >
                        {way.kto_vgn && ' ' + way.kto_vgn}
                    {wayInfo}
                </span>
            </span>
            </Badge>
            </h4>
        </div>
        {!way.empty && <AsusWayProgress name={'Длина'} currentVar={way.lng_sum} staticVar={way.long_way} />}
        {!way.empty && < AsusWayProgress name={'Вес'} currentVar={way.ves_sum} staticVar={way.weight_way} />}

        <div className={'pt-2'}>
            <AsusVagons vagons={way.vagons.valueSeq().toArray()}/>
        </div>
    </div>

}
export default AsusWayActive
