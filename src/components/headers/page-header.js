import React from 'react'
import LittleLoader from "../littleloader"
import withViewScroll from "../hoc/with-view-scroll"

const PageHeader =(props)=> (
            <div  id='Intro'  className={`gruz-bg-header-3 shadow ${props.showNavBar ? 'pageHeaderNavBarVisible' : 'pageHeaderNavBarNonVisible'}`}>
                <div className={'pr-2'}>
                       <span className={'pl-4 gruz-text-ls align-text-bottom d-block text-truncate pb-0'} >
                            {`>${props.caption}`}
                      </span>
                        <span  className='pl-0 gruz-font-70 float-right'  style={{width: '1.3rem', color: '#686868' }}>
                        {props.loading && <LittleLoader/>}
                        </span>
                        <div className=' gruz-text-ls-sm text-right text-nowrap pr-4 font-italic gruz-font-70 pt-0 pb-0'>
                        {props.infoMsg ? props.infoMsg :'Данные отсустсвуют'}
                        </div>
                </div>
            </div>
        )
export default withViewScroll()(PageHeader)

