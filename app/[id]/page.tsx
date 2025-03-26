import { Button } from '@mui/material';
import ListPagination from '@/components/ListPagination';
import AddressItem from '@/components/address/AddressItem';
import { getUser } from '@/lib/users';
import { getUserAddresses } from '@/lib/addresses';
import CreateAddressButton from '@/components/address/CreateAddressButton';

const PAGE_SIZE = 7;

interface PageProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ page: string | string[] | undefined }>;
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
	const { id } = await params;
	const { page } = await searchParams;
	const currentPage = Number(page || 1);

	const [user, [addresses, totalPagesCount]] = await Promise.all([
		getUser(Number(id)),
		getUserAddresses(Number(id), currentPage, PAGE_SIZE)
	]);

	return (
		<div className="flex flex-col p-5 md:p-10 space-y-5 h-[100vh] w-[100vw]">
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl font-bold">{`Addresses - ${user?.first_name} ${user?.last_name}`}</h1>
				<CreateAddressButton userId={Number(id)} />
			</div>
			<div className="flex flex-col overflow-y-auto">
				{addresses.map((address, index) => (
					<AddressItem key={index} address={address} className="my-3" />
				))}
			</div>
			<ListPagination
				className="mt-auto self-center"
				totalPages={totalPagesCount}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default Page;
