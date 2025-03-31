import AddEditAddressForm from '@/components/address/AddEditAddressForm';
import { getUser } from '@/lib/data/users';

interface PageProps {
	params: Promise<{ id: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id } = await params;
	const userId = Number(id);
	if (!userId) throw Error('Invalid user id');

	const user = await getUser(userId);
	if (!user) throw Error("User doesn't exists");

	return (
		<div className="relative w-full md:w-xl self-center flex flex-col space-y-5">
			<h1 className="text-2xl font-medium">
				Add address of {user?.first_name} {user?.last_name}
			</h1>
			<AddEditAddressForm userId={userId} />
		</div>
	);
};

export default Page;
