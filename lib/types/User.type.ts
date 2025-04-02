import type { users } from '@prisma/client';

export enum UserStatus {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE'
}

export type User = Omit<users, 'status'> & {
	status: UserStatus;
};

export type UserData = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export type UserFormData = Omit<
	User,
	'created_at' | 'updated_at' | 'id' | 'initials' | 'status'
> & {
	status: UserStatus | '';
};
