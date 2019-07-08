import React from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import Loader from '../../../shared/littleloader'
import {AsusWays,AsusWaysActive} from '../ways'

const AsusPark = ({park, fetchWays, fetchVagons}) => {

/*    useEffect(() => {
        fetchWays(park.id)
    }, [])*/

    return <>
        <Row className={'pt-1'}>
            <Col sm={1} className='d-inline' style={{width: '40px !important'}}>
                <div className='position-absolute' style={{left:'25px'}}>
                    {park.loading && <Loader/>}
                </div>
                <Button disabled={park.loading && true} variant={park.expanded ? 'primary' :'secondary'} size="sm" style={{width: '40px'}} onClick={()=> fetchWays({parkId: park.id})}>
                <span className={'font-weight-bold'}>
                    {park.num}
                </span>
                </Button>
            </Col>
            <Col sm={11} className='d-inline'>
                <AsusWays park={park.id} ways={park.ways.valueSeq().toArray()} fetchVagons={fetchVagons}/>
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
