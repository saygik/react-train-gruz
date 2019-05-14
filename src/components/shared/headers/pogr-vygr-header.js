import React from 'react'
import parse from 'html-react-parser'

const PogrVygrHeader = ({caption})=>
            <div className='p-2'>
                {parse((typeof caption)==='string' ? caption : '')}
            </div>

export default PogrVygrHeader

