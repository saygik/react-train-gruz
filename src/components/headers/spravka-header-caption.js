import React, {Component} from 'react'
import parse from 'html-react-parser'

class SpravkaHeaderCaption extends Component {
    render() {
        const headerCaption =(typeof this.props.caption)==='string' ? this.props.caption : ''
        return (
            <div className='p-0'>
                {parse(headerCaption)}
            </div>
        )
    }
}

export default SpravkaHeaderCaption
