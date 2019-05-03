import React from 'react';
import { ViewScrollConsumer } from '../context'

const withViewScroll = () => (Wrapped) => {

    return (props) => {
        return (
            <ViewScrollConsumer>
                {
                    (showNavBar) => {
                        return (<Wrapped {...props}
                                         showNavBar={showNavBar}/>)
                    }
                }
            </ViewScrollConsumer>
        );
    }
}

export default withViewScroll
