import React, {Component} from 'react'
import parse from 'html-react-parser'

class PogrVygrHeader extends Component {
    render() {
        const headerCaption =(typeof this.props.caption)==='string' ? this.props.caption : ''
        return (
            <div className='p-2'>
                {parse(headerCaption)}
            </div>
        )
    }
}
export default PogrVygrHeader

