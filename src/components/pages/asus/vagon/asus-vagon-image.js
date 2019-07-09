import React from 'react'
import vagonsImages from '../../../../services/asus-vagons-images'

const AsusVagonImage = ({vagonTip, imgWidth}) => {

    return <>
                <img
                    style={{width: imgWidth}}
                    src={vagonsImages[vagonTip]}
                    alt=""/>
    </>
}
export default AsusVagonImage

