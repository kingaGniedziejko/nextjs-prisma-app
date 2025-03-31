'use client';

import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CreateAddressButtonProps {
	userId: number;
}

const CreateAddressButton: React.FC<CreateAddressButtonProps> = ({ userId }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/${userId}/add`);
	};

	return (
		<Button variant="contained" onClick={handleClick}>
			Create
		</Button>
	);
};

export default CreateAddressButton;
