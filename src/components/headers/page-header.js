import React, {Component} from 'react'
import LittleLoader from "../littleloader"
import {connect} from "react-redux"
import {showNavbarSelector} from "../../ducks/global"

class PageHeader extends Component {
    render() {
         const littleLoader= this.props.loading && <LittleLoader/>
         const onTop=this.props.showNavbar
        return (
            <div  id='Intro'  className={`gruz-bg-header-3 shadow ${onTop ? 'pageHeaderNavBarVisible' : 'pageHeaderNavBarNonVisible'}`}>
                <div className={'pr-2'}>
                       <span className={'pl-4 gruz-text-ls align-text-bottom d-block text-truncate pb-0'} >
                            {`>${this.props.caption}`}
                      </span>
                        <span  className='pl-0 gruz-font-70 float-right'  style={{width: '1.3rem', color: '#686868' }}>
                        {littleLoader}
                        </span>
                        <div className=' gruz-text-ls-sm text-right text-nowrap pr-4 font-italic gruz-font-70 pt-0 pb-0'>
                        {this.props.infoMsg ? this.props.infoMsg :'Данные отсустсвуют'}
                        </div>
                </div>
            </div>
        )
    }

}
export default connect(state=>({showNavbar: showNavbarSelector(state)}))(PageHeader)
