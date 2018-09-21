import React from 'react';

/**
 * Create dynamic inputs
 *  check the inputType to create dynamic inputs
 * spread the props to set the html attributes
 */
const Input = props => {
  let inputElement = null;

  switch(props.elementType){
    case ('input'):
      inputElement = <input 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.handleChange}/>;
      break;
    case ('textarea'):
      inputElement = <textarea 
      {...props.elementConfig} 
      value={props.value} 
      onChange={props.handleChange}/>;
      break;
    case ('select'):
      inputElement = 
          <select onChange={props.handleChange} value={props.value}>
            {props.elementConfig.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.display}
              </option>
            ))}
          </select>;
      break;
    default: 
      inputElement = <input 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.handleChange}/>;
  }

  return (
    <div className="styled-input">
      <label htmlFor={props.elementConfig.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;