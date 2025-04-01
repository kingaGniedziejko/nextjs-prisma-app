'use client';

import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CreateUserButtonProps {}

const CreateUserButton: React.FC<CreateUserButtonProps> = ({}) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/add`);
	};

	return (
		<Button variant="contained" onClick={handleClick}>
			Create
		</Button>
	);
};

export default CreateUserButton;
