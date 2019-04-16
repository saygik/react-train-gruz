import React, {Component} from 'react'
import {connect} from "react-redux"
import {Sprav1DuckProps, Sprav2DuckProps, Sprav31DuckProps} from  '../../ducks'
import { BigLoaderTemplate, DataTemplate, ReportTemplate } from  '../containers'
import ErrorIndicator from '../error-indicator'
import tablesColumns from '../../services/tablesColumns'


const spravka = (spravkaName) => (SpravTable) =>  {

    const selectDuck = (Name) => {
        switch (Name) {
            case 'spravka1':
                return Sprav1DuckProps
            case 'spravka2':
                return Sprav2DuckProps
            case 'spravka31':
                return Sprav31DuckProps
            default:
                return null
        }
    }
    const spravDuck = selectDuck(spravkaName)

    if (!spravDuck) return ErrorIndicator
    const columns =tablesColumns(spravDuck.moduleName)


    const sprav= class extends Component {
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
                                caption={spravDuck.rusName} >
                                <SpravTable selectCell={selectCell}
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

    return connect(state=>({
        loading: state[spravDuck.moduleName].loading,
        firstLoad: state[spravDuck.moduleName].firstLoad,
        infoMsg: state[spravDuck.moduleName].infoMsg,
        selectedStationAndTip: spravDuck.selectedStationAndTipSelector(state),
        stances: state[spravDuck.moduleName].entities
    }), spravDuck.actions)(sprav)

}

export default spravka