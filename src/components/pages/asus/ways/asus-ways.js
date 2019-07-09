import React from 'react'
import AsusWay from './asus-way'

const AsusWays= ({ways,park , fetchVagons}) => {
    return  <div className='d-inline'>
            {ways.map(way=> {
                return (<AsusWay key={way.id}  park={park} way={way} fetchVagons={fetchVagons}/>)})
            }
        </div>
}
export default AsusWays
