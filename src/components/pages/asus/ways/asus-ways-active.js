import React from 'react'
import AsusWayActive from './asus-way-active'

const AsusWaysActive= ({ways,park , fetchVagons}) => {
    return  <div className='d-inline'>
        {ways.filter(way=>way.expanded).map(way=> {
            return (<AsusWayActive key={way.id}  park={park} way={way} fetchVagons={fetchVagons}/>)})
        }

    </div>
}
export default AsusWaysActive
