import React from 'react'
import { PageTemplate } from '../../shared/containers/index'
import NaturkiTable from "./naturki-table"
import NaturkiSelectors from "./naturki-selectors"

const NaturkiUI = ({   caption,
                       firstLoad,
                       infoMsg,
                       loading,
                       fetchAll,
                       data,
                       bNod,
                       bAllNaturki,
                       allNaturkiCheck,
                       nodCheck,
                       autoUpdateTime,
                       optionsStantionFrom,
                       optionsStantionTo,
                       selectedStantionFromValue,
                       selectedStantionToValue,
                       selectStantionFrom,
                       selectStantionTo,
                       selectedRow,
                       selectRow,
                       closeExpanded,
                       columns
                   }) =>
                    <PageTemplate
                        fetchAll={fetchAll}
                        firstLoad={firstLoad}
                        loading={loading}
                        infoMsg={infoMsg}
                        autoUpdateTime={autoUpdateTime}
                        caption={caption} >
                        <NaturkiSelectors bNod={bNod}
                                          bAllNaturki={bAllNaturki}
                                          allNaturkiCheck={allNaturkiCheck}
                                          nodCheck={nodCheck}
                                          selectedStantionFromValue={selectedStantionFromValue}
                                          selectedStantionToValue={selectedStantionToValue}
                                          selectStantionFrom={selectStantionFrom}
                                          selectStantionTo={selectStantionTo}
                                          optionsStantionFrom={optionsStantionFrom}
                                          optionsStantionTo={optionsStantionTo} />
                        <NaturkiTable data={data}
                                      columns={columns}
                                      selectedRow={selectedRow}
                                      selectRow={selectRow}
                                      closeExpanded={closeExpanded}
                        />
                    </PageTemplate>

export default NaturkiUI
