import React from 'react'
import SelectPodhod from './select-podhod'
import SelectStantions from './select-stantions'

const VagonPodhodSelectors = ({ stantionsOptions,
                                  selectedStantion,
                                  selectCurrentStantion,
                                  selectedPodhod,
                                  numPodhods,
                                  selectCurrentPodhod,
                                  children }) =>
            <div>
                <SelectPodhod selectedPodhod={selectedPodhod} numPodhods={numPodhods} selectCurrentPodhod={selectCurrentPodhod}/>
                <SelectStantions stantionsOptions={stantionsOptions} selectedStantion={selectedStantion} selectCurrentStantion={selectCurrentStantion}/>
                {children}
            </div>

export default VagonPodhodSelectors
