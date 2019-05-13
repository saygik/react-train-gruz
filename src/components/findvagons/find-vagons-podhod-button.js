import React from 'react'


const FindVagonsPodhodButton = ({selected,  text, selectPodhod, podhodNumber }) =>
    <div
         className={`m-1 text-center  ${selected ? 'gruz-button-selected':'gruz-button' }`}
         onClick={()=> selectPodhod(podhodNumber)}>
        <span className={'text-truncate gruz-font-70'}>{text}</span>
    </div>

export default FindVagonsPodhodButton
