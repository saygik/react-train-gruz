import React, {Component} from 'react'
import { ListGroup } from 'react-bootstrap'

import ModalEditClient from './modal-edit-client'


class ClientsList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            item: ''
        }
        this._handleUpdate = this._handleUpdate.bind(this)
    }
    _handleUpdate(e) {
        const {name, value} = e.target
        const newItem= {...this.state.item}
        newItem[name]=value
        this.setState({
            item: newItem
        })
    }
    render() {
        const {selectedClients, allowEdit, clientUpdate, showEditForm, showClientEditForm} =this.props

        return (
            <div>
                <ListGroup>
                    {
                        selectedClients.map((item,i) =>{
                            return <ListGroup.Item key={i} className={'pt-1 pb-1'}>
                                <span className='text-secondary gruz-font-80'>{item.value}</span> <span className='text-primary gruz-font-80'>{item.label}</span>
                                {allowEdit ? <span className={'gruz-font-70 text-success'}
                                                   style={{float: 'right', cursor: 'pointer'}}
                                                   onClick={(e)=> {
                                                       this.setState({ item: {kods: item.value || '', name: item.label || '', adress: item.adress || ''} });
                                                       showClientEditForm(true);
                                                   } }
                                >изменить</span> : ''}

                            </ListGroup.Item>
                        })
                    }
                </ListGroup>
                <ModalEditClient clientUpdate={clientUpdate} show={showEditForm} item={this.state.item} handleUpdate={this._handleUpdate} handleClose={()=>showClientEditForm(false)}/>
            </div>
        )
    }
}


export default ClientsList
