import React from 'react'
import LittleLoader from "../littleloader"
import {Row, Col} from 'react-bootstrap';

const SpravkaHeader =({loading, closeExpanded})=>
            <>
                <Row className={'gruz-bg-header-2'} >
                    <Col className="text-left p-0">
                       {loading && <LittleLoader/>}
                    </Col>
                    <Col className="text-right">
                        <button type="button" className="close" aria-label="Close" onClick={closeExpanded}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Col>
                </Row>

            </>

export default SpravkaHeader
