import React from 'react'
import AsusPark from './asus-park'
const AsusParks = ({parks, fetchWays, fetchVagons}) => {
    return <div>
        {parks.map((park)=><AsusPark key={park.id}  park={park} fetchWays={fetchWays} fetchVagons={fetchVagons}/>)}
           </div>
}
export default AsusParks
