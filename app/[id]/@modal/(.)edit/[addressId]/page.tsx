import AddEditAddressForm from '@/components/address/AddEditAddressForm';
import Modal from '@/components/Modal';
import { getUserAddress } from '@/lib/data/addresses';
import { getUser } from '@/lib/data/users';
import { splitAddressId } from '@/lib/utils';

interface PageProps {
	params: Promise<{ id: string; addressId: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id, addressId } = await params;

	const splittedAddress = splitAddressId(addressId);
	if (!splittedAddress || Number(id) !== splittedAddress[0]) {
		throw Error('Invalid address id');
	}
	const [userId, addressType, validFrom] = splittedAddress;

	const [user, address] = await Promise.all([
		getUser(userId),
		getUserAddress(userId, addressType, validFrom)
	]);

	if (!address) {
		throw Error("Address doesn't exists");
	}

	return (
		<Modal
			title={`Edit address of ${user?.first_name} ${user?.last_name}`}
			redirectPathOnClose={`/${userId}`}
			dialogContentClassName="!pb-0"
		>
			<AddEditAddressForm userId={userId} addressToEdit={address} />
		</Modal>
	);
};

export default Page;
