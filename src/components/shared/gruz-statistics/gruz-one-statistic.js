import React from 'react';
import AnimatedNumber from 'animated-number-react';

const GruzOneStatistic = ({ value }) => {
    const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;

    return (
        <span className="gruz-number">
            <AnimatedNumber
                value={safeValue}
                duration={600}
                formatValue={(v) => Math.round(v).toLocaleString('ru-RU')}
            />
        </span>
    );
};

export default GruzOneStatistic;