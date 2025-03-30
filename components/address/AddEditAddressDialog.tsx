import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Address } from '@/lib/types/types';
import AddEditAddressForm from './AddEditAddressForm';

interface AddEditAddressDialogProps {
	open: boolean;
	handleClose: () => void;
	isEdit?: boolean;
	userId: number;
	addressToEdit?: Address;
}

const AddEditAddressDialog: React.FC<AddEditAddressDialogProps> = ({
	open,
	handleClose,
	isEdit = false,
	userId,
	addressToEdit
}) => {
	const handleCloseDialog = () => {
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
			<DialogTitle className="flex flex-row items-center">
				{isEdit ? 'Edit Address' : 'Create Address'}
				<IconButton
					className="!ml-auto"
					aria-label="close"
					onClick={handleCloseDialog}
					sx={{ marginRight: '-8px' }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<AddEditAddressForm userId={userId} addressToEdit={addressToEdit} />
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={handleCloseDialog}>
					Cancel
				</Button>
				<Button variant="contained" type="submit" form="add-edit-address-form">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddEditAddressDialog;
