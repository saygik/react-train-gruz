import React, {Component} from 'react'
import {connect} from "react-redux"
// import {moduleName,
//         rusName,
//         actions as moduleActions,
//         selectedStationAndTipSelector,
//          } from '../../ducks/spravka1'
import spravka1Duck from  './sprav-duck'
import Sprav1Table from "./Sprav1Table"
import ReportTemplate from '../spravkatemplate/ReportTemplate'
import DataTemplate from '../spravkatemplate/DataTemplate'
import BigLoaderTemplate from '../spravkatemplate/BigLoaderTemplate'
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)
const spravDuck = spravka1Duck
class Spravka1 extends Component {
    render() {
        const { firstLoad,
                infoMsg,
                loading,
                stances,
                selectedStationAndTip,
                closeExpanded,
                selectCell,
                fetchAll} = this.props
        return (
            <div>
                <DataTemplate fetchAll={fetchAll} >
                    <BigLoaderTemplate>
                        <ReportTemplate
                            firstLoad={firstLoad}
                            loading={loading}
                            infoMsg={infoMsg}
                            caption={rusName} >
                                <Sprav1Table selectCell={selectCell}
                                             closeExpanded={closeExpanded}
                                             selectedStationAndTip={selectedStationAndTip}
                                             stances={stances}
                                             columns={columns}
                                />
                        </ReportTemplate>
                    </BigLoaderTemplate>
                </DataTemplate>
            </div>
        )
    }
}

export default connect(state=>({
    loading: state[spravDuck.moduleName].loading,
    firstLoad: state[spravDuck.moduleName].firstLoad,
    infoMsg: state[spravDuck.moduleName].infoMsg,
    selectedStationAndTip: spravDuck.selectedStationAndTipSelector(state),
    stances: state[spravDuck.moduleName].entities
}), spravDuck.moduleActions)(Spravka1)
