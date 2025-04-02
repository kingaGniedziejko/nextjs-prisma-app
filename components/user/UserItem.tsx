import { User, UserStatus } from '@/lib/types/User.type';
import { Avatar } from '@mui/material';
import React from 'react';
import { stringToColor } from '@/lib/utils';
import Link from 'next/link';
import UserItemContextMenu from './UserItemContextMenu';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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
					<div className="flex flex-row mb-[-3px]">
						<p className="text-md font-semibold mr-4">{`${user.first_name} ${user.last_name}`}</p>
						<div className="flex flex-row items-center">
							{user.status === UserStatus.Active ? (
								<TaskAltIcon className="!text-[0.9rem] text-green-700 mr-0.5" />
							) : (
								<CancelOutlinedIcon className="!text-[0.9rem] text-orange-700 mr-0.5" />
							)}
							{user.status === UserStatus.Active ? (
								<p className="text-xs text-green-700">Active</p>
							) : (
								<p className="text-xs text-orange-700">Inactive</p>
							)}
						</div>
					</div>
					<p className="text-sm">{user.email}</p>
				</div>
			</Link>
			<UserItemContextMenu userId={user.id} />
		</div>
	);
};

export default UserItem;
