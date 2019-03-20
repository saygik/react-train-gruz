import React, {Component} from 'react'
import './bigloader.css'

class BigLoader extends Component {
    render() {
        return (
            <div className={'centered'}>
                <div className={'lds-css ng-scope'}>
                    <div  className={'lds-double-ring'}>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BigLoader
