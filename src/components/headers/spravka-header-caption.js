import React from 'react'
import parse from 'html-react-parser'

const SpravkaHeaderCaption = ({caption})=>
            <div className='p-0'>
                {parse((typeof caption)==='string' ? caption : '')}
            </div>

export default SpravkaHeaderCaption
