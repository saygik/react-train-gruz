import React, {Component} from 'react'
import WagonApproach from './WagonApproach'
import ReportTemplate from '../reporttemplate'

class MainComponent extends Component {
    render() {
        return (
            <div >
                <ReportTemplate textHeader={'Подход вагонов'} infoMsg={''} loading={false} >
                    <WagonApproach />
                </ReportTemplate>
            </div>
        );
    }
}

export default MainComponent