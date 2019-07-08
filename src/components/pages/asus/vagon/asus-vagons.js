import React from 'react'
import AsusVagon from './asus-vagon'

const AsusVagons = ({vagons}) => {
    return <div >
        {vagons.map((vagon)=><AsusVagon key={vagon.ord_num}  vagon={vagon} />)}
    </div>
}
export default AsusVagons
