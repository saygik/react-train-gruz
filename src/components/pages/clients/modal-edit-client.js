import React from 'react'
import { Modal, Button} from 'react-bootstrap'
import {Input} from '../../shared/form-components/index'

const ModalEditClient = ({show, item, handleClose,clientUpdate, handleUpdate}) =>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header  className="gruz-bg-1 " closeButton>
                        <Modal.Title className='text-primary '>Клиент: {item.kods}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="gruz-bg-2">
                        <div >
                            <span className={'pl-3 font-italic'}>Наименование</span>
                            <Input name={'name'} value={item.name}  onChange={handleUpdate} placeholder={''} />
                            <br />
                            <span className={'pl-3 font-italic'}>Адрес</span>
                            <Input name={'adress'}  value={item.adress ? item.adress : ''} onChange={handleUpdate}  placeholder={''} />

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                        <Button variant="primary" onClick={()=>clientUpdate(item)}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>

            </div>

export default ModalEditClient
