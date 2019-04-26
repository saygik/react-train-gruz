import React from 'react'
import { PageTemplate } from './index'

const SpravkaUi = ({ SpravkaTable,
                           firstLoad,
                           infoMsg,
                           loading,
                           stances,
                           selectedStationAndTip,
                           closeExpanded,
                           selectCell,
                           caption,
                           columns,
                           autoUpdateTime,
                           fetchAll}) =>
            <div>
                <PageTemplate
                    fetchAll={fetchAll}
                    firstLoad={firstLoad}
                    loading={loading}
                    infoMsg={infoMsg}
                    autoUpdateTime={autoUpdateTime}
                    caption={caption} >
                    <SpravkaTable selectCell={selectCell}
                                closeExpanded={closeExpanded}
                                selectedStationAndTip={selectedStationAndTip}
                                stances={stances}
                                columns={columns}
                    />
                </PageTemplate>

            </div>

export default SpravkaUi
