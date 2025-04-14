import React from 'react'
import { optional } from 'zod'
import { useRestaurantStore } from '../store/useRestaurantStore'

const filterOptions = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" }
]
const FilterPage = () => {
    const { setAppliedFilter,appliedFilter, resetAppliedFilter } = useRestaurantStore();
    const handleClickCheckBox = (value) => {
        setAppliedFilter(value);
    }
  return (
    <div className='md:w-72'>
          <div className='flex items-center justify-between'>
              <h1 className='font-medium text-lg'>Filter By Cuisines</h1>
              <button onClick={()=>resetAppliedFilter()} className='cursor-pointer'>Reset</button>
          </div>
          {
              filterOptions.map((options) => (
                  <div key={options.id} className='flex items-center space-x-2 my-5'>
                      <input
                          type="checkbox"
                          name="cuisine"
                          checked={appliedFilter.includes(options.label)}
                          id={options.id}
                          onClick={()=>handleClickCheckBox(options.label)}
                          className='md:w-4 w-4 h-4 md:h-4 border-2  border-gray-300 rounded-lg peer-checked:bg-blue-500 peer-checked:border-blue-500 transition' />
                      <label htmlFor={options.id} className=' text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{options.label }</label>
                  </div>
              ))
          }
    </div>
  )
}

export default FilterPage
