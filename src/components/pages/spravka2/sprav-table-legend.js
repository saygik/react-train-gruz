import React, { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { TableLegendText } from '../../shared/containers/index';

const Sprav2TableLegend = () =>
    <div className="sprav-legend">
        <TableLegendText colorClass="gruz-bg-1" caption="погружено вагонов" />
        <TableLegendText colorClass="gruz-bg-6" caption="выгружено вагонов" />
        <TableLegendText colorClass="gruz-bg-7" caption="поступило на отделение" />
    </div>

export default Sprav2TableLegend;