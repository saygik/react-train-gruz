import React, {Component} from 'react'
import { BigLoaderTemplate, DataTemplate, ReportTemplate } from  './'

class PageTemplate extends Component {
    render() {
        const { caption,
            firstLoad,
            infoMsg,
            loading,
            fetchAll,
            autoUpdateTime,
            children
        } = this.props
        return (
            <DataTemplate fetchAll={fetchAll} autoUpdateTime={autoUpdateTime ? autoUpdateTime : null}>
                <BigLoaderTemplate>
                    <ReportTemplate
                        firstLoad={firstLoad}
                        loading={loading}
                        infoMsg={infoMsg}
                        caption={caption} >
                        {children}
                    </ReportTemplate>
                </BigLoaderTemplate>
            </DataTemplate>

        )
    }
}


export default PageTemplate
