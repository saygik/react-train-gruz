import React from 'react'
import Select from 'react-select'
import {Row, Col } from 'react-bootstrap'

const SelectStantions = ({stantionsOptions, selectedStantion , selectCurrentStantion}) =>
                <Row className="justify-content-md-center m-0 p-2" >
                    <Col md={7}>
                        <Select
                            placeholder={'Выбирайте станцию...'}
                            value={selectedStantion}
                            onChange={(selectedOption) => selectCurrentStantion(selectedOption)}
                            options={stantionsOptions}
                        />
                    </Col>
                </Row>

export default SelectStantions

