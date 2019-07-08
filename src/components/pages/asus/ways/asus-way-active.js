import React from 'react'
import {Badge} from 'react-bootstrap'
import AsusVagons from '../vagon'
import AsusWayProgress from './asus-way-progress'

const AsusWayActive = ({park, way, fetchVagons}) => {
    const long_way=way.long_way ? way.long_way : 0
    const weight_way=way.weight_way ? way.weight_way : 0
    const lng_sum=way.lng_sum ? way.lng_sum : 0
    const ves_sum=way.ves_sum ? way.ves_sum : 0

    const wayInfo= way.kto_vgn
        ? `/${lng_sum}/${ves_sum}`
        : ``

    return   <div className={'shadow mb-2 pt-1 pl-2 pb-1'}>
        <div className={'p-2'}>
            <h4>
            <Badge variant={way.expanded ? 'primary' :'secondary'} style={{cursor: 'pointer'}} onClick={()=> fetchVagons({parkId: park.id, wayId: way.id})}>
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
        <AsusWayProgress name={'Длина'} currentVar={lng_sum} staticVar={long_way} />
        <AsusWayProgress name={'Вес'} currentVar={ves_sum} staticVar={weight_way} />
        <div className={'pt-2'}>
            <AsusVagons vagons={way.vagons.valueSeq().toArray()}/>
        </div>
    </div>

}
export default AsusWayActive
