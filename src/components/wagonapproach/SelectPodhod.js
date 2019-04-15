import React, {Component} from 'react'
import {Row } from 'react-bootstrap'
import SelectPodhodButton from './SelectPodhodButton'

class SelectPodhod extends Component {

    render() {
        const {selectedPodhod, numPodhods, selectCurrentPodhod }= this.props
        const podhods= [{id:2, caption:'на станции'},{id:1, caption:'на ближнем'},{id:0, caption:'на дальнем'}]
        return (
            <Row className="justify-content-md-center m-0 p-2 ">
                {podhods.map((item, index) => {
                    return <SelectPodhodButton key={index} selected={selectedPodhod === item.id} num={numPodhods[item.id]} text={item.caption}
                                               selectCurrentPodhod={selectCurrentPodhod} podhodNumber={item.id}/>

                })}
           </Row>
        )
    }
}

export default SelectPodhod

