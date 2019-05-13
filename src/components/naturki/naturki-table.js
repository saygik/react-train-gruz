import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import {FindPoezdVagons} from '../findpoezd'

const NaturkiTable = ({data, columns, selectedRow, selectRow, closeExpanded}) =>
            <div className={'pt-1'}>
                <BootstrapTable keyField='Id'
                                data={ data }
                                classes={'table-responsive-xl text-nowrap'}
                                columns={ columns }
                                condensed
                                expandRow={ {
                                    renderer: () => (
                                        <div className={'p-0 m-0 gruz-bg-4'}>
                                            <FindPoezdVagons criteria={selectedRow} closeExpanded={closeExpanded} />
                                        </div>
                                    ),
                                    onlyOneExpanding: true,
                                    expandByColumnOnly: true,
                                    expanded: selectedRow=== null ? [] : [selectedRow.id]
                                } }
                                rowEvents={ { onClick: (e, row ) => selectRow({id: row.Id})} }
                />
            </div>

export default NaturkiTable
