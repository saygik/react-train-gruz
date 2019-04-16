import React, {Component} from 'react'
import SelectPodhod from './select-podhod'
import SelectStantions from './select-stantions'

class VagonPodhodSelectors extends Component {
    render() {
        const { stantionsOptions,
                selectedStantion,
                selectCurrentStantion,
                selectedPodhod,
                numPodhods,
                selectCurrentPodhod,
                children } = this.props
        return (
            <div>
                <SelectPodhod selectedPodhod={selectedPodhod} numPodhods={numPodhods} selectCurrentPodhod={selectCurrentPodhod}/>
                <SelectStantions stantionsOptions={stantionsOptions} selectedStantion={selectedStantion} selectCurrentStantion={selectCurrentStantion}/>
                {children}
            </div>
        )
    }
}
export default VagonPodhodSelectors
