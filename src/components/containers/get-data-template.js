import {Component} from 'react'

class DataTemplate extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }
    render() {
        return this.props.children
            }
}
export default DataTemplate