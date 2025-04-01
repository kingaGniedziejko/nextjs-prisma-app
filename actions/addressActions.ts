'use server';

import { createUserAddress, deleteUserAddress, updateUserAddress } from '@/lib/data/addresses';
import { IFormState } from '@/lib/types/IFormState.interface';
import { AddressData, AddressFormData, AddressType } from '@/lib/types/Address.type';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const saveAddress = async (
	userId: number,
	isEdit: boolean,
	originalAddressType: AddressType | undefined,
	originalValidFrom: Date | undefined,
	_previousState: Partial<IFormState<AddressFormData>>,
	formData: FormData
): Promise<IFormState<AddressFormData>> => {
	// Validation
	let newErrors = {};
	// address_type
	if (formData.get('address_type')?.toString() === '')
		newErrors = { ...newErrors, address_type: 'Please select the value' };
	// valid_from
	if (formData.get('valid_from')?.toString() === '')
		newErrors = { ...newErrors, valid_from: 'Please enter the value' };
	// street
	if (formData.get('street')?.toString() === '')
		newErrors = { ...newErrors, street: 'Please enter the value' };
	// building_number
	if (formData.get('building_number')?.toString() === '')
		newErrors = { ...newErrors, building_number: 'Please enter the value' };
	// post_code
	if (formData.get('post_code')?.toString() === '')
		newErrors = { ...newErrors, post_code: 'Please enter the value' };
	// city
	if (formData.get('city')?.toString() === '')
		newErrors = { ...newErrors, city: 'Please enter the value' };
	// country_code
	if (formData.get('country_code')?.toString() === '')
		newErrors = { ...newErrors, country_code: 'Please enter the value' };

	if (!(Object.keys(newErrors).length === 0 && newErrors.constructor === Object)) {
		return { errors: newErrors };
	}

	const addressData: AddressData = {
		address_type: formData.get('address_type') as AddressType,
		valid_from: new Date(formData.get('valid_from')?.toString() || ''),
		street: formData.get('street')?.toString() || '',
		building_number: formData.get('building_number')?.toString() || '',
		post_code: formData.get('post_code')?.toString() || '',
		city: formData.get('city')?.toString() || '',
		country_code: formData.get('country_code')?.toString() || ''
	};

	if (isEdit && originalAddressType && originalValidFrom) {
		await updateUserAddress(userId, originalAddressType, originalValidFrom, addressData);
	} else {
		await createUserAddress(userId, addressData);
	}

	revalidatePath(`/${userId}`);
	redirect(`/${userId}`);
};

export const deleteAddress = async (userId: number, addressType: AddressType, validFrom: Date) => {
	await deleteUserAddress(userId, addressType, validFrom);
	revalidatePath(`/${userId}`);
};
