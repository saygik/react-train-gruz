import React, {Component} from 'react'
import LittleLoader from "../littleloader"
import {Row, Col} from 'react-bootstrap';

class PageHeader extends Component {
    render() {
         const littleLoader= this.props.loading ? <LittleLoader/> : null;

        return (
            <div>
                <Row className={'gruz-bg-header-3'} >
                    <Col className=" p-2 pl-4 gruz-text-ls" style={{width: '85%'}}>
                        <span className={'align-text-bottom d-block text-truncate'}>
                            {this.props.caption}
                      </span>

                    </Col>
                    <Col className="d-flex flex-row-reverse p-1">
                       {littleLoader}
                    </Col>
                </Row>
                <Row >
                    <Col  className='text-right pr-2 font-italic gruz-font-70'  style={{color: '#999999'}}>
                        {this.props.infoMsg ? this.props.infoMsg :'Данные отсустсвуют'}
                    </Col>
                </Row>

            </div>
        )
    }
    handleCloseFindVagons=()=>{
        this.props.closeExpanded()
    }

}

export default PageHeader
