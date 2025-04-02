'use client';

import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AddressDisplay from './AddressDisplay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Address, AddressFormData } from '@/lib/types/Address.type';
import dayjs from 'dayjs';
import { IFormState } from '@/lib/types/IFormState.interface';
import { saveAddress } from '@/actions/addressActions';
import { addressTypeList, dateFormat } from '@/lib/const';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';

interface AddEditAddressFormProps {
	userId: number;
	addressToEdit?: Address;
}

const AddEditAddressForm: React.FC<AddEditAddressFormProps> = ({ userId, addressToEdit }) => {
	const router = useRouter();

	const defaultAddress: AddressFormData = {
		address_type: addressToEdit?.address_type || '',
		valid_from: addressToEdit ? dayjs(addressToEdit?.valid_from.toISOString()) : '',
		post_code: addressToEdit?.post_code || '',
		city: addressToEdit?.city || '',
		country_code: addressToEdit?.country_code || '',
		street: addressToEdit?.street || '',
		building_number: addressToEdit?.building_number || ''
	};

	const [addressValue, setAddressValue] = React.useState<AddressFormData>(defaultAddress);

	const handleAddressChange = <T,>(key: keyof AddressFormData, value: T) => {
		setAddressValue((prev) => ({ ...prev, [key]: value }));
	};

	const [state, formAction, isPending] = React.useActionState<
		Partial<IFormState<AddressFormData>>,
		FormData
	>(
		saveAddress.bind(
			null,
			userId,
			!!addressToEdit,
			addressToEdit?.address_type,
			addressToEdit?.valid_from
		),
		{},
		`/${userId}`
	);

	const handleCancel = () => {
		router.push(`/${userId}`);
	};

	return (
		<>
			{isPending && <Loader />}
			<form id="add-edit-address-form" action={formAction} className="flex flex-col !space-y-5">
				<FormControl fullWidth variant="standard" error={!!state.errors?.address_type}>
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
								error: !!state.errors?.valid_from,
								helperText: state.errors?.valid_from
							}
						}}
						format={dateFormat}
						value={addressValue.valid_from || null}
						onChange={(value) => {
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
					error={!!state.errors?.street}
					helperText={state.errors?.street}
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
					error={!!state.errors?.building_number}
					helperText={state.errors?.building_number}
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
					error={!!state.errors?.post_code}
					helperText={state.errors?.post_code}
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
					error={!!state.errors?.city}
					helperText={state.errors?.city}
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
					error={!!state.errors?.country_code}
					helperText={state.errors?.country_code}
				/>
				<div className="!mt-5 flex flex-col">
					<p>Address preview:</p>
					<AddressDisplay className="mt-1" address={addressValue} />
				</div>
				<div className="sticky w-full bottom-0 right-0 flex flex-row justify-end !space-x-3 py-5 bg-white">
					<Button variant="outlined" onClick={handleCancel} disabled={isPending}>
						Cancel
					</Button>
					<Button
						variant="contained"
						type="submit"
						form="add-edit-address-form"
						disabled={isPending}
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
};

export default AddEditAddressForm;
