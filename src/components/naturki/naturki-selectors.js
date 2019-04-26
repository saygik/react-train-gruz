import React from 'react'
import {ToggleSwitch, Select} from '../form-components'

const NaturkiSelectors = (props) =>
                <div   className={'d-flex gruz-font-80 pt-1'} >
                    <ToggleSwitch  caption={'Полные натурки'} checked={props.bAllNaturki} onChange={props.allNaturkiCheck} />
                    <ToggleSwitch  caption={'На отделении'} checked={props.bNod} onChange={props.nodCheck} />
                    <Select
                            placeholder={'Выбирайте станцию формирования...'}
                            options={props.optionsStantionFrom}
                            value={props.selectedStantionFromValue}
                            onChange={props.selectStantionFrom}
                            isMulti={true}
                    />
                    <Select
                            placeholder={'Выбирайте станцию назначения...'}
                            options={props.optionsStantionTo}
                            value={props.selectedStantionToValue}
                            onChange={props.selectStantionTo}
                            isMulti={true}
                    />
                </div>

export default NaturkiSelectors
