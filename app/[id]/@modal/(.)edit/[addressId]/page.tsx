import AddEditAddressForm from '@/components/address/AddEditAddressForm';

interface PageProps {
	params: Promise<{ id: string; addressId: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const { id, addressId } = await params;
	console.log(id, addressId);

	return (
		// <AddEditAddressForm userId={} addressToEdit={} />
		<></>
	);
};

export default Page;
