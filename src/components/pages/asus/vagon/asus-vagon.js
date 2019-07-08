import React from 'react'

import vagonsImages from '../../../../services/asus-vagons-images'
const AsusVagon = ({vagon}) => {

    return <div className={'d-inline-block dt-4'}>
        <div className="text-center">
            <span style={{fontSize:'10px'}}>{vagon.id_vgn}</span>
        </div>

            <img
                style={{width: '70px'}}
                src={vagonsImages[vagon.rod_v]}
                alt=""/>

    </div>
}
export default AsusVagon
