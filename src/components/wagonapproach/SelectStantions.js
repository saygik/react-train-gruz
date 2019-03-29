import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {moduleName,  selectCurrentStantion, stantionsOptionsSelector } from "../../ducks/wagonapproach"
import './wagonapproach.css'

class SelectStantions extends Component {
    render() {
        const {stantionsOptions, selectedStantion }= this.props

        return (
            <div>
                        <Select
                            placeholder={'Выбирайте станцию...'}
                            value={selectedStantion}
                            onChange={this.handleChange}
                            options={stantionsOptions}
                        />
            </div>
        )
    }
    handleChange = (selectedOption) => {
        this.props.selectCurrentStantion(selectedOption);
    }
}
export default connect(state=>({
    stantionsOptions: stantionsOptionsSelector(state),
    selectedStantion: state[moduleName].selectedStantion
}), {selectCurrentStantion})(SelectStantions)

