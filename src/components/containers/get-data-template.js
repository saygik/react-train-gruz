import {Component} from 'react'

class DataTemplate extends Component {
    componentDidMount() {
        const {autoUpdateTime, fetchAll}=this.props
        fetchAll()
        if (autoUpdateTime && autoUpdateTime>0) {
            this.timer = setInterval(() => fetchAll(), autoUpdateTime);
        }
    }
    componentWillUnmount() {
         this.timer = null;
    }
    render() {
        return this.props.children
            }
}
export default DataTemplate