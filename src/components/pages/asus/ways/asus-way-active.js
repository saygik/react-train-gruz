import React from 'react'
import {Badge} from 'react-bootstrap'
import AsusVagons from '../vagon'

const AsusWayActive = ({park, way, fetchVagons}) => {
    const wayInfo= way.kto_vgn
        ? `/${way.lng_sum}/${way.ves_sum}`
        : ``
    return   <div className={'shadow p-2'}>
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
        <div>
            <AsusVagons vagons={way.vagons.valueSeq().toArray()}/>
        </div>
    </div>

}
export default AsusWayActive
