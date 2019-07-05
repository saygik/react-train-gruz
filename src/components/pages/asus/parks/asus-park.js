import React from 'react'
import {Button} from 'react-bootstrap'

const AsusPark = ({park}) => {
    const activePark=false
    return <div className={'pt-1'}>
        <div className='d-inline'>
            <Button variant={park.id===51 ? 'success' :'secondary'} size="sm" style={{width: '40px'}}>
                {park.num}
             </Button>
        </div>
        <div className='d-inline'>
            {activePark ? 'да' : 'нет'}
         </div>
    </div>
}
export default AsusPark
