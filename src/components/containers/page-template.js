import React from 'react'
import { BigLoaderTemplate, DataTemplate, ReportTemplate } from  './'

const PageTemplate = ({ caption,
                          firstLoad,
                          infoMsg,
                          loading,
                          fetchAll,
                          autoUpdateTime,
                          children
                      }) =>
            <DataTemplate fetchAll={fetchAll} autoUpdateTime={autoUpdateTime}>
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


export default PageTemplate


