import type { users } from '@prisma/client';
import type { users_addresses } from '@prisma/client';
import { Dayjs } from 'dayjs';

export type User = users;

export enum AddressType {
	Home = 'HOME',
	Invoice = 'INVOICE',
	Post = 'POST',
	Work = 'WORK'
}
export type Address = Omit<users_addresses, 'address_type'> & {
	address_type: AddressType;
};

export type AddressData = Omit<
	users_addresses,
	'user_id' | 'created_at' | 'updated_at' | 'address_type'
> & {
	address_type: AddressType;
};

export type AddressFormData = Omit<
	Address,
	'user_id' | 'created_at' | 'updated_at' | 'address_type' | 'valid_from'
> & {
	address_type: AddressType | '';
	valid_from: Dayjs | '';
};
export type AddressShort = Omit<
	Address,
	'user_id' | 'created_at' | 'updated_at' | 'address_type' | 'valid_from'
>;
