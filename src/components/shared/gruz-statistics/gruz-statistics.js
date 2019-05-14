import React from 'react'
import GruzStatisticsUI from "./gruz-statistics-ui"
import {connect} from "react-redux"
import {rusName, statisticsSelector, loadingSelector, infoMsgSelector, autoUpdateTimeSelector, fetchAll} from "../../../ducks/gruz-statistics"

const GruzStatistics =(props)=> <div> <GruzStatisticsUI {...props} firstLoad={false} caption={rusName} /> </div>

export default connect(state=>({
    data: statisticsSelector(state),
    loading: loadingSelector(state),
    infoMsg: infoMsgSelector(state),
    autoUpdateTime: autoUpdateTimeSelector(state),
}), {fetchAll})(GruzStatistics)

