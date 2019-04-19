import React, {Component} from 'react'
import {ToggleSwitch, Select} from '../form-components'

class NaturkiSelectors extends Component {
    render() {
        return (
                <div   className={'d-flex gruz-font-80 pt-1'} >
                    <ToggleSwitch  caption={'Полные натурки'} checked={this.props.bAllNaturki} onChange={this.props.allNaturkiCheck} />
                    <ToggleSwitch  caption={'На отделении'} checked={this.props.bNod} onChange={this.props.nodCheck} />
                    <Select
                            placeholder={'Выбирайте станцию формирования...'}
                            options={this.props.optionsStantionFrom}
                            value={this.props.selectedStantionFromValue}
                            onChange={this.props.selectStantionFrom}
                            isMulti={true}
                    />
                    <Select
                            placeholder={'Выбирайте станцию назначения...'}
                            options={this.props.optionsStantionTo}
                            value={this.props.selectedStantionToValue}
                            onChange={this.props.selectStantionTo}
                            isMulti={true}
                    />
                </div>
        )
    }
}

export default NaturkiSelectors
