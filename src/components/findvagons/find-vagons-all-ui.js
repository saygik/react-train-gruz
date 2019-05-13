import React from 'react'
import { PageTemplate } from  '../containers'
import FindVagonsTable from './find-vagons-table'
import FindVagonsFilters from './find-vagons-filters'

const FindVagonsAllUI = ({   caption,
                       firstLoad,
                       infoMsg,
                       loading,
                       fetchAll,
                       data,
                       autoUpdateTime,
                       selectVagon,
                       selectedVagon,
                       closeFindVagonsHistory,
                             selectedStantionTo,
                             selectedStantionToValues,
                             selectStantionTo,
                             selectedClient,
                             selectedClientValues,
                             selectClient,
                             selectedGruzValues,
                             selectedGruz,
                             selectGruz,
                             selectPodhod,
                             selectedPodhod,
                             selectedTipVagons,
                             selectTipVagons,
                             findVagons,
                             selectedVagonKod,
                             selectVagonKod,
                             clearVagonKod,
                       columns
                   }) =>
    <PageTemplate
        fetchAll={fetchAll}
        firstLoad={firstLoad}
        loading={loading}
        infoMsg={infoMsg}
        autoUpdateTime={autoUpdateTime}
        caption={caption} >
        <FindVagonsFilters selectedStantionTo={selectedStantionTo}
                           selectStantionTo={selectStantionTo}
                           selectedStantionToValues={selectedStantionToValues}
                           selectedClient={selectedClient}
                           selectedClientValues={selectedClientValues}
                           selectClient={selectClient}
                           selectedGruzValues={selectedGruzValues}
                           selectedGruz={selectedGruz}
                           selectGruz={selectGruz}
                           selectPodhod={selectPodhod}
                           selectedPodhod={selectedPodhod}
                           selectedTipVagons={selectedTipVagons}
                           selectTipVagons={selectTipVagons}
                           selectedVagonKod={selectedVagonKod}
                           selectVagonKod={selectVagonKod}
                           clearVagonKod={clearVagonKod}
                           findVagons={findVagons}/>
        <FindVagonsTable data={data}
                         selectVagon={selectVagon}
                         selectedVagon={selectedVagon}
                         closeFindVagonsHistory={closeFindVagonsHistory}
                         columns={columns} />
    </PageTemplate>

export default FindVagonsAllUI
