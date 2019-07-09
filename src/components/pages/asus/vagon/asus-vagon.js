import React from 'react'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import AsusVagonPopover from './asus-vagon-popover'
import AsusVagonImage from './asus-vagon-image'


const AsusVagon = ({vagon}) => {
const vagonPopover =  <Popover id="popover-basic" title={vagon.id_vgn}>
                    <AsusVagonPopover vagon={vagon}/>
                 </Popover>

    return <div className={'d-inline-block pb-2'}>
        <OverlayTrigger placement={'top'}  overlay={vagonPopover} >
            <div>
                <div className="text-center pb-0">
                    <span style={{fontSize:'10px'}}>
                        {vagon.id_vgn}
                    </span>
                </div>
                <AsusVagonImage vagonTip={vagon.rod_v} imgWidth={'66px'} />
            </div>
        </OverlayTrigger>

    </div>
}
export default AsusVagon

