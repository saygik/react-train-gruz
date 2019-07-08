import React from 'react'
import AsusPark from './asus-park'
const AsusParks = ({parks, fetchWays, }) => {
    return <div>
        {parks.map((park)=><AsusPark key={park.id}  park={park} fetchWays={fetchWays} />)}
           </div>
}
export default AsusParks
