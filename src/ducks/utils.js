export function getCurrentDateTime() {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    return date + '.' + month + '.' + year + ' ' + hours + ':' + min + ':' + sec
}
export function getFindVagonTipFromCol(cell) {
    let tipVagons=['всех','КЛ','ПЛ','ПВ','ЦС','РЕФ','ПР']
    let tip= cell.col.length<5 ? 0 : parseInt(cell.col.charAt(4))
    tip = (tip!==tip) ? 0 : tip

    let onStation =cell.col.charAt(3)==='S' ? 1:0
    let onNod =cell.col.charAt(3)==='P' || cell.col.charAt(3)==='S' ? 1:0
    return {id: cell.id, tip: tip,tipName:tipVagons[tip] ,onStation: onStation, onNod: onNod, col: cell.col}

}