'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface FormActionButtonsProps {
	userId: number;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({ userId }) => {
	const router = useRouter();
	const handleCancel = () => {
		router.push(`/${userId}`);
	};

	return (
		<div className="flex flex-row justify-end !space-x-3">
			<Button variant="outlined" onClick={handleCancel}>
				Cancel
			</Button>
			<Button variant="contained" type="submit" form="add-edit-address-form">
				Save
			</Button>
		</div>
	);
};

export default FormActionButtons;
