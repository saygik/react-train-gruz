import React, {Component} from 'react'
import PageTemplate from './PageTemplate'

class SpravkaTemplate extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, loading, infoMsg, caption, moduleBody} = this.props
        return (
            <div >
                  <PageTemplate
                            firstLoad={firstLoad}
                            loading={loading}
                            infoMsg={infoMsg}
                            caption={caption}
                            moduleBody={moduleBody}
                   />
            </div>
        );
    }
}

export default SpravkaTemplate