import React, { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { TableLegendText } from '../../shared/containers/index';

const SpravTableLegend = () =>
    <div id="sprav-legend-body" className="sprav-legend">
        <TableLegendText colorClass="gruz-bg-1" caption="на станциях" padding={2} />
        <TableLegendText colorClass="gruz-bg-6" caption="на ближнем подходе" padding={1} />
        <TableLegendText colorClass="gruz-bg-7" caption="на дальнем подходе" padding={1} />
    </div>


export default SpravTableLegend;