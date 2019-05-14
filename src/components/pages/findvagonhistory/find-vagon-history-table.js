import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const FindVagonHistoryTable = ({historyRecords, columns}) =>
            <div>
                <BootstrapTable keyField='Id' data={ historyRecords } classes={'gruz-bg-1 mt-1'} columns={ columns }   condensed  />
            </div>

export default FindVagonHistoryTable
