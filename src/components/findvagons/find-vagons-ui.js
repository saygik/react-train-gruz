import React from 'react'
import FindVagonsTable from './find-vagons-table'
import parse from 'html-react-parser'
import {Row, Col} from 'react-bootstrap'
import {SpravkaHeader, StantionsHeader} from '../headers'

const FindVagonsUI = ({ loading,
                          closeExpanded,
                          vagonsOnStance,
                          criteria,
                          sumVes,
                          stanPOName,
                          selectVagon,
                          selectedVagon,
                          closeFindVagonsHistory,
                          columns
                      }) =>
            <Row  className="p-1 m-1 gruz-bg-4">
                <Col>
                    <SpravkaHeader loading={loading}  closeExpanded={closeExpanded} />
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            <StantionsHeader stanName={criteria.stanName} onStation={criteria.onStation+criteria.onNod} stanPOName={stanPOName} tipVagons={criteria.tipName} numVagons={vagonsOnStance.length} />
                            {parse(sumVes===0 ? `Суммарный вес не определен` : `Суммарный вес: <span class="badge badge-pill badge-success">${sumVes}</span> т.`)}
                            <FindVagonsTable vagonsOnStance={vagonsOnStance} selectVagon={selectVagon} selectedVagon={selectedVagon} closeFindVagonsHistory={closeFindVagonsHistory} columns={columns} />
                        </Col>
                    </Row>
                </Col>
            </Row>

export default FindVagonsUI
