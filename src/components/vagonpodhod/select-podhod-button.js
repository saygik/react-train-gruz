import React from 'react'
import { Badge,  Col } from 'react-bootstrap'

const SelectPodhodButton = ({selected, num, text, selectCurrentPodhod, podhodNumber }) =>
                <Col style={{width: '30%'}}
                     className={`m-1 text-center  ${selected ? 'gruz-button-selected':'gruz-button' }`}
                     onClick={()=> num>0 && selectCurrentPodhod(podhodNumber)}>
                    {num && <Badge pill variant={selected ? 'success':'secondary'}>{num}</Badge>}
                       <span className={'d-block text-truncate gruz-font-90'}>{text}</span>
                </Col>

export default SelectPodhodButton


