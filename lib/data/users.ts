import { prisma } from '../prisma';
import { User, UserData } from '../types/User.type';

export const getUsers = async (page: number, pageSize = 10): Promise<[User[], number]> => {
	const usersPromise = prisma.users.findMany({
		skip: (page - 1) * pageSize,
		take: pageSize
	});
	const totalCountPromise = prisma.users.count();
	const [users, totalCount] = await Promise.all([usersPromise, totalCountPromise]);
	const totalPagesCount = Math.ceil(totalCount / pageSize);

	return [users as User[], totalPagesCount];
};

export const getUser = async (id: number): Promise<User | null> => {
	return prisma.users.findUnique({ where: { id } }) as Promise<User | null>;
};

export const createUser = async (userData: UserData) => {
	return prisma.users.create({
		data: { ...userData }
	});
};

export const updateUser = async (id: number, userData: UserData) => {
	return prisma.users.update({
		where: { id },
		data: { ...userData }
	});
};

export const deleteUser = async (id: number) => {
	return prisma.users.delete({
		where: { id }
	});
};
