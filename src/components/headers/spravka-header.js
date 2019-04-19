import React, {Component} from 'react'
import LittleLoader from "../littleloader"
import {Row, Col} from 'react-bootstrap';

class SpravkaHeader extends Component {
    render() {
        const littleLoader= this.props.loading ? <LittleLoader/> : null;

        return (
            <div>
                <Row className={'gruz-bg-header-2'} >
                    <Col className="text-left p-0">
                       {littleLoader}
                    </Col>
                    <Col className="text-right">
                        <button type="button" className="close" aria-label="Close" onClick={this.props.closeExpanded}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Col>
                </Row>

            </div>
        )
    }
}


export default SpravkaHeader
