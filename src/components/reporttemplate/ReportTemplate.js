import React, { Component } from 'react';
import './ReportTemplate.css'

import { Row, Col} from 'react-bootstrap';
import LittleLoader from "../littleloader"


class ReportTemplate extends Component {

    render() {
        const { textHeader,  infoMsg, loading, moduleBody} = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;

        return (
            <div >
                <Row className={'m-3'}>
                    <Col>
                        <Row className={'border rounded-top report-template-header gruz-bg-header-one'}>
                            <Col>
                                <Row className="p-0 report-template-header-2">
                                    <Col  className="pt-2 pl-4 pb-0">
                                        <span className="report-template-header-font">{textHeader}</span>
                                    </Col>
                                    <Col  md={1}  className="d-flex flex-row-reverse p-0">
                                        {littleLoader}
                                    </Col>
                                </Row>
                                <Row className="p-0">
                                    <Col  className="text-right pr-2">
                                        <span  className="font-italic small">{infoMsg}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <Col className='border p-1'>
                                <Row className='p-0 sprav1-header d-inline'>
                                    <Col className='p-0'>
                                            {moduleBody}
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default ReportTemplate

