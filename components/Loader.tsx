import { CircularProgress } from '@mui/material';
import React from 'react';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
	return (
		<div className="w-full h-full absolute bg-transparent top-0 left-0 flex justify-center items-center z-10">
			<CircularProgress />
		</div>
	);
};

export default Loader;
