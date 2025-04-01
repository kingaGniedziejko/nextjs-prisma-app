import Modal from '@/components/Modal';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
	return (
		<Modal title="Add user" redirectPathOnClose="/" dialogContentClassName="!pb-0">
			{/* <AddEditUserForm /> */}
		</Modal>
	);
};

export default Page;
