import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import Loader from '../../../shared/littleloader'
import AsusWays from '../ways'

const AsusPark = ({park, fetchWays, }) => {

    useEffect(() => {
        fetchWays(park.id)
    }, [])

    return <div className={'pt-1'}>
        <div className='d-inline pr-1'>
            <div className='position-absolute' style={{left:'25px'}}>
                {park.loading && <Loader/>}
            </div>
            <Button disabled={park.loading && true} variant={park.id===51 ? 'success' :'secondary'} size="sm" style={{width: '40px'}} onClick={()=> fetchWays(park.id)}>
                <span className={'font-weight-bold'}>
                    {park.num}
                </span>
             </Button>
        </div>
        <AsusWays ways={park.ways.valueSeq().toArray()}/>
    </div>
}
export default AsusPark
