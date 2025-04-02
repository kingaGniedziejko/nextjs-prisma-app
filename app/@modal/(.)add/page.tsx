import Modal from '@/components/Modal';
import AddEditUserForm from '@/components/user/AddEditUserForm';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
	return (
		<Modal title="Add user" dialogContentClassName="!pb-0">
			<AddEditUserForm />
		</Modal>
	);
};

export default Page;
