import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, selectedStantionSelector, numPodhodsFiltredSelector} from "../../ducks/wagonapproach"
import StantionsHeader from "../headers/StantionsHeader"

class PodhodTableHeader extends Component {
    render() {
        const {station,  onStation, numPodhods}= this.props
        const tableHeader=
            (numPodhods>0) ? <StantionsHeader stanName={station.label}
                                                          onStation={onStation}
                                                          tipVagons={'всех'}
                                                          numVagons={numPodhods} />
                                        : null

        return (
            <div>
                {tableHeader}
            </div>
        )
    }}

export default connect(state=>({
    onStation:  state[moduleName].selectedPodhod,
    station: selectedStantionSelector(state),
    numPodhods: numPodhodsFiltredSelector(state)
}), {})(PodhodTableHeader)

