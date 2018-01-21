import React from 'react';
import ucfirst from '../../../tools/ucfirst';


export default function InputField(props)
{
	const name = props.name,
		type = props.type || 'text',
		value = name === 'email' ? props.value : ucfirst(props.value);

	return (
		<div className='clear_fix'>
			<label htmlFor={name}>{props.label_text}:</label>
			<input name={name} id={name} type={type} value={value} onChange={props.set_input_data.bind(this, name)} />
		</div>
	)
}