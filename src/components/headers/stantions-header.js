import React, {Component} from 'react'
import parse from 'html-react-parser'
class StantionsHeader extends Component {
    render() {
        const {stanName, onStation, tipVagons, numVagons,stanPOName}= this.props
        const stanPO = stanPOName!=='' ? (` <small>(на станции ${stanPOName})</small>`) : ``
        const podhods=[`На дальнем подходе${stanPO} к станции`, `На ближнем подходе${stanPO} к станции`, 'На станции']
        const topText= `${podhods[onStation]} <span class="badge badge-secondary">${stanName}</span> `+
            `найдено <span class="text-primary">${tipVagons}</span> вагонов: <span class="badge badge-pill badge-success">${numVagons}</span>`;

        return (
            <div>
                {parse(topText)}
            </div>
        )
    }
}

export default StantionsHeader
