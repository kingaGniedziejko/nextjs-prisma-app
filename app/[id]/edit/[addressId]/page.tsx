import AddEditAddressForm from '@/components/address/AddEditAddressForm';
import FormActionButtons from '@/app/[id]/edit/[addressId]/FormActionButtons';
import { getUserAddress } from '@/lib/addresses';
import { getUser } from '@/lib/users';
import { splitAddressId } from '@/lib/utils';
import { Button } from '@mui/material';

interface PageProps {
	params: Promise<{ id: string; addressId: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
	// const router
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

	const handleCancel = () => {};

	return (
		<div className="w-full md:w-xl self-center flex flex-col space-y-5">
			<h1 className="text-2xl font-bold">
				Edit address of {user?.first_name} {user?.last_name}
			</h1>
			<AddEditAddressForm userId={userId} addressToEdit={address} />
			<FormActionButtons userId={userId} />
		</div>
	);
};

export default Page;
