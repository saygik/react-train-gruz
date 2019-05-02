import moment from 'moment'

export function getCurrentDateTime() {
    // return moment().format("DD.MM.YYYY H:mm:ss")
     return moment().format("H:mm:ss")
}
export function getFindVagonTipFromColImm(cell) {
    const col=cell.get('col')
    let tipVagons=['','КЛ','ПЛ','ПВ','ЦС','РЕФ','ПР']
    let tip= col.length<5 ? 0 : parseInt(col.charAt(4))
    /*eslint-disable no-self-compare */

    tip = (tip!==tip) ? 0 : tip

    let onStation =col.charAt(3)==='S' ? 1:0
    let onNod =col.charAt(3)==='P' || col.charAt(3)==='S' ? 1:0
    return {
        id: cell.get('ID'),
        tip: tip,
        tipName:tipVagons[tip] ,
        onStation: onStation,
        onNod: onNod,
        col: cell.get('col'),
        stan: cell.get('KODS'),
        stanName: cell.get('NAME')
    }

}
export function getPogrVygrTipOperFromColImm(cell) {
    const col=cell.get('col')
    let tipVagons=['','КЛ','ПЛ','ПВ','ЦС','РЕФ','ПР']
    let tip= col.length<5 ? 0 : parseInt(col.charAt(4))
    /*eslint-disable no-self-compare */

    tip = (tip!==tip) ? 0 : tip

    const oper =col.charAt(3)==='S' ? 88:col.charAt(3)==='P'? 89:10
    return {
        id: cell.get('ID'),
        tip: tip,
        tipName:tipVagons[tip] ,
        oper: oper,
        col: cell.get('col'),
        stan: cell.get('KODS'),
        stanName: cell.get('NAME')
    }

}
export function getFindVagonTipFromCol(cell) {
    let tipVagons=['','КЛ','ПЛ','ПВ','ЦС','РЕФ','ПР']
    let tip= cell.col.length<5 ? 0 : parseInt(cell.col.charAt(4))
    /*eslint-disable no-self-compare */

    tip = (tip!==tip) ? 0 : tip

    let onStation =cell.col.charAt(3)==='S' ? 1:0
    let onNod =cell.col.charAt(3)==='P' || cell.col.charAt(3)==='S' ? 1:0
    return {id: cell.id, tip: tip,tipName:tipVagons[tip] ,onStation: onStation, onNod: onNod, col: cell.col}

}
export function getPogrVygrTipOperFromCol(cell) {
    const tipVagons=['','КЛ','ПЛ','ПВ','ЦС','РЕФ','ПР']
    let tip= cell.col.length<5 ? 0 : parseInt(cell.col.charAt(4))
    /*eslint-disable no-self-compare */
    tip = (tip!==tip) ? 0 : tip

    const oper =cell.col.charAt(3)==='S' ? 88:cell.col.charAt(3)==='P'? 89:10
    return {id: cell.id, tip: tip,tipName:tipVagons[tip] , oper: oper, col: cell.col}

}

export function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
}

