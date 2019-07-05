import React from 'react'
import AsusPark from './asus-park'
const AsusParks = ({parks}) => {
    return <div>
        {parks.map((park)=><AsusPark key={park.id}  park={park}/>)}
           </div>
}
export default AsusParks
