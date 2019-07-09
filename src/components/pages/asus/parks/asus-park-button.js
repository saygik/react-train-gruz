import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Loader from '../../../shared/littleloader'

const AsusParkButton = ({park, fetchWays}) => {

    return <>
                <div className='position-absolute' style={{left:'25px'}}>
                    {park.loading && <Loader/>}
                </div>
                <OverlayTrigger
                    placement='right'
                    overlay={
                        <Tooltip id={`tooltip-right`}>
                            {park.id}-{park.name}
                        </Tooltip>
                    }
                >
                    <Button disabled={park.loading && true} variant={park.expanded ? 'primary' :'secondary'} size="sm" style={{width: '40px'}} onClick={()=> fetchWays({parkId: park.id})}>
                        <span className={'font-weight-bold'}>
                            {park.num}
                            </span>
                    </Button>
                </OverlayTrigger>
    </>
}
export default AsusParkButton
