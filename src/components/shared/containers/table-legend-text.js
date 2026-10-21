import React from 'react';

const TableLegendText = ({ colorClass, caption }) => (
    <span className="legend-item">
        <span className={`legend-swatch ${colorClass}`} aria-hidden="true" />
        <span className="legend-caption">{caption}</span>
    </span>
);

export default TableLegendText;