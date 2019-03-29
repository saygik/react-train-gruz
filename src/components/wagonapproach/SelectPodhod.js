import React, {Component} from 'react'
import {connect} from "react-redux"
import { ButtonGroup, Button } from 'react-bootstrap'
import {moduleName, selectCurrentPodhod, numPodhodsSelector} from "../../ducks/wagonapproach"


class SelectPodhod extends Component {

    render() {
        const {selectedPodhod, numPodhods }= this.props
        return (
            <div>
                   <ButtonGroup aria-label="Basic example">
                       <Button className="mr-1 pl-5 pr-5" variant="secondary"
                                onClick={this.handleSelectPodhodClick.bind(this, 2)}  active={selectedPodhod === 2}><span className={'pr-1'}>на станции</span> <span className={'badge badge-pill badge-light'}>{numPodhods[2]}</span></Button>
                        <Button className="pl-4 pr-4" variant="secondary"
                                onClick={this.handleSelectPodhodClick.bind(this, 1)}  active={selectedPodhod === 1}><span className={'pr-1'}>на ближнем подходе</span> <span className={'badge badge-pill badge-light'}>{numPodhods[1]}</span></Button>
                        <Button className="ml-1 pl-4 pr-4" variant="secondary"
                                onClick={this.handleSelectPodhodClick.bind(this, 0)}  active={selectedPodhod === 0}><span className={'pr-1'}>на дальнем подходе</span> <span className={'badge badge-pill badge-light'}>{numPodhods[0]}</span></Button>
                   </ButtonGroup>
            </div>
        )
    }
    handleSelectPodhodClick =(selectedOption) =>{
        if (this.props.numPodhods[selectedOption]>0) {
            this.props.selectCurrentPodhod(selectedOption)
        }
    }
}

export default connect(state=>({
    selectedPodhod: state[moduleName].selectedPodhod,
    numPodhods: numPodhodsSelector(state),
}), {selectCurrentPodhod})(SelectPodhod)

