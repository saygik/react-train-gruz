const tablesColumns= {
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

}

export default (moduleName)=> {
    switch (moduleName) {
        case 'podhod':
        case 'pogrvygr':
        case 'findvagons':
            return tablesColumns[moduleName].map((elem)=>{
                const el=elem
                el.classes= 'gruz-font-70 p-1 m-0'
                el.headerClasses= 'gruz-bg-header-two gruz-font-90 gruz-font-normal m-0 p-0'
                el.headerAlign= 'center'
                return el
            })
        case 'findvagonhistory':
            return tablesColumns[moduleName].map((elem)=>{
                const el=elem
                el.classes= 'gruz-font-70 p-1 m-0'
                el.headerClasses= 'gruz-bg-header-two gruz-font-90 gruz-font-normal m-0 p-0'
                el.headerAlign= 'center'
                return el
            })
        default:
            return tablesColumns[moduleName]
    }
}
