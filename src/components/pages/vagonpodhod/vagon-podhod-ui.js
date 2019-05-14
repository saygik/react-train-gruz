import React from 'react'
import PodhodTable from './podhod-table'
import VagonPodhodSelectors from './vagon-podhod-selectors'
import { ReportTemplate } from '../../shared/containers/index'

const  VagonPodhodUI = ({ caption,
                            loading,
                            infoMsg,
                            firstLoad,
                            stantionsOptions,
                            selectedStantion,
                            selectCurrentStantion,
                            selectedPodhod,
                            numPodhods,
                            selectCurrentPodhod,
                            selectVagon,
                            stantionsPodhod,
                            closeExpanded,
                            selectedVagon ,
                            columns
                        }) =>
            <div>
                <ReportTemplate
                    firstLoad={firstLoad}
                    loading={loading}
                    infoMsg={infoMsg}
                    caption={caption} >
                    <VagonPodhodSelectors  selectedPodhod={selectedPodhod}
                                           numPodhods={numPodhods}
                                           selectCurrentPodhod={selectCurrentPodhod}
                                           stantionsOptions={stantionsOptions}
                                           selectedStantion={selectedStantion}
                                           selectCurrentStantion={selectCurrentStantion}>
                        <PodhodTable columns={columns}
                                     stantionsPodhod={stantionsPodhod}
                                     selectVagon={selectVagon}
                                     selectedVagon={selectedVagon}
                                     closeExpanded={closeExpanded}/>
                    </VagonPodhodSelectors>
                </ReportTemplate>
            </div>

export default VagonPodhodUI
