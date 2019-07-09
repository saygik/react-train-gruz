import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {AsusWays,AsusWaysActive} from '../ways'
import AsusParkButton from './asus-park-button'
const AsusPark = ({park, fetchWays, fetchVagons}) => {

    return <>
        <Row className={'pt-1'}>
            <Col sm={1} className='d-inline' style={{width: '40px !important'}}>
                <AsusParkButton park={park} fetchWays={fetchWays} />
            </Col>
            <Col sm={11} className='d-inline'>
                <AsusWays park={{id: park.id, num: park.num}} ways={park.ways.valueSeq().toArray()} fetchVagons={fetchVagons}/>
            </Col>
        </Row>
        <Row className={'pt-1'}>
            <Col sm={1} className='d-inline' style={{width: '40px !important'}}>
            </Col>
            <Col sm={11} className='d-inline'>
                <AsusWaysActive park={{id: park.id, num: park.num}} ways={park.ways.valueSeq().toArray()} fetchVagons={fetchVagons}/>
            </Col>
        </Row>

    </>

}
export default AsusPark
