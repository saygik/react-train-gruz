import React, {Component} from 'react'
import ReportTemplate from './ReportTemplate'
import BigLoader from "../bigloader"

class PageTemplate extends Component {
    render() {
        const { firstLoad} = this.props

        return (
            <div >
                {
                    firstLoad
                        ? <BigLoader/>
                        : <ReportTemplate {...this.props}  />
                }
            </div>
        );
    }
}

export default PageTemplate