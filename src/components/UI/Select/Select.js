import React from 'react'
import classes from './Select.module.scss'

const Select = ({changeHandler, options, sorting}) => {
  const renderOptions = () => {
    return options.map((item, i) => (
      <option
        key={i}
        value={item}
      >
        {item}
      </option>
    ))
  }

  return (
    <div className={classes.wrapper}>
      <select 
        className={classes.select} 
        title='Sort by'
        value={sorting}
        onChange={event => changeHandler(event.target.value)}
      >
        {renderOptions()}
      </select>
    </div>
  )
}

export default Select