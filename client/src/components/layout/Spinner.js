import React from 'react';
import spinner from './spinner.svg';
const Spinner = ({ size }) => {
	return (
		<img className={`spinner spinner-${size}`} src={spinner} alt='loading...' />
	);
};
export default Spinner;
