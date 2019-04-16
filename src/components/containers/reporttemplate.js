import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';
import PageHeader from '../headers/page-header'


class ReportTemplate extends Component {
    render() {
        const { firstLoad, caption,  infoMsg, loading, children} = this.props;
        return (
            <div >
                <Row  className='m-1'>
                    <Col>
                        <PageHeader loading={loading} infoMsg={infoMsg} caption={caption}/>
                        <Row >
                            <Col className={'p-0'}>
                                {!firstLoad ? children : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ReportTemplate

