import React from 'react';

const Input = props => {
  let inputElement = null;
  const inputClasses = ['styled-input'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }

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
    <div className={inputClasses.join(" ")}>
      <label htmlFor={props.elementConfig.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;