import { Divider } from '@mui/material';
import UserItem from '@/components/user/UserItem';
import ListPagination from '@/components/ListPagination';
import { getUsers } from '@/lib/data/users';
import CreateUserButton from '@/components/user/CreateUserButton';

const PAGE_SIZE = 7;

interface PageProps {
	searchParams: Promise<{ page: string | string[] | undefined }>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
	const { page } = await searchParams;
	const currentPage = Number(page || 1);
	const [users, totalPagesCount] = await getUsers(currentPage, PAGE_SIZE);

	return (
		<>
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl font-medium">Users</h1>
				<CreateUserButton />
			</div>
			<div className="flex flex-col overflow-y-auto">
				{users.map((user, index) => (
					<div key={user.id}>
						<UserItem user={user} className="my-3" />
						{index !== users.length - 1 && <Divider />}
					</div>
				))}
			</div>
			<ListPagination
				className="mt-auto self-center"
				totalPages={totalPagesCount}
				currentPage={currentPage}
			/>
		</>
	);
};

export default Page;
