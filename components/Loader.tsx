import { CircularProgress } from '@mui/material';
import React from 'react';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
	return (
		<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
			<CircularProgress />
		</div>
	);
};

export default Loader;
