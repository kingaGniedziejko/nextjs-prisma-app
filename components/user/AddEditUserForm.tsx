'use client';

import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { IFormState } from '@/lib/types/IFormState.interface';
import { userStatusList } from '@/lib/const';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import { User, UserFormData } from '@/lib/types/User.type';
import { saveUser } from '@/actions/userActions';

interface AddEditUserFormProps {
	userToEdit?: User;
	redirectPath?: string;
}

const AddEditUserForm: React.FC<AddEditUserFormProps> = ({ userToEdit, redirectPath }) => {
	const router = useRouter();

	const goBack = () => {
		if (redirectPath) {
			router.push(redirectPath);
		} else {
			router.back();
		}
	};

	const defaultUser: UserFormData = {
		first_name: userToEdit?.first_name || '',
		last_name: userToEdit?.last_name || '',
		email: userToEdit?.email || '',
		status: userToEdit?.status || ''
	};

	const [userValue, setUserValue] = React.useState<UserFormData>(defaultUser);

	const handleUserChange = <T,>(key: keyof UserFormData, value: T) => {
		setUserValue((prev) => ({ ...prev, [key]: value }));
	};

	const [state, formAction, isPending] = React.useActionState<
		Partial<IFormState<UserFormData>>,
		FormData
	>(saveUser.bind(null, userToEdit?.id), {}, '/');

	React.useEffect(() => {
		if (state.redirect) goBack();
	}, [state.redirect]);

	const handleCancel = () => {
		goBack();
	};

	return (
		<>
			{isPending && <Loader />}
			<form id="add-edit-user-form" action={formAction} className="flex flex-col !space-y-5">
				<TextField
					id="first_name"
					name="first_name"
					label="First name"
					type="text"
					fullWidth
					variant="standard"
					value={userValue.first_name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleUserChange('first_name', event.target.value)
					}
					error={!!state.errors?.first_name}
					helperText={state.errors?.first_name}
				/>
				<TextField
					id="last_name"
					name="last_name"
					label="Last name"
					type="text"
					fullWidth
					variant="standard"
					value={userValue.last_name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleUserChange('last_name', event.target.value)
					}
					error={!!state.errors?.last_name}
					helperText={state.errors?.last_name}
				/>
				<TextField
					id="email"
					name="email"
					label="Email"
					type="text"
					fullWidth
					variant="standard"
					value={userValue.email}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleUserChange('email', event.target.value)
					}
					error={!!state.errors?.email}
					helperText={state.errors?.email}
				/>
				<FormControl fullWidth variant="standard" error={!!state.errors?.status}>
					<InputLabel id="status_label">Status</InputLabel>
					<Select
						id="status"
						name="status"
						labelId="status_label"
						label="Status"
						value={userValue.status}
						onChange={(event) => handleUserChange('status', event.target.value)}
					>
						{userStatusList.map((status) => (
							<MenuItem value={status}>{status}</MenuItem>
						))}
					</Select>
				</FormControl>
				<div className="sticky w-full bottom-0 right-0 flex flex-row justify-end !space-x-3 py-5 bg-white">
					<Button variant="outlined" onClick={handleCancel} disabled={isPending}>
						Cancel
					</Button>
					<Button variant="contained" type="submit" form="add-edit-user-form" disabled={isPending}>
						Save
					</Button>
				</div>
			</form>
		</>
	);
};

export default AddEditUserForm;
