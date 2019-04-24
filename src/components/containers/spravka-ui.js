import React, {Component} from 'react'
import { PageTemplate } from './index'

class SpravkaUi extends Component {
    render() {
        const { SpravkaTable,
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
            fetchAll} = this.props
        return (
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
        )
    }
}


export default SpravkaUi
