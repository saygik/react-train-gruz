import React from 'react'
import AsusPark from './asus-park'
import {Button} from 'react-bootstrap'

const AsusParks = ({parks, fetchWays, fetchVagons}) => {
    const openAllPark=()=> {
        parks.map((park) => park.tip!==16 && park.tip!==9 && park.tip!==1 && fetchWays({parkId: park.id}))
    }
      return <div>
        <Button variant={'success'} size="sm" style={{width: '40px'}} onClick={()=>openAllPark()} >
            все...
        </Button>
        {parks.map((park)=><AsusPark key={park.id}  park={park} fetchWays={fetchWays} fetchVagons={fetchVagons}/>)}
           </div>
}
export default AsusParks
