import React from 'react'
import { Select} from '../../shared/form-components/index'
import { Button, Card,Row, Col} from 'react-bootstrap';
import FindVagonsPodhodButton from './find-vagons-podhod-button'
import {Input} from '../../shared/form-components/index'
const FindVagonsFilters = ({
                               selectedStantionTo,
                               selectedStantionToValues,
                               selectStantionTo,
                               selectedClient,
                               selectedClientValues,
                               selectClient,
                               selectedGruzValues,
                               selectedGruz,
                               selectGruz,
                               selectPodhod,
                               selectedPodhod,
                               selectedTipVagons,
                               selectTipVagons,
                               selectedVagonKod,
                               selectVagonKod,
                               clearVagonKod,
                               clearVagonsFilter,
                               findVagons
                           }) => {
    return <div>
        <Row className={'gruz-font-80 pt-1 justify-content-md-center'} style={{width:'100%'}}>
            <Col className={'d-flex pt-1 justify-content-center'} sm={'12'} md={'12'} lg={'4'}>
                <Card  style={{width: '9rem'}} className={'gruz-text-ls-sm gruz-font-70 mr-4'}>
                    <Card.Body className={'p-0 pt-1 '}>
                        <FindVagonsPodhodButton  selected={selectedPodhod===1}  text={'на отделении'}
                                                 selectPodhod={selectPodhod} podhodNumber={1}/>
                        <FindVagonsPodhodButton  selected={selectedPodhod===0}  text={'дальний подход'}
                                                 selectPodhod={selectPodhod} podhodNumber={0}/>
                        <FindVagonsPodhodButton  selected={selectedPodhod===2}  text={'без ограничений'}
                                                 selectPodhod={selectPodhod} podhodNumber={2}/>
                    </Card.Body>
                </Card>
                <Card  style={{width: '9rem'}} className={'gruz-text-ls-sm gruz-font-70'}>
                    <Card.Body className={'p-0 pt-1'}>
                        <FindVagonsPodhodButton  selected={selectedTipVagons===1}  text={'груженые вагоны'}
                                                 selectPodhod={selectTipVagons} podhodNumber={1}/>
                        <FindVagonsPodhodButton  selected={selectedTipVagons===2}  text={'порожние вагоны'}
                                                 selectPodhod={selectTipVagons} podhodNumber={2}/>
                        <FindVagonsPodhodButton  selected={selectedTipVagons===3}  text={'приписные вагоны'}
                                                 selectPodhod={selectTipVagons} podhodNumber={3}/>
                        <FindVagonsPodhodButton  selected={selectedTipVagons===0}  text={'без ограничений'}
                                                 selectPodhod={selectTipVagons} podhodNumber={0}/>
                    </Card.Body>
                </Card>

        </Col>
            <Col className={'pt-1 '}  sm={'5'} md={'5'}  lg={'3'} >
            <div className={'pb-1'}>
                <Select
                    placeholder={'Выберите станцию назначения...'}
                    options={selectedStantionTo}
                    value={selectedStantionToValues}
                    onChange={selectStantionTo}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                />
            </div>
            <div >
                <Select
                    placeholder={'Выберите грузополучателя...'}
                    options={selectedClient}
                    value={selectedClientValues}
                    onChange={selectClient}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                />
            </div>

        </Col>
        <Col className={'pt-1 '}  sm={'5'} md={'5'}  lg={'3'} >
            <div className={'pb-1'}>
                <Select
                    placeholder={'Выберите род груза...'}
                    options={selectedGruz}
                    value={selectedGruzValues}
                    onChange={selectGruz}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                />
            </div>
            <div className={'pl-1 gruz-font-70 form-group has-feedback has-clear'}  >
                <Input value={selectedVagonKod} onChange={selectVagonKod} placeholder={'Набирайте код вагона...'}/>
            </div>

        </Col>
        </Row>
        <Row style={{width:'100%'}}>
        <Col className={'pt-1 d-flex justify-content-center'} sm={'12'} >
            <div className={'pr-2'}>
            <Button
                variant="secondary"
                disabled={false}
                onClick={clearVagonsFilter}
            >
                Сброс
            </Button>
            </div>
            <div className={'pl-2'}>
            <Button
                variant="primary"
                disabled={false}
                onClick={findVagons}
            >
                Поиск
            </Button>
            </div>
        </Col>
    </Row>
    </div>
}
export default FindVagonsFilters


