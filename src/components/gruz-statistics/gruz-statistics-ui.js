import React, {Component} from 'react'
import { PageTemplate } from  '../containers'
import GruzStatisticPage from './gruz-statistic-page'

class GruzStatisticsUI extends Component {
    render() {
        const {
            caption,
            firstLoad,
            infoMsg,
            loading,
            fetchAll,
            autoUpdateTime,
            data,
        } = this.props

        return (
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
    }
}


export default GruzStatisticsUI
