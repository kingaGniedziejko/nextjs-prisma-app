'use server';

import { createUserAddress, updateUserAddress } from '@/lib/addresses';
import { dateFormat } from '@/lib/const';
import { IFormState } from '@/lib/types/IFormState.interface';
import { AddressData, AddressFormData, AddressType } from '@/lib/types/types';
import dayjs, { Dayjs } from 'dayjs';

// dayjs.extend(customParseFormat)

export const saveUserAddress = async (
	userId: number,
	isEdit: boolean,
	_previousState: Partial<IFormState<AddressFormData>>,
	formData: FormData
) => {
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

	// console.log(addressData);

	if (!(Object.keys(newErrors).length === 0 && newErrors.constructor === Object)) {
		return newErrors;
	}

	const addressData: AddressData = {
		address_type: formData.get('address_type') as AddressType,
		valid_from: dayjs(formData.get('valid_from')?.toString()).toDate(),
		street: formData.get('street')?.toString() || '',
		building_number: formData.get('building_number')?.toString() || '',
		post_code: formData.get('post_code')?.toString() || '',
		city: formData.get('city')?.toString() || '',
		country_code: formData.get('country_code')?.toString() || ''
	};

	await (isEdit ? updateUserAddress(userId, addressData) : createUserAddress(userId, addressData));

	return {};
};
