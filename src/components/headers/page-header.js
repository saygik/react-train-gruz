import React, {Component} from 'react'
import LittleLoader from "../littleloader"
import {Row, Col} from 'react-bootstrap';

class PageHeader extends Component {
    render() {
         const littleLoader= this.props.loading ? <LittleLoader/> : null;

        return (
            <div  id='Intro'  className={'shadow'}>
                <div className={'pr-2'}>
                <Row className={'gruz-bg-header-3 '} >
                    <Col className="pl-5 pt-0 pb-2 gruz-text-ls " style={{width: '67%'}}>
                        <span className={'align-text-bottom d-block text-truncate '} >
                            {`>${this.props.caption}`}
                      </span>
                    </Col>
                    <Col className="d-flex flex-row-reverse p-1">
                    <span  className='text-right text-nowrap pr-4 pt-2 font-italic gruz-font-70 position-absolute'  style={{color: '#686868'}}>
                        {this.props.infoMsg ? this.props.infoMsg :'Данные отсустсвуют'}
                    </span>
                        <span  className='text-right text-nowrap pr-1 pt-2 font-italic gruz-font-70 position-absolute'  style={{color: '#686868'}}>
                         {littleLoader}
                    </span>

                    </Col>
                </Row>
                </div>
            </div>
        )
    }
    handleCloseFindVagons=()=>{
        this.props.closeExpanded()
    }

}

export default PageHeader
