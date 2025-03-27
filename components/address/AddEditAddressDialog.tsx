import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Address, AddressFormData, AddressType } from '@/lib/types/types';
import { saveUserAddress } from '@/actions/userAddressActions';
import { IFormState } from '@/lib/types/IFormState.interface';
import AddressDisplay from './AddressDisplay';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { dateFormat } from '@/lib/const';
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
