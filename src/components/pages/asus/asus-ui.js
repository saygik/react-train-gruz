import React from 'react'
import { PageTemplate } from  '../../shared/containers'
//import AsusVagon from './vagon'
import AsusParks from './parks'

const AsusUI = ({   caption,
                       firstLoad,
                       infoMsg,
                       loading,
                       fetchAll,
                       autoUpdateTime,
                       fetchWays,
                       fetchVagons,
                       parks
                   }) =>
    <PageTemplate
        fetchAll={fetchAll}
        firstLoad={firstLoad}
        loading={loading}
        infoMsg={infoMsg}
        autoUpdateTime={autoUpdateTime}
        caption={caption} >
        <AsusParks parks={parks} fetchWays={fetchWays} fetchVagons={fetchVagons}/>
        {/*<AsusVagon vagon={{number: '12345678', tip: '10'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '20'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '20'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '40'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '60'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '70'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '87'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '87'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '87'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '87'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '92'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '96'}} />*/}
        {/*<AsusVagon vagon={{number: '12345678', tip: '93'}} />*/}
    </PageTemplate>

export default AsusUI
