import React from 'react'
import { Form} from 'react-bootstrap'
const Input=({value, onChange, placeholder})=> {
    return (
        <div>
            <Form>
                <Form.Control type="search"
                              placeholder={placeholder}
                              value={value}
                              onChange={onChange}
                              style={{height: '37px', fontSize: '0.70rem' }}
                />
            </Form>
        </div>
    )
}

export default Input
