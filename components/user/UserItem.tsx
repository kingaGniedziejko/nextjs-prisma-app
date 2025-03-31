import { User } from '@/lib/types/User.type';
import { Avatar } from '@mui/material';
import React from 'react';
import { stringToColor } from '@/lib/utils';
import Link from 'next/link';
import UserItemContextMenu from './UserItemContextMenu';

interface UserItemProps {
	user: User;
	className?: string;
}

const UserItem: React.FC<UserItemProps> = ({ user, className }) => {
	return (
		<div className={`${className} flex flex-row space-x-4`}>
			<Link href={`/${user.id}`} className="flex flex-row items-center space-x-4 flex-1">
				<Avatar sx={{ backgroundColor: stringToColor(`${user.first_name} ${user.last_name}`) }}>
					{user.initials}
				</Avatar>
				<div>
					<p className="text-md font-semibold mb-[-3px]">{`${user.first_name} ${user.last_name}`}</p>
					<p className="text-sm">{user.email}</p>
				</div>
			</Link>
			<UserItemContextMenu />
		</div>
	);
};

export default UserItem;
