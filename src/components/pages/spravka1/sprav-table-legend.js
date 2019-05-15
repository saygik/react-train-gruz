import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {TableLegendText} from '../../shared/containers/index'


const SpravTableLegend = () =>
            <div>
                <Row className={'mr-0 pt-3'}>
                    <Col  className='text-right pr-1 font-italic'  >
                        <TableLegendText colorClass={'gruz-bg-1'} caption={'на станциях'} padding={3} />
                        <TableLegendText colorClass={'gruz-bg-6'} caption={'на ближнем подходе'} padding={1} />
                        <TableLegendText colorClass={'gruz-bg-7'} caption={'на дальнем подходе'} padding={1}/>
                    </Col>
                </Row>
            </div>

export default SpravTableLegend
