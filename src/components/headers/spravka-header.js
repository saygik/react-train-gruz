import React, {Component} from 'react'
import LittleLoader from "../littleloader"
import {Row, Col} from 'react-bootstrap';

class SpravkaHeader extends Component {
    render() {
        const littleLoader= this.props.loading ? <LittleLoader/> : null;

        return (
            <div>
                <Row className={'gruz-header-height gruz-bg-header-3'} >
                    <Col className="text-left p-1">
                       {littleLoader}
                    </Col>
                    <Col className="text-right">
                        <button type="button" className="close" aria-label="Close" onClick={this.handleCloseFindVagons}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Col>
                </Row>

            </div>
        )
    }
    handleCloseFindVagons=()=>{
        this.props.closeExpanded()
    }

}


export default SpravkaHeader
