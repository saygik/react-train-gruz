import React from 'react'
import {ToggleSwitch, Select} from '../form-components'
import {Row, Col} from 'react-bootstrap';
const NaturkiSelectors = (props) =>

    <Row className={'gruz-font-80 pt-1 justify-content-md-center'} style={{width:'100%'}}>
        <Col className={'d-flex pt-1 justify-content-center'} sm={'11'} md={3} >

                    <ToggleSwitch  caption={'Полные натурки'} checked={props.bAllNaturki} onChange={props.allNaturkiCheck} />
                    <ToggleSwitch  caption={'На отделении'} checked={props.bNod} onChange={props.nodCheck} />
        </Col>
        <Col className={'pt-1 justify-content-center'} sm={'5'} md={4}>
                    <Select
                            placeholder={'Выбирайте станцию формирования...'}
                            options={props.optionsStantionFrom}
                            value={props.selectedStantionFromValue}
                            onChange={props.selectStantionFrom}
                            isMulti={true}
                    />
        </Col>
        <Col className={'pt-1 justify-content-center'} sm={'5'} md={4}>
                    <Select
                            placeholder={'Выбирайте станцию назначения...'}
                            options={props.optionsStantionTo}
                            value={props.selectedStantionToValue}
                            onChange={props.selectStantionTo}
                            isMulti={true}
                    />
        </Col>
    </Row>

export default NaturkiSelectors
