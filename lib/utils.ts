import { addressTypeList } from './const';
import { AddressType } from './types/Address.type';

export const stringToColor = (string: string) => {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
};

export const parseAddressId = (userId: number, addressType: AddressType, validFrom: Date) => {
	return `${userId}_${addressType}_${validFrom.toISOString()}`;
};

export const splitAddressId = (
	id: string
): [userId: number, addressType: AddressType, validFrom: Date] | null => {
	const colonSymbol = '%3A';
	const idComponents = id.split('_');

	const userId = Number.parseInt(idComponents[0]);
	const addressType = idComponents[1];
	const validFrom = new Date(idComponents[2].replaceAll(colonSymbol, ':'));

	if (isNaN(userId)) return null;
	if (!addressTypeList.includes(addressType as AddressType)) return null;
	if (!validFrom) return null;

	return [userId, addressType as AddressType, validFrom];
};
