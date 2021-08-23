import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td>
				<Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
				{edu.to ? <Moment format='DD/MM/YYYY'>{edu.to}</Moment> : 'NOW'}
			</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));
	return (
		<>
			<h2 className='my-2'>Education credentials</h2>
			<table className={'table'}>
				<thead>
					<tr>
						<th>School</th>
						<th className={'hide-sm'}>Degree</th>
						<th className={'hide-sm'}>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
};

export default Education;
