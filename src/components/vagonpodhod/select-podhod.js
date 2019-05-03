import React from 'react'
import {Row, Col } from 'react-bootstrap'
import SelectPodhodButton from './select-podhod-button'

const podhods= [{id:2, caption:'на станции'},{id:1, caption:'на ближнем'},{id:0, caption:'на дальнем'}]

const SelectPodhod = ({selectedPodhod, numPodhods, selectCurrentPodhod }) =>

            <Row className="justify-content-md-center m-0 p-0" >
                <Col md={7} lg={6}>
                    <Row className="justify-content-md-center m-0 p-2 ">
                        {podhods.map((item, index) => {
                            return <SelectPodhodButton key={index} selected={selectedPodhod === item.id} num={numPodhods[item.id]} text={item.caption}
                                                       selectCurrentPodhod={selectCurrentPodhod} podhodNumber={item.id}/>

                        })}
                    </Row>
                </Col>
            </Row>

export default SelectPodhod

