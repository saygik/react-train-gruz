import React, {Component} from 'react'
import './littleloader.css'

class LittleLoader extends Component {
    render() {
        return (
            <div >
                <div className={'lds-css ng-scope'}>
                    <div  className={'lds-double-ring-l'}>
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

export default LittleLoader
