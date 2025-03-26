'use client';

import { Button } from '@mui/material';
import React from 'react';
import AddEditAddressDialog from './AddEditAddressDialog';
import { useDialog } from '@/lib/hooks/useDialog';

interface CreateAddressButtonProps {
	userId: number;
}

const CreateAddressButton: React.FC<CreateAddressButtonProps> = ({ userId }) => {
	const [open, handleOpen, handleClose] = useDialog();
	return (
		<>
			<Button variant="contained" onClick={handleOpen}>
				Create
			</Button>
			<AddEditAddressDialog open={open} handleClose={handleClose} userId={userId} />
		</>
	);
};

export default CreateAddressButton;
