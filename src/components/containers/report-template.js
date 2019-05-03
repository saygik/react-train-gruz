import React from 'react';
import { Row, Col} from 'react-bootstrap';
import PageHeader from '../headers/page-header'


const ReportTemplate = ({ firstLoad, caption,  infoMsg, loading, children}) =>
            <>
                <PageHeader loading={loading} infoMsg={infoMsg} caption={caption} />
                <Row  className='m-1'>
                    <Col>
                        <Row >
                            <Col className={'p-0'}>
                                {!firstLoad && children}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>

export default ReportTemplate

