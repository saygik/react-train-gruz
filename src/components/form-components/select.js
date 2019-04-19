import React, {Component} from 'react'
import Select from 'react-select'

const customStyles = {
    option: (provided) => ({
        ...provided,
        padding: '0.3rem',
    }),
}
class select extends Component {
    render() {
        const {value, onChange, options, placeholder, isMulti }=this.props
        return (
            <div className={'pl-1 gruz-font-70'} style={{width: '18rem'}}>
                <Select
                    placeholder={placeholder}
                    options={options}
                    value={value}
                    onChange={onChange}
                    styles={customStyles}
                    isMulti={isMulti}
                />
            </div>
        )
    }
}

export default select
