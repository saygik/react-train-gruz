import React from 'react'
import Iframe from 'react-iframe'
import { PageTemplate } from  '../containers'

import PropTypes from 'prop-types'

const ExtReportIframe = ({url}) => {
    console.log(url)
    return (
        <PageTemplate
            fetchAll={null}
            firstLoad={null}
            loading={false}
            infoMsg={' '}
            autoUpdateTime={0}
            caption={"КПП"} >
            <div>
                <Iframe  url={url}
                         width="100%"
                         height="800px"
                         id="myId"
                         className="myClassname"
                         display="initial"
                         position="relative"/>
            </div>
        </PageTemplate>

    )
}

ExtReportIframe.propTypes = {}
ExtReportIframe.defaultProps = {}

export default ExtReportIframe