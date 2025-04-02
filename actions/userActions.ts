'use server';

import { createUser, deleteUser, updateUser } from '@/lib/data/users';
import { IFormState } from '@/lib/types/IFormState.interface';
import { UserData, UserFormData, UserStatus } from '@/lib/types/User.type';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const saveUser = async (
	id: number | undefined,
	_previousState: Partial<IFormState<UserFormData>>,
	formData: FormData
): Promise<IFormState<UserFormData>> => {
	// Validation
	let newErrors = {};
	// first_name
	if (formData.get('first_name')?.toString() === '')
		newErrors = { ...newErrors, first_name: 'Please select the value' };
	// last_name
	if (formData.get('last_name')?.toString() === '')
		newErrors = { ...newErrors, last_name: 'Please enter the value' };
	// email
	if (formData.get('email')?.toString() === '')
		newErrors = { ...newErrors, email: 'Please enter the value' };
	// status
	if (formData.get('status')?.toString() === '')
		newErrors = { ...newErrors, status: 'Please enter the value' };

	if (!(Object.keys(newErrors).length === 0 && newErrors.constructor === Object)) {
		return { errors: newErrors };
	}

	const isEdit = !!id;
	const firstName = formData.get('first_name')?.toString() || '';
	const lastName = formData.get('last_name')?.toString() || '';

	const userData: UserData = {
		first_name: firstName,
		last_name: lastName,
		email: formData.get('email')?.toString() || '',
		status: formData.get('status') as UserStatus,
		initials: firstName[0] + lastName[0]
	};

	if (isEdit) {
		await updateUser(id, userData);
	} else {
		await createUser(userData);
	}

	revalidatePath('/');
	return { redirect: true };
};

export const removeUser = async (id: number) => {
	await deleteUser(id);
	revalidatePath('/');
};
