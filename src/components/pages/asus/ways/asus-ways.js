import React from 'react'
import AsusWay from './asus-way'

const AsusWays= ({ways}) => {
    return  <div className='d-inline'>
            {ways.map(way=> {
                return (<AsusWay key={way.id}  way={way} />)})
            }

        </div>
}
export default AsusWays
