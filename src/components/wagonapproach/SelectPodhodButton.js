import React, {Component} from 'react'
import { Badge, Row, Col } from 'react-bootstrap'

class SelectPodhodButton extends Component {
    render() {
        const {selected, num, text }= this.props
        return (
                <Col style={{width: '30%'}} className={`m-1 text-center  ${selected ? 'gruz-button-selected':'gruz-button' }`} onClick={this.handleSelectPodhodClick}>
                    <Badge pill variant={selected ? 'success':'secondary'}>{num}</Badge> <span className={'d-block text-truncate gruz-font-90'}>{text}</span>
                </Col>
        )

    }
    handleSelectPodhodClick =() =>{
        if (this.props.num>0) {
            this.props.selectCurrentPodhod(this.props.podhodNumber)
        }
    }

}
export default SelectPodhodButton


