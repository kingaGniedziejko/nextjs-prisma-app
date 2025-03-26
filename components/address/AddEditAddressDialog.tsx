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
	const addressTypeList = [
		AddressType.Home,
		AddressType.Invoice,
		AddressType.Post,
		AddressType.Work
	];
	const defaultAddress: AddressFormData = {
		address_type: addressToEdit?.address_type || '',
		valid_from: dayjs(addressToEdit?.valid_from) || dayjs(),
		post_code: addressToEdit?.post_code || '',
		city: addressToEdit?.city || '',
		country_code: addressToEdit?.country_code || '',
		street: addressToEdit?.street || '',
		building_number: addressToEdit?.building_number || ''
	};

	const [addressValue, setAddressValue] = React.useState<AddressFormData>(defaultAddress);

	React.useEffect(() => {
		if (open) handleResetForm();
	}, [open]);

	const handleAddressChange = <T,>(key: keyof AddressFormData, value: T) => {
		setAddressValue((prev) => ({ ...prev, [key]: value }));
	};

	const handleResetForm = () => {
		console.log(defaultAddress);
		setAddressValue(defaultAddress);
	};

	const [state, formAction, isPending] = React.useActionState<
		Partial<IFormState<AddressFormData>>,
		FormData
	>(saveUserAddress.bind(null, userId, isEdit), {});

	const handleCloseDialog = () => {
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseDialog}
			fullWidth
			maxWidth="sm"
			// slotProps={{
			// 	paper: {
			// 		component: 'form',
			// 		onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
			// 			event.preventDefault();
			// 			const formData = new FormData(event.currentTarget);
			// 			const formJson = Object.fromEntries((formData as any).entries());
			// 			const email = formJson.email;
			// 			console.log(email);
			// 			handleClose();
			// 		}
			// 	}
			// }}
		>
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
				<form
					id="add-edit-address-form"
					action={formAction}
					className="flex flex-col !space-y-5 mb-8"
				>
					<FormControl fullWidth variant="standard" error={!!state.address_type}>
						<InputLabel id="address_type_label">Address type</InputLabel>
						<Select
							id="address_type"
							name="address_type"
							labelId="address_type_label"
							label="Address type"
							value={addressValue.address_type}
							onChange={(event) => handleAddressChange('address_type', event.target.value)}
						>
							{addressTypeList.map((addressType) => (
								<MenuItem value={addressType}>{addressType}</MenuItem>
							))}
						</Select>
					</FormControl>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							name="valid_from"
							label="Valid from"
							slotProps={{
								textField: {
									id: 'valid_from',
									variant: 'standard',
									fullWidth: true,
									error: !!state.valid_from,
									helperText: state.valid_from
								}
							}}
							format={dateFormat}
							value={addressValue.valid_from || null}
							onChange={(value) => {
								console.log(dayjs(value?.format(dateFormat)).toString());
								handleAddressChange('valid_from', value || '');
							}}
						/>
					</LocalizationProvider>
					<TextField
						id="street"
						name="street"
						label="Street"
						type="text"
						fullWidth
						variant="standard"
						value={addressValue.street}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleAddressChange('street', event.target.value)
						}
						error={!!state.street}
						helperText={state.street}
					/>
					<TextField
						id="building_number"
						name="building_number"
						label="Building number"
						type="text"
						fullWidth
						variant="standard"
						value={addressValue.building_number}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleAddressChange('building_number', event.target.value)
						}
						error={!!state.building_number}
						helperText={state.building_number}
					/>
					<TextField
						id="post_code"
						name="post_code"
						label="Post code"
						type="text"
						fullWidth
						variant="standard"
						value={addressValue.post_code}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleAddressChange('post_code', event.target.value)
						}
						error={!!state.post_code}
						helperText={state.post_code}
					/>
					<TextField
						id="city"
						name="city"
						label="City"
						type="text"
						fullWidth
						variant="standard"
						value={addressValue.city}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleAddressChange('city', event.target.value)
						}
						error={!!state.city}
						helperText={state.city}
					/>
					<TextField
						id="country_code"
						name="country_code"
						label="Country code"
						type="text"
						fullWidth
						variant="standard"
						value={addressValue.country_code}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleAddressChange('country_code', event.target.value)
						}
						error={!!state.country_code}
						helperText={state.country_code}
					/>
					<AddressDisplay address={addressValue} />
				</form>
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
