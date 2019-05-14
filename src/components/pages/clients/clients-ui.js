import React from 'react'
import { PageTemplate } from '../../shared/containers/index'
import { ListGroup ,Row, Col} from 'react-bootstrap'
import {Input} from '../../shared/form-components/index'
const ClientsUI=({   caption,
                     firstLoad,
                     infoMsg,
                     loading,
                     fetchAllClients,
                     selectedClients,
                     selectedClientKod,
                     selectClientKod,
                     clearClientKod
                 }) => {
    return  <PageTemplate
        fetchAll={fetchAllClients}
        firstLoad={firstLoad}
        loading={loading}
        infoMsg={infoMsg}
        autoUpdateTime={0}
        caption={caption} >
        <div>
            <Row className="justify-content-md-center m-0 p-2" >
                <Col md={7}>
                    <div className={'pl-1 gruz-font-70 form-group has-feedback has-clear'}  >
                        <Input value={selectedClientKod} onChange={selectClientKod} clearText={clearClientKod}  placeholder={'Набирайте код клиента либо наименование...'}/>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center m-0 p-2" >
                <Col md={5}>
                    <ListGroup>
                        {
                            selectedClients.map((item,i) =>{
                                return <ListGroup.Item key={i} className={'pt-1 pb-1'}><span className='text-secondary gruz-font-80'>{item.value}</span> <span className='text-primary gruz-font-80'>{item.label}</span></ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>

        </div>
    </PageTemplate>
}

export default ClientsUI
