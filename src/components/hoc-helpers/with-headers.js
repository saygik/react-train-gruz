import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';
import PageHeader from '../headers/PageHeader'

const withHeaders = (firstLoad, caption,  infoMsg, loading) => (View) => {
    return class extends Component {
        render() {
            return   <div >
                <Row  className='m-1'>
                    <Col>
                        <PageHeader loading={loading} infoMsg={infoMsg} caption={caption}/>
                        <Row >
                            <Col className={'p-0'}>
                                {!firstLoad ? <View  /> : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        }
    };
};

export default withHeaders
