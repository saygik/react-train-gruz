import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import Loader from '../../../shared/littleloader'

const AsusPark = ({park, fetchWays, }) => {

    useEffect(() => {
        fetchWays(park.id)
    }, [])

    return <div className={'pt-1'}>
        <div className='d-inline'>
            <div className='position-absolute' style={{left:'25px'}}>
                {park.loading && <Loader/>}
            </div>
            <Button disabled={park.loading && true} variant={park.id===51 ? 'success' :'secondary'} size="sm" style={{width: '40px'}} onClick={()=> fetchWays(park.id)}>
                {park.num}
             </Button>
        </div>
        {park.ways.entrySeq().map(way=>{
            console.log('-way-',way)
        })}
        <div className='d-inline'>

        </div>

    </div>
}
export default AsusPark
