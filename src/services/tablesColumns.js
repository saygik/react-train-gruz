import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

const tablesColumns= {
    findpoezdvagons: [
        {
            dataField: 'Id',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }

        },
        {
            dataField: 'Kodv',
            text: 'вагон',
            align: 'center',
            headerStyle: {
                width: '60px'
            }

        },
        {
            dataField: 'Namekods',
            text: 'стан по',
            headerStyle: {
                width: '130px'
            }
        },
        {
            dataField: 'Nameklient',
            text: 'клиент',
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namegruz',
            text: 'груз',

        },
        {
            dataField: 'Nametip',
            text: 'тип',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },

    ],
    naturki: [
        {
            dataField: 'Idd',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namekodsfrom',
            text: 'откуда',
        },
        {
            dataField: 'Namekods',
            text: 'куда',
        },
        {
            dataField: 'Number',
            text: 'номер',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Ind',
            text: 'индекс',
            align: 'center',
            headerStyle: {
                width: '90px'
            }
        },
        {
            dataField: 'Nameoper',
            text: 'опер',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '70px'
            }
        },
        {
            dataField: 'Timelast',
            text: 'время',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Namekodslast',
            text: 'станция',
        },
        {
            dataField: 'Colvag',
            text: 'ваг.',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
    ],
    findvagons: [
        {
            dataField: 'Idd',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }

        },
        {
            dataField: 'Kodv',
            text: 'вагон',
            align: 'center',
            headerStyle: {
                width: '60px'
            }

        },
        {
            dataField: 'Nametip',
            text: 'тип',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Ind',
            text: 'инд',
            align: 'center',
            headerStyle: {
                width: '90px'
            }
        },
        {
            dataField: 'Nameoper',
            text: 'опер',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '80px'
            }

        },
        {
            dataField: 'Timelast',
            text: 'время',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Namekodslast',
            text: 'стан по',
            headerStyle: {
                width: '130px'
            }
        },
        {
            dataField: 'Kodpol',
            text: 'код кл',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Nameklient',
            text: 'клиент',
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namegruz',
            text: 'груз',

        }
    ],
    findvagonsall: [
        {
            dataField: 'Idd',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }

        },
        {
            dataField: 'Kodv',
            text: 'вагон',
            align: 'center',
            headerStyle: {
                width: '60px'
            }

        },
        {
            dataField: 'Nametip',
            text: 'тип',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Ind',
            text: 'инд',
            align: 'center',
            headerStyle: {
                width: '90px'
            }
        },
        {
            dataField: 'Nameoper',
            text: 'опер',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '80px'
            }

        },
        {
            dataField: 'Timelast',
            text: 'время',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Namekodslast',
            text: 'стан по',
            headerStyle: {
                width: '130px'
            }
        },
        {
            dataField: 'Kodpol',
            text: 'код кл',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Nameklient',
            text: 'клиент',
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namegruz',
            text: 'груз',

        }
    ],
    podhod: [
        {
            dataField: 'Idd',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Kodv',
            text: 'вагон',
            align: 'center',
            headerStyle: {
                width: '60px'
            }
        },
        {
            dataField: 'Ind',
            text: 'инд',
            align: 'center',
            headerStyle: {
                width: '90px'
            }
        },
        {
            dataField: 'Oper',
            text: 'опер',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '70px'
            }
        },
        {
            dataField: 'Namekods',
            text: 'стан по',
            headerStyle: {
                width: '130px'
            }
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Nameklient',
            text: 'клиент',
        },
        {
            dataField: 'Namegruz',
            text: 'груз',
        },

    ],
    findvagonhistory: [
        {
            dataField: 'Id',
            text: '#',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namekodsfrom',
            text: 'откуда',
        },
        {
            dataField: 'Namekods',
            text: 'куда',
        },
        {
            dataField: 'Ind',
            text: 'индекс',
            align: 'center',
            headerStyle: {
                width: '90px'
            }
        },
        {
            dataField: 'Oper',
            text: 'опер.',
            align: 'center',
            headerStyle: {
                width: '60px'
            }
        },
        {
            dataField: 'Namekodslast',
            text: 'станция',
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '70px'
            }
        },
        {
            dataField: 'Timelast',
            text: 'время',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Kods',
            text: 'ст.наз.',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Kodgruz',
            text: 'груз',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Kodpol',
            text: 'клиент',
            align: 'center',
            headerStyle: {
                width: '60px'
            }
        }

    ],
    pogrvygr: [
        {
            dataField: 'Idd',
            text: '#',
            align: 'center',
            headerStyle: {
                width: '40px'
            }

        },
        {
            dataField: 'Kodv',
            text: 'вагон',
            align: 'center',
            headerStyle: {
                width: '60px'
            }

        },
        {
            dataField: 'Namekods',
            text: 'стан назн.',
            headerStyle: {
                width: '130px'
            }
        },
        {
            dataField: 'Nametip',
            text: 'тип',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Nameoper',
            text: 'опер',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Datelast',
            text: 'дата',
            align: 'center',
            headerStyle: {
                width: '80px'
            }

        },
        {
            dataField: 'Timelast',
            text: 'время',
            align: 'center',
            headerStyle: {
                width: '50px'
            }
        },
        {
            dataField: 'Nameklient',
            text: 'клиент',
        },
        {
            dataField: 'Ves',
            text: 'вес',
            align: 'center',
            headerStyle: {
                width: '40px'
            }
        },
        {
            dataField: 'Namegruz',
            text: 'груз',

        }
    ],
    spravka1: [
        {
            dataField: 'ID',
            text: 'id',
            hidden: true
        },
        {
            dataField: 'TIPZAP',
            text: '#',
            hidden: true
        },
        {
            dataField: 'NAME',
            text: 'СТАНЦИЯ',
        },
        {
            dataField: 'KODS',
            text: 'код',
        },
        {
            dataField: 'COLS',
            text: 'ВСЕ',
        },
        {
            dataField: 'COLS1',
            text: 'КР',
        },
        {
            dataField: 'COLS2',
            text: 'ПЛ',
        },
        {
            dataField: 'COLS3',
            text: 'ПВ',
        },
        {
            dataField: 'COLS4',
            text: 'ЦС',
        },
        {
            dataField: 'COLS5',
            text: 'РЕФ',
        },
        {
            dataField: 'COLS6',
            text: 'ПР',
        },
        {
            dataField: 'COLP',
            text: 'ВСЕ',
        },
        {
            dataField: 'COLP1',
            text: 'КР',
        },
        {
            dataField: 'COLP2',
            text: 'ПЛ',
        },
        {
            dataField: 'COLP3',
            text: 'ПВ',
        },
        {
            dataField: 'COLP4',
            text: 'ЦС',
        },
        {
            dataField: 'COLP5',
            text: 'РЕФ',
        },
        {
            dataField: 'COLP6',
            text: 'ПР',
        },
        {
            dataField: 'COLD',
            text: 'ВСЕ',
        },
        {
            dataField: 'COLD1',
            text: 'КР',
        },
        {
            dataField: 'COLD2',
            text: 'ПЛ',
        },
        {
            dataField: 'COLD3',
            text: 'ПВ',
        },
        {
            dataField: 'COLD4',
            text: 'ЦС',
        },
        {
            dataField: 'COLD5',
            text: 'РЕФ',
        },
        {
            dataField: 'COLD6',
            text: 'ПР',
        },
        {
            dataField: 'COL',
            text: 'итог',
            align: 'center',
            headerClasses: 'gruz-bg-4 gruz-font-70 pb-1 pt-2',
            classes: 'p-0 gruz-bg-4',
        }
    ],
    spravka31: [
        {
            dataField: 'ID',
            text: 'id',
            hidden: true
        },
        {
            dataField: 'TIPZAP',
            text: '#',
            hidden: true
        },
        {
            dataField: 'NAME',
            text: 'СТАНЦИЯ',
        },
        {
            dataField: 'KODS',
            text: 'КОД',
        },
        {
            dataField:'S1387',
            text: 'СТОЛБЦЫ',
        },
        {
            dataField:'S1386',
            text: 'ГОРОДЕЯ',
        },
        {
            dataField:'S1391',
            text: 'ТИМКОВИЧИ',
        },
        {
            dataField:'S1390',
            text: 'КЛЕЦК',
        },
        {
            dataField:'S1389',
            text: 'БАРАНОВ-ПОЛ.',
        },
        {
            dataField:'S1385',
            text: 'БАРАНОВИЧИ',
        },
        {
            dataField:'S1399',
            text: 'ЛЯХОВИЧИ',
        },
        {
            dataField:'S1398',
            text: 'РЕЙТАНОВ',
        },
        {
            dataField:'S1396',
            text: 'ГАНЦЕВИЧИ',
        },
        {
            dataField:'S1395',
            text: 'ЛЮЩА',
        },
        {
            dataField:'S1393',
            text: 'ВИДИБОР',
        },
        {
            dataField:'S1392',
            text: 'ГОРЫНЬ',
        },
        {
            dataField:'S1394',
            text: 'ЛУНИНЕЦ',
        },
        {
            dataField:'S1520',
            text: 'СИТНИЦА',
        },
        {
            dataField:'S1521',
            text: 'МИКАШЕВИЧИ',
        },
        {
            dataField:'S1369',
            text: 'ОЗЕРНИЦА',
        },
        {
            dataField:'S1371',
            text: 'ПОЛОНКА',
        },
        {
            dataField:'S1370',
            text: 'СЛОНИМ',
        },
        {
            dataField:'S1368',
            text: 'ЗЕЛЬВА',
        },
        {
            dataField:'S1367',
            text: 'ВОЛКОВЫСК Ц.',
        },
        {
            dataField:'S1362',
            text: 'БЕРЕСТОВИЦА',
        },
        {
            dataField:'S1356',
            text: 'СВИСЛОЧЬ',
        },
        {
            dataField:'S1373',
            text: 'РОСЬ',
        },
        {
            dataField:'S1372',
            text: 'МОСТЫ',
        },
        {
            dataField:'S1354',
            text: 'СКИДЕЛЬ',
        },
        {
            dataField:'S1345',
            text: 'ГРИЦЕВЕЦ',
        },
        {
            dataField:'S1353',
            text: 'АУЛЬС',
        },
        {
            dataField:'S1352',
            text: 'ГРОДНО',
        },
        {
            dataField:'S1347',
            text: 'ЛОСОСНО',
        },
        {
            dataField:'S1351',
            text: 'БРУЗГИ',
        },
        {
            dataField:'S1375',
            text: 'СКРИБОВЦЫ',
        },
        {
            dataField:'S1374',
            text: 'РОЖАНКА',
        },
        {
            dataField:'S1380',
            text: 'ГУТНО',
        },
        {
            dataField:'S1623',
            text: 'ГАВЬЯ',
        },
        {
            dataField:'S1624',
            text: 'ЮРАТИШКИ',
        },
        {
            dataField:'S1377',
            text: 'ГУДЫ',
        },
        {
            dataField:'S1378',
            text: 'БАСТУНЫ',
        },
        {
            dataField:'S1376',
            text: 'ЛИДА',
        },
        {
            dataField:'S1382',
            text: 'НОВОЕЛЬНЯ',
        },
        {
            dataField:'S1384',
            text: 'МОРДИЧИ',
        },
        {
            dataField:'S1348',
            text: 'КУЗНИЦА',
        },
        {
            dataField:'S1357',
            text: 'СЕМЯНУВКА(1520)',
        },
        {
            dataField:'S1358',
            text: 'СЕМЯНУВКА(1435)',
        },
        {
            dataField:'S1363',
            text: 'ПЕРЕГРУЗКА',
        },
    ],
}
const addFindVagonsClasses = tablesColumnsArray => tablesColumnsArray.map((elem)=>{
        const el=elem
        el.classes= 'gruz-font-70 p-1 m-0'
        el.headerClasses= 'gruz-bg-header-two gruz-font-90 gruz-font-normal m-0 p-0'
        el.headerAlign= 'center'
        return el })

const addSpravka1Classes = tablesColumnsArray => tablesColumnsArray.map((elem)=>{
    const el=elem
    el.align= 'center'
    if (el.dataField.includes('COL')) {
        el.formatter= (cell)=> (cell===0 ? '' : <div style={{ cursor: "pointer"}}>{ cell }</div>)
        el.headerStyle= () => ({ textAlign: 'center' })
    }
    if (el.dataField.includes('NAME')) {
        el.classes= 'p-0 m-0 gruz-font-60'
        el.headerClasses= 'gruz-font-70 gruz-bg-4  pb-1 pt-2  p-0 m-0 gruz-font-normal '
        el.headerStyle= () => ({ width: '160px', textAlign: 'center' })
    }
    if (el.dataField.includes('KODS')) {
        el.classes= 'p-0 m-0 gruz-font-60'
        el.headerClasses= 'gruz-font-70 gruz-bg-4  pb-1 pt-2  p-0 m-0 gruz-font-normal '
        el.headerStyle= () => ({ width: '50px', textAlign: 'center' })
    }
    if (el.dataField.includes('COL')) {
        el.classes= 'p-0 gruz-bg-4 gruz-font-70'
        el.headerClasses= 'gruz-bg-4 gruz-font-70 pb-1 pt-2 p-0 m-0 gruz-font-normal '
    }
    switch (el.dataField) {
        case 'COLS':
            el.headerClasses= 'gruz-bg-1 gruz-font-60 pb-1 gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 gruz-bg-1 gruz-grid-cell'
            return el
        case 'COLP':
            el.headerClasses= 'gruz-bg-6 gruz-font-60 pb-1 pt-2 gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 m-0 gruz-bg-6 gruz-grid-cell'
            return el
        case 'COLD':
            el.headerClasses= 'gruz-bg-7 gruz-font-70 pb-1 pt-2 gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 m-0 gruz-bg-7 gruz-grid-cell'
            return el
        case 'COLS1':
        case 'COLS2':
        case 'COLS3':
        case 'COLS4':
        case 'COLS5':
        case 'COLS6':
            el.headerClasses= 'gruz-bg-1 gruz-font-60 pb-1 pt-2  gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 m-0 gruz-grid-cell'
            return el
        case 'COLP1':
        case 'COLP2':
        case 'COLP3':
        case 'COLP4':
        case 'COLP5':
        case 'COLP6':
            el.headerClasses= 'gruz-bg-6 gruz-font-60 pb-1 pt-2 gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 m-0 gruz-grid-cell'
            return el
        case 'COLD1':
        case 'COLD2':
        case 'COLD3':
        case 'COLD4':
        case 'COLD5':
        case 'COLD6':
            el.headerClasses= 'gruz-bg-7 gruz-font-60 pb-1 pt-2 gruz-font-normal p-0 m-0'
            el.classes= 'gruz-font-70 p-0 m-0 gruz-grid-cell'
            return el
        default:
            return el
    }
    })

const addSpravka31Classes = tablesColumnsArray => tablesColumnsArray.map((elem)=>{
    const el=elem
    el.headerAlign= 'center'
    if (el.dataField.includes('NAME')) {
        el.classes= 'p-0 pl-2 m-0 gruz-font-80'
        el.headerClasses= 'gruz-font-80 gruz-bg-4  pb-1 pt-2'
        el.headerStyle= () => ({ width: '160px' })
        return el
    }
    if (el.dataField.includes('KODS')) {
        el.classes= 'p-0 m-0 gruz-font-80'
        el.headerClasses= 'gruz-font-80 gruz-bg-4  pb-1 pt-2'
        el.headerStyle= () => ({ width: '50px', textAlign: 'center' })
        el.align= 'center'
        return el
    }
    el.align= 'center'
    el.headerFormatter = (column) => <span className="gruz-verticalText">{ column.text } </span>
    el.headerClasses= 'gruz-font-70 gruz-bg-4  p-0 pt-2 m-0 text-nowrap align-top text-center gruz-text-ls'
    el.formatExtraData= {column: el.dataField, stancName: el.text}
    el.formatter= (cell, row, rowIndex, formatExtraData)=> (cell===0 ? '' :
            <OverlayTrigger
                key={`tooltip-${row.ID}-${formatExtraData.column}`}
                placement={'top'}
                overlay={
                    <Tooltip id={`tooltip-${row.ID}-${formatExtraData.column}` } className={'tooltip-top'}>
                        <span className={'gruz-font-70'}>На станции <strong>{formatExtraData.stancName}</strong> до станции <strong>{row.NAME}</strong></span>
                    </Tooltip>
                }
            >
                <div style={{ cursor: "pointer"}}>{ cell }</div>
            </OverlayTrigger>
    )
    el.classes= 'p-0 m-0 gruz-font-80'
    return el })


export default (moduleName)=> {
    switch (moduleName) {
        case 'findpoezdvagons':
        case 'naturki':
        case 'podhod':
        case 'pogrvygr':
        case 'findvagons':
        case 'findvagonsall':
            return addFindVagonsClasses(tablesColumns[moduleName])
        case 'spravka31':
            return addSpravka31Classes(tablesColumns[moduleName])
        case 'spravka1':
        case 'spravka2':
            return addSpravka1Classes(tablesColumns['spravka1'])
        case 'findvagonhistory':
            return addFindVagonsClasses(tablesColumns[moduleName])
        default:
            return tablesColumns[moduleName]
    }
}

