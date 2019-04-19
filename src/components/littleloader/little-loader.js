import React, {Component} from 'react'

class LittleLoader extends Component {
    render() {
        return (
            <div >
                <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default LittleLoader
