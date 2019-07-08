import React, {useEffect} from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import Loader from '../../../shared/littleloader'
import AsusWays from '../ways'

const AsusPark = ({park, fetchWays, }) => {

/*    useEffect(() => {
        fetchWays(park.id)
    }, [])*/

    return <Row className={'pt-1'}>
            <Col sm={1} className='d-inline' style={{width: '40px !important'}}>
                <div className='position-absolute' style={{left:'25px'}}>
                    {park.loading && <Loader/>}
                </div>
                <Button disabled={park.loading && true} variant={park.expanded ? 'success' :'secondary'} size="sm" style={{width: '40px'}} onClick={()=> fetchWays(park.id)}>
                <span className={'font-weight-bold'}>
                    {park.num}
                </span>
                </Button>
            </Col>
            <Col sm={11} className='d-inline'>
                <AsusWays ways={park.ways.valueSeq().toArray()}/>
            </Col>
        </Row>

}
export default AsusPark
