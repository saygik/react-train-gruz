import React from 'react'
import {Badge} from 'react-bootstrap'

const TableLegendText =({colorClass, caption, padding}) => <Badge className={`m-1 p-1 pl-${padding} pr-${padding} ${colorClass} font-weight-normal text-wrap `} style={{width: '6rem' }}>{caption}</Badge>
export default TableLegendText