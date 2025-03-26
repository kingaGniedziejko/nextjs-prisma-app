import { prisma } from './prisma';
import { User } from './types/types';

export const getUsers = async (page: number, pageSize = 10): Promise<[User[], number]> => {
	const usersPromise = prisma.users.findMany({
		skip: (page - 1) * pageSize,
		take: pageSize
	});
	const totalCountPromise = prisma.users.count();
	const [users, totalCount] = await Promise.all([usersPromise, totalCountPromise]);
	const totalPagesCount = Math.ceil(totalCount / pageSize);

	return [users, totalPagesCount];
};

export const getUser = async (id: number): Promise<User | null> => {
	return prisma.users.findUnique({ where: { id } });
};
