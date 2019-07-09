import React from 'react'
import AsusVagonImage from './asus-vagon-image'

const AsusVagonPopover = ({vagon}) => {

    return       <div className="p-1" >
                        <strong>Вес:</strong> {vagon.ves_gruz} <br/>
                        <strong>Ст. назначения:</strong> {vagon.destn}<br/>
                        <strong>Груз:</strong> {vagon.cod_gruz}<br/>
                        <strong>Получатель:</strong> {vagon.destn}<br/>
                        <strong>Тип:</strong> {vagon.rod_v}
                        <div className="text-center p-1" >
                            <AsusVagonImage vagonTip={vagon.rod_v} imgWidth={'120px'} />
                        </div>
                    </div>
}
export default AsusVagonPopover

