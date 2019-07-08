import React from 'react'

import vagonsImages from '../../../../services/asus-vagons-images'
const asusVagon = ({vagon}) => {

    return <><img
        style={{width: '70px'}}
        src={vagonsImages[vagon.tip]}
        alt=""/></>
}
export default asusVagon
