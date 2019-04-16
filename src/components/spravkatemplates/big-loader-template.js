import React, {Component} from 'react'
import BigLoader from "../bigloader"

class BigLoaderTemplate extends Component {
    render() {
        const { firstLoad} = this.props.children.props
        return (
            <div >
                {firstLoad ? <BigLoader/> : this.props.children }
            </div>
        )
    }
}
export default BigLoaderTemplate