import React, {Component} from 'react'
import Select from 'react-select'
import {Row, Col } from 'react-bootstrap'

class SelectStantions extends Component {
    render() {
        const {stantionsOptions, selectedStantion }= this.props

        return (
                <Row className="justify-content-md-center m-0 p-2" >
                    <Col md={7}>
                        <Select
                            placeholder={'Выбирайте станцию...'}
                            value={selectedStantion}
                            onChange={this.handleChange}
                            options={stantionsOptions}
                        />
                    </Col>
                </Row>
        )
    }
    handleChange = (selectedOption) => {
        this.props.selectCurrentStantion(selectedOption);
    }
}
export default SelectStantions

