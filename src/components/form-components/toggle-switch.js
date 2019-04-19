import React, {Component} from 'react'
import Switch from 'react-switch'
class ToggleSwitch extends Component   {
        render()
        {

            return (
                <div className={'pl-2'} style={{width: '6.8rem'}}>
                 <label>
                     <div className={'text-center'}>
                         <Switch
                        checked={this.props.checked}
                        onChange={this.props.onChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={18}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={40}
                        className="react-switch"
                    />
                     </div>
                     <span className={'d-block text-truncate gruz-font-70'}> {this.props.caption}</span>
                 </label>
                </div>
            )
        }
    }
export default ToggleSwitch

