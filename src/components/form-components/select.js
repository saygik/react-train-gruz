import React from 'react'
import Select from 'react-select'

const customStyles = {
    option: (provided) => ({
        ...provided,
        padding: '0.3rem',
    }),
}
const select =({value, onChange, options, placeholder, isMulti, isClearable, isSearchable, isLoading })=>
            <div className={'pl-1 gruz-font-70'} style={{width: '18rem'}}>
                <Select
                    placeholder={placeholder}
                    options={options}
                    value={value}
                    onChange={onChange}
                    styles={customStyles}
                    isMulti={isMulti}
                    isClearable={isClearable}
                    isLoading={isLoading}
                    isSearchable={isSearchable}
                />
            </div>

export default select
