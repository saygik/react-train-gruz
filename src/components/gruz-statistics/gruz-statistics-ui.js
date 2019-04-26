import React from 'react'
import { PageTemplate } from  '../containers'
import GruzStatisticPage from './gruz-statistic-page'

const GruzStatisticsUI =({  caption,
                            firstLoad,
                            infoMsg,
                            loading,
                            fetchAll,
                            autoUpdateTime,
                            data,
                        }) =>(
                <PageTemplate
                    fetchAll={fetchAll}
                    firstLoad={firstLoad}
                    loading={loading}
                    infoMsg={infoMsg}
                    autoUpdateTime={autoUpdateTime}
                    caption={caption} >
                      <GruzStatisticPage data={data}/>
                </PageTemplate>
        )


export default GruzStatisticsUI
