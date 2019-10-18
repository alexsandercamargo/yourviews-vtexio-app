import React, { useState } from 'react'
import { Collapsible } from 'vtex.styleguide'

const ReviewFilter = (props: any) => {
  const [isFiltering, setIsFiltering] = useState(false);

  return (
    <div>
      <Collapsible
        header={<span>Filtros</span>}
        onClick={() => setIsFiltering(!isFiltering)}
        isOpen={isFiltering}
        >
          <div className="mt4">
            {props.filters.map((filter: any, filterIdx: number) =>
              <div 
                className="h4 w5 dib v-mid bg-near-white 
                  pa5 br1 mr4 mb4 overflow-y-auto" 
                key={filter.FilterId}>
                <label>{filter.Name}</label>
                <ul className="list pa0">
                  {filter.FilterValues.map((value: any, valueIdx: number) => 
                    <li className="pointer" key={value.FilterValueId} 
                      onClick={() => props.setFilter(filterIdx, valueIdx)}>
                        {value.Name} ({value.Count})
                        {value.Active === true && 
                        " x"}
                    </li>)}
                </ul>
              </div>)}
          </div>
      </Collapsible>
    </div>
  )
}

export default ReviewFilter