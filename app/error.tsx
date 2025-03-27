'use client';

import { Alert, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ErrorProps {
	error: Error;
	reset: any;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
	const router = useRouter();
	return (
		<div className="h-[100vh] flex flex-col space-y-5 items-center justify-center">
			<Alert severity="error">{error.message}</Alert>
			<Button variant="contained" onClick={() => router.push('/')}>
				Home Page
			</Button>
		</div>
	);
};

export default Error;
