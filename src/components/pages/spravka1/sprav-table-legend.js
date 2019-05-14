import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {TableLegendText} from '../../shared/containers/index'


const SpravTableLegend = () =>
            <div>
                <Row className={'mr-0 pt-3'}>
                    <Col  className='text-right pr-1 font-italic '  >
                        <TableLegendText colorClass={'gruz-bg-1'} caption={'на станциях'} />
                        <TableLegendText colorClass={'gruz-bg-6'} caption={'на ближнем подходе'} />
                        <TableLegendText colorClass={'gruz-bg-7'} caption={'на дальнем подходе'} />
                    </Col>
                </Row>
            </div>

export default SpravTableLegend
