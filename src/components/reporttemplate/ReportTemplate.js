import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';
import LittleLoader from "../littleloader"


class ReportTemplate extends Component {

    render() {
        const { textHeader,  infoMsg, loading, moduleBody} = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;

        return (
            <div >
                <Row className={'ml-0 mr-0 '}>
                    <Col>
                        <Row className={'border gruz-bg-header-one m-0'}>
                                    <Col  className="pt-2 pl-4 pb-0">
                                        <span className="gruz-font-110">{textHeader}</span>
                                    </Col>
                                    <Col  md={1}  className="d-flex flex-row-reverse p-0">
                                        {littleLoader}
                                    </Col>
                        </Row>
                        <Row className="p-0 m-0">
                            <Col  className="text-right pr-2">
                                <span  className="font-italic gruz-font-70">{infoMsg}</span>
                            </Col>
                        </Row>

                        <Row >
                            <Col className='p-1'>
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

