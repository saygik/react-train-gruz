import React from 'react'
import { PageTemplate } from  '../../shared/containers'


const AsusUI = ({   caption,
                       firstLoad,
                       infoMsg,
                       loading,
                       fetchAll,
                       autoUpdateTime
                   }) =>
    <PageTemplate
        fetchAll={fetchAll}
        firstLoad={firstLoad}
        loading={loading}
        infoMsg={infoMsg}
        autoUpdateTime={autoUpdateTime}
        caption={caption} > Asus component
    </PageTemplate>

export default AsusUI
