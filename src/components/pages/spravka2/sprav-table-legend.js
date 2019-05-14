import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {TableLegendText} from '../../shared/containers/index'

const Sprav2TableLegend = () =>
                <Row className={'mr-0 pt-3'}>
                    <Col  className='text-right pr-1 font-italic '  >
                        <TableLegendText colorClass={'gruz-bg-1'} caption={'погружено вагонов'} />
                        <TableLegendText colorClass={'gruz-bg-6'} caption={'выгружено вагонов'} />
                        <TableLegendText colorClass={'gruz-bg-7'} caption={'поступило на отделение'} />
                    </Col>
                </Row>

export default Sprav2TableLegend
