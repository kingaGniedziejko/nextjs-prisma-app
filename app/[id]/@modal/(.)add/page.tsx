import AddEditAddressForm from '@/components/address/AddEditAddressForm';
import Modal from '@/components/Modal';
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
		<Modal
			title={`Add address of ${user?.first_name} ${user?.last_name}`}
			redirectPathOnClose={`/${userId}`}
			dialogContentClassName="!pb-0"
		>
			<AddEditAddressForm userId={userId} />
		</Modal>
	);
};

export default Page;
