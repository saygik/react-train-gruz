import React from 'react'
import {Row, Col} from 'react-bootstrap'
import FindPoezdVagonsTable from './find-poezd-vagons-table'
import {SpravkaHeader, SpravkaHeaderCaption} from '../headers'

const FindPoezdVagonsUI = ({
                               loading,
                               closeExpanded,
                               caption,
                               data,
                               columns,
                               selectedRow,
                               selectRow,
                               closeExpandedVagon
                           }) =>
            <Row  className="p-1 m-1 gruz-bg-4">
                <Col>
                    <SpravkaHeader loading={loading}  closeExpanded={closeExpanded} />
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            <SpravkaHeaderCaption caption={caption} />
                            <FindPoezdVagonsTable data={data}
                                                  columns={columns}
                                                  selectedRow={selectedRow}
                                                  selectRow={selectRow}
                                                  closeExpanded={closeExpandedVagon}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

export default FindPoezdVagonsUI
