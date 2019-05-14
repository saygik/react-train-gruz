import React from 'react'

const Input=({value, onChange, clearText, placeholder})=> {
    return (
        <div>
            <input  type="search"
                    style={{fontSize: '.7rem', paddingTop: '1.1rem', paddingBottom: '1.1rem' }}
                    className="form-control "
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} />
            <button type="button"
                    className="close"
                    style={{position: 'relative', top:'-2rem', left:'-.5rem', outline: 'none', border: 'none', display:`${value.length>0? '' :'none'}`}}
                    onClick={clearText}
                    aria-label="Close" >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}


export default Input
