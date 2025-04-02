import { AddressType } from './types/Address.type';
import { UserStatus } from './types/User.type';

export const dateFormat = 'YYYY-MM-DD';

export const addressTypeList = [
	AddressType.Home,
	AddressType.Invoice,
	AddressType.Post,
	AddressType.Work
];

export const userStatusList = [UserStatus.Active, UserStatus.Inactive];
