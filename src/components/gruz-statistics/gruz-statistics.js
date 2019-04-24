import React, {Component} from 'react'
import GruzStatisticsUI from "./gruz-statistics-ui"
import {connect} from "react-redux"
import {rusName, statisticsSelector, loadingSelector, infoMsgSelector, autoUpdateTimeSelector, fetchAll} from "../../ducks/gruz-statistics"


class GruzStatistics extends Component {
    render() {
        return (
            <div>
                <GruzStatisticsUI {...this.props} firstLoad={false} caption={rusName} />
            </div>
        )
    }
}

export default connect(state=>({
    data: statisticsSelector(state),
    loading: loadingSelector(state),
    infoMsg: infoMsgSelector(state),
    autoUpdateTime: autoUpdateTimeSelector(state),
}), {fetchAll})(GruzStatistics)

