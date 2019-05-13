import React from 'react'
import { Select} from '../form-components'
import { Button} from 'react-bootstrap';
import FindVagonsPodhodButton from './find-vagons-podhod-button'
import {Input} from '../form-components'
const FindVagonsFilters = ({
                               selectedStantionTo,
                               selectedStantionToValues,
                               selectStantionTo,
                               selectedClient,
                               selectedClientValues,
                               selectClient,
                               selectedGruzValues,
                               selectedGruz,
                               selectGruz,
                               selectPodhod,
                               selectedPodhod,
                               selectedTipVagons,
                               selectTipVagons,
                               selectedVagonKod,
                               selectVagonKod,
                               clearVagonKod,
                               findVagons
                           }) => {
    return <div className={'d-flex gruz-font-80 pt-1 justify-content-md-center'}>
        <div style={{width: '9rem'}} className={'gruz-text-ls-sm gruz-font-70 pl-1 pr-2 '}>
            <FindVagonsPodhodButton  selected={selectedPodhod===1}  text={'на отделении'}
                                     selectPodhod={selectPodhod} podhodNumber={1}/>
            <FindVagonsPodhodButton  selected={selectedPodhod===0}  text={'дальний подход'}
                                     selectPodhod={selectPodhod} podhodNumber={0}/>
            <FindVagonsPodhodButton  selected={selectedPodhod===2}  text={'без ограничений'}
                                     selectPodhod={selectPodhod} podhodNumber={2}/>
        </div>
        <div style={{width: '9rem'}} className={'gruz-text-ls-sm gruz-font-70 pl-1 pr-2 '}>
            <FindVagonsPodhodButton  selected={selectedTipVagons===1}  text={'груженые вагоны'}
                                     selectPodhod={selectTipVagons} podhodNumber={1}/>
            <FindVagonsPodhodButton  selected={selectedTipVagons===2}  text={'порожние вагоны'}
                                     selectPodhod={selectTipVagons} podhodNumber={2}/>
            <FindVagonsPodhodButton  selected={selectedTipVagons===3}  text={'приписные вагоны'}
                                     selectPodhod={selectTipVagons} podhodNumber={3}/>
            <FindVagonsPodhodButton  selected={selectedTipVagons===0}  text={'без ограничений'}
                                     selectPodhod={selectTipVagons} podhodNumber={0}/>
        </div>

        <div className={'d-block'}>
          <div className={'pb-1'}>
              <Select
                  placeholder={'Выбирите станцию назначения...'}
                  options={selectedStantionTo}
                  value={selectedStantionToValues}
                  onChange={selectStantionTo}
                  isSearchable={true}
                  isClearable={true}
                  isMulti={false}
              />
          </div>
            <div >
                <Select
                    placeholder={'Выбирите грузополучателя...'}
                    options={selectedClient}
                    value={selectedClientValues}
                    onChange={selectClient}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                />
            </div>
        </div>
        <div className={'d-block'}>
            <div className={'pb-1'}>
                <Select
                    placeholder={'Выбирите род груза...'}
                    options={selectedGruz}
                    value={selectedGruzValues}
                    onChange={selectGruz}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                />
            </div>
            <div className={'pl-1 gruz-font-70 form-group has-feedback has-clear'}>
                <Input value={selectedVagonKod} onChange={selectVagonKod} clearText={clearVagonKod}/>
            </div>
        </div>
        <div className={'pl-4 pt-3'}>
            <Button
                variant="secondary"

                disabled={false}
                onClick={findVagons}
            >
                Поиск
            </Button>
        </div>
    </div>
}
export default FindVagonsFilters


