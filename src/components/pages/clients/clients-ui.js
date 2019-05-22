import React from 'react'
import { PageTemplate } from '../../shared/containers/index'
import { Row, Col} from 'react-bootstrap'
import {Input} from '../../shared/form-components/index'
import ClientsList from './clients-list'
const ClientsUI=({   caption,
                     firstLoad,
                     infoMsg,
                     loading,
                     fetchAllClients,
                     selectedClients,
                     selectedClientKod,
                     selectClientKod,
                     clientUpdate,
                     showEditForm,
                     showClientEditForm,
                     allowEdit
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
                    <div className={'pl-1 pb-0 gruz-font-70 form-group has-feedback has-clear'}  >
                        <span className={'pl-3'}>Набирайте код или наименование клиента (минимум 3 символа)</span>
                        <Input value={selectedClientKod} onChange={selectClientKod}  placeholder={''}/>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center m-0 p-2" >
                <Col md={5}>
                    <ClientsList clientUpdate={clientUpdate} selectedClients={selectedClients} allowEdit={allowEdit} showEditForm={showEditForm} showClientEditForm={showClientEditForm} />
                </Col>
            </Row>
        </div>
    </PageTemplate>
}

export default ClientsUI
