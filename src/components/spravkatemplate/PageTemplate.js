import React, {Component} from 'react'
import ReportTemplate from './ReportTemplate'
import BigLoader from "../bigloader"

class PageTemplate extends Component {
    render() {
        const { firstLoad, loading, infoMsg, caption, moduleBody} = this.props
        return (
            <div >
                {
                firstLoad
                        ? <BigLoader/>
                        : <ReportTemplate
                            firstLoad={firstLoad}
                            loading={loading}
                            infoMsg={infoMsg}
                            caption={caption}
                            moduleBody={moduleBody}
                           />
                }
            </div>
        );
    }
}

export default PageTemplate