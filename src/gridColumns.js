import React, { Component } from 'react';


function countFormatter(cell, row) {
    if (cell==0) {
        return (
           ''
        );
    }
    return (<div style={{ cursor: "pointer"}}>{ cell }</div>);
}
function simplyColumn(name, text, headerClass, isGroupSum) {
   return ({
       dataField: name,
       text: text,
       headerAlign: 'center',
       align: 'center',
       formatter: countFormatter,
       headerClasses:'grid-header-font ' + headerClass,
       classes: (cell, row, rowIndex, colIndex) => {
           if (cell  === 0) return isGroupSum ? headerClass : 'grid-empty-col grid-cell-pad';
           return 'grid-cell grid-font ' +( isGroupSum ? headerClass : '');
       },
       events: {
           onClick: (e, column, columnIndex, row, rowIndex) => {
            //   console.log(e);
               console.log('col',{string: row.TIPZAP, row: row.KODS, col: column.dataField });
               if (!this.state.expanded.includes(2)) {
                   this.setState(() => ({
                       expanded: [...this.state.expanded, 2]
                   }));
               } else {
                   this.setState(() => ({
                       expanded: this.state.expanded.filter(x => x !== 2)
                   }));
               }

              },
       }

   });
}

const columns = [
    {
        dataField: 'TIPZAP',
        text: '#',
        hidden: true
    },
    {
        dataField: 'NAME',
        text: 'Станция',
        classes: 'grid-cell-pad grid-name-col',
        headerStyle: (colum, colIndex) => {
            return { width: '180px', textAlign: 'center' };
        }
    }, {
        dataField: 'KODS',
        text: 'КОД',
        headerAlign: 'center',
        headerClasses: 'grid-header-font',
        classes: 'grid-cell-pad grid-font',

    },
    simplyColumn('COLS','ВСЕГО','grid-end-group1',true),
    simplyColumn('COLS1','КЛ','grid-end-group1',false),
    simplyColumn('COLS2','ПЛ','grid-end-group1',false),
    simplyColumn('COLS3','ПВ','grid-end-group1',false),
    simplyColumn('COLS4','ЦС','grid-end-group1',false),
    simplyColumn('COLS5','РЕФ','grid-end-group1',false),
    simplyColumn('COLS6','ПР','grid-end-group1',false),
    simplyColumn('COLP','ВСЕГО','grid-end-group2',true),
    simplyColumn('COLP1','КЛ','grid-end-group2',false),
    simplyColumn('COLP2','ПЛ','grid-end-group2',false),
    simplyColumn('COLP3','ПВ','grid-end-group2',false),
    simplyColumn('COLP4','ЦС','grid-end-group2',false),
    simplyColumn('COLP5','РЕФ','grid-end-group2',false),
    simplyColumn('COLP6','ПР','grid-end-group2',false),
    simplyColumn('COLD','ВСЕГО','grid-end-group3',true),
    simplyColumn('COLD1','КЛ','grid-end-group3',false),
    simplyColumn('COLD2','ПЛ','grid-end-group3',false),
    simplyColumn('COLD3','ПВ','grid-end-group3',false),
    simplyColumn('COLD4','ЦС','grid-end-group3',false),
    simplyColumn('COLD5','РЕФ','grid-end-group3',false),
    simplyColumn('COLD6','ПР','grid-end-group3',false),
     {
        dataField: 'COL',
        text: 'ИТОГО',
        align: 'center',
        headerClasses: 'grid-end-col grid-header-font',
        classes: 'grid-cell-pad grid-end-col grid-font',


    }];
export default columns;