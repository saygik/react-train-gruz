import React from 'react'
import Vag60 from '../../../../img/60.png'
import vagonsImages from '../../../../services/asus-vagons-images'
const asusVagon = ({vagon}) => {

    return <><img
        style={{width: '50px'}}
        src={vagonsImages[vagon.tip]}
        alt=""/></>
}
export default asusVagon
