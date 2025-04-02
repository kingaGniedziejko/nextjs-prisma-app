import { prisma } from '../prisma';
import { Address, AddressData, AddressType } from '../types/Address.type';

export const getUserAddresses = async (
	userId: number,
	page: number,
	pageSize = 10
): Promise<[Address[], number]> => {
	const addressesPromise = prisma.users_addresses.findMany({
		where: { user_id: userId },
		skip: (page - 1) * pageSize,
		take: pageSize
	});
	const totalCountPromise = prisma.users_addresses.count({ where: { user_id: userId } });
	const [addresses, totalCount] = await Promise.all([addressesPromise, totalCountPromise]);
	const totalPagesCount = Math.ceil(totalCount / pageSize);

	return [addresses as Address[], totalPagesCount];
};

export const getUserAddress = async (
	userId: number,
	addressType: AddressType,
	validFrom: Date
): Promise<Address | null> => {
	return prisma.users_addresses.findUnique({
		where: {
			address_id: {
				user_id: userId,
				address_type: addressType,
				valid_from: validFrom
			}
		}
	}) as Promise<Address | null>;
};

export const createUserAddress = async (userId: number, addressData: AddressData) => {
	return prisma.users_addresses.create({
		data: {
			user_id: userId,
			...addressData
		}
	});
};

export const updateUserAddress = async (
	userId: number,
	originalAddressType: AddressType,
	originalValidFrom: Date,
	addressData: AddressData
) => {
	return prisma.users_addresses.update({
		where: {
			address_id: {
				user_id: userId,
				address_type: originalAddressType,
				valid_from: originalValidFrom
			}
		},
		data: { ...addressData }
	});
};

export const deleteUserAddress = async (
	userId: number,
	addressType: AddressType,
	validFrom: Date
) => {
	return prisma.users_addresses.delete({
		where: {
			address_id: {
				user_id: userId,
				address_type: addressType,
				valid_from: validFrom
			}
		}
	});
};
