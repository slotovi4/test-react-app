import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
	const notFoundCN = cn('NotFound');

	return (
		<section className={notFoundCN()}>
			<span className={notFoundCN('Title')}>
				PAGE NOT FOUND
			</span>
			<span className={notFoundCN('Link')}>
				Go <Link to='/'>HOME</Link>
			</span>
		</section>
	);
};

export default React.memo(NotFound);
