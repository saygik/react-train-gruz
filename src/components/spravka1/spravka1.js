import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import stanc2 from  '../../services/stanc'

import  './spravka1.css'

class Spravka1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stanc: [],
            isLoading: false,
            expanded: [],
            expandedCol: '',
            loadingDate: ''
        };
    }
    componentDidMount() {
        this.fetchStancVagons()
        this.timer = setInterval(() => this.fetchStancVagons(), 300000);
    }
    componentWillUnmount() {
        this.timer = null;
    }
    fetchStancVagons() {
        // var date = new Date().getDate(); //Current Date
        // var month = new Date().getMonth() + 1; //Current Month
        // var year = new Date().getFullYear(); //Current Year
        // var hours = new Date().getHours(); //Current Hours
        // var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds
        // this.setState({ isLoading: true});
        // fetch('http://api.brnv.rw/gruzSprav1')
        //     .then(response => response.json())
        //     .then(data => {
        //             this.setState({
        //                 stanc: data.addata,
        //                 isLoading: false,
        //                 loadingDate: date + '.' + month + '.' + year + ' ' + hours + ':' + min + ':' + sec})
        //         }
        //     )
        //     .catch(e => console.log(e));
        //
    }


    handleExpand(row) {
        const { expandedCol, expanded } = this.state;

        if (!expanded.includes(row.id)) {
            this.setState(() => ({expanded: [row.id], expandedCol: row.col}));
        } else {
            if (expandedCol===row.col) {
                this.setState(() => ({expanded: []}));
            } else {
                this.setState(() => ({expandedCol: row.col}));
            }

        }
        console.log('---',expanded)
    }
    render() {
        const { loadingDate, isLoading ,stanc, expanded, expandedCol } = this.state;
        var that=this;
        const columns = [
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
        const expandRow = {
            renderer: row => (
                <div className="container">
                    <p>{ `Это таблиза для строки ${row.ID}  и для колонки ${expandedCol}` }</p>

                </div>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: expanded
        };
        function countFormatter(cell, row) {
            if (cell===0) {
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
                    if (expanded.includes(rowIndex+1)) return 'grid-cell grid-font grid-cell-selected' ;

                    return 'grid-cell grid-font ' +( isGroupSum ? headerClass : '');
                },
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        //   console.log(e);
                        console.log('col',{string: row.TIPZAP, row: row.KODS, col: column.dataField });
                        that.handleExpand({id: row.ID, stan: row.KODS, col: column.dataField });


                    },
                }

            });
        }
        return (
            <div >
                <div  className="bd-table" >
                    <div  className="row justify-content-md-end">
                        <div className="col col-md-12 ">
                            { isLoading
                                ? <p>Обновление...</p>
                                : <p>Обновлено {loadingDate}</p>
                            }
                        </div>
                    </div>
                    <div  className="row ">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на станциях назначения
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на подходах к станции
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на дальнем подходе
                        </div>
                    </div>

                    <div  className="row ">
                        <div className="lg-auto">
                            <BootstrapTable keyField='ID' data={ stanc2 } columns={ columns } classes={'grid-cell-pad'}   hover condensed expandRow={ expandRow }  />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spravka1;
