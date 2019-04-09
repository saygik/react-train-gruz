import React, {Component} from 'react'
import {connect} from "react-redux"
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap'
import {moduleName, selectCurrentPodhod, numPodhodsSelector} from "../../ducks/wagonapproach"


class SelectPodhod extends Component {

    render() {
        const {selectedPodhod, numPodhods }= this.props
        return (
            <div>
                <Row className="justify-content-md-center m-0 p-2 " >
                    <Col md={3} sm={3} className={`align-bottom gruz-button-col gruz-bg-header-one m-1 text-center  ${selectedPodhod === 2 ? 'gruz-bg-header-two':'' }`} onClick={this.handleSelectPodhodClick.bind(this, 2)}>
                        <span className={'badge badge-pill badge-light mt-3'}>{numPodhods[2]}</span> <span className={'align-text-bottom d-block text-truncate gruz-font-90'}>на станции</span>
                    </Col>
                    <Col md={3} sm={3} className={`gruz-button-col gruz-bg-header-one m-1 p-1 text-center  ${selectedPodhod === 1 ? 'gruz-bg-header-two':'' }`} onClick={this.handleSelectPodhodClick.bind(this, 1)}>
                        <span className={'badge badge-pill badge-light mt-3'}>{numPodhods[1]}</span> <span className={'align-text-bottom d-block text-truncate gruz-font-90'}>на ближнем подходе</span>
                    </Col>
                    <Col md={3} sm={3} className={`gruz-button-col gruz-bg-header-one m-1 p-1 text-center  ${selectedPodhod === 0 ? 'gruz-bg-header-two':'' }`} onClick={this.handleSelectPodhodClick.bind(this, 0)}>
                        <span className={'badge badge-pill badge-light mt-3'}>{numPodhods[0]}</span><span className={'align-text-bottom d-block text-truncate gruz-font-90'}>на дальнем подходе</span>
                </Col>

                </Row>
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

