'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

interface ModalProps {
	title: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
	const router = useRouter();

	const handleCloseDialog = () => {
		router.back();
	};

	return (
		<Dialog open={true} onClose={handleCloseDialog} fullWidth maxWidth="sm">
			<DialogTitle className="flex flex-row items-center">
				{title}
				<IconButton
					className="!ml-auto"
					aria-label="close"
					onClick={handleCloseDialog}
					sx={{ marginRight: '-8px' }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			{/* <DialogActions>
				<Button variant="outlined" onClick={handleCloseDialog}>
					Cancel
				</Button>
				<Button variant="contained" type="submit" form="add-edit-address-form">
					Save
				</Button>
			</DialogActions> */}
		</Dialog>
	);
};

export default Modal;
