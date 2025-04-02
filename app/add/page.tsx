import AddEditUserForm from '@/components/user/AddEditUserForm';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
	return (
		<div className="relative w-full md:w-xl self-center flex flex-col space-y-5">
			<h1 className="text-2xl font-medium">Add user</h1>
			<AddEditUserForm redirectPath="/" />
		</div>
	);
};

export default Page;
