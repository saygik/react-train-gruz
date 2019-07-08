import React from 'react'

import vagonsImages from '../../../../services/asus-vagons-images'
const AsusVagon = ({vagon}) => {

    return <div className={'d-inline-block pb-2'}>
        <div className="text-center pb-0">
            <span style={{fontSize:'10px'}}>{vagon.id_vgn}</span>
        </div>
         <img
                style={{width: '66px'}}
                src={vagonsImages[vagon.rod_v]}
                alt=""/>

    </div>
}
export default AsusVagon
