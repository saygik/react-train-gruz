import React from 'react'
import {Badge} from 'react-bootstrap'

const TableLegendText =({colorClass, caption}) => <Badge className={`m-1 p-1 ${colorClass} font-weight-normal text-truncate `} style={{width: '9.5rem'}}>{caption}</Badge>
export default TableLegendText