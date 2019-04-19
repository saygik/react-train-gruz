import {Component} from 'react'

class DataTemplate extends Component {
    componentDidMount() {
        this.props.fetchAll()
        if (this.props.autoUpdateTime && this.props.autoUpdateTime>0) {
            this.timer = setInterval(() => this.props.fetchAll(), 60000);
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