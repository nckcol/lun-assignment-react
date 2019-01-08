import React from 'react';
import './checkbox.scss';

function Checkbox({label, ...inputProps}) {
  return (
    <label className="Checkbox">
      <input className="Checkbox-el" type="checkbox" {...inputProps} />
      {label}
    </label>
  );
}

export default Checkbox;
