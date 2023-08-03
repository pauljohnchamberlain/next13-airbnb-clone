'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import useExperienceModal from '@/app/hooks/useExperienceModal';
import { SafeUser } from '@/app/types';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();

	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const rentModal = useRentModal();
	const experienceModal = useExperienceModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [loginModal, rentModal, currentUser]);

	const onExperience = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		experienceModal.onOpen();
	}, [loginModal, experienceModal, currentUser]);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={onExperience}
					className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'
				>
					Add Your Experience
				</div>
				<div
					onClick={onRent}
					className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'
				>
					Add Your Accommodation
				</div>
				<div
					onClick={toggleOpen}
					className='
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          '
				>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className='
            absolute z-50
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          '
				>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem label='My trips' onClick={() => router.push('/trips')} />
								<MenuItem label='My favorites' onClick={() => router.push('/favorites')} />
								<MenuItem label='My reservations' onClick={() => router.push('/reservations')} />
								<MenuItem label='My properties' onClick={() => router.push('/properties')} />
								<MenuItem label='Add Your Accommodation' onClick={rentModal.onOpen} />
								<hr />
								<MenuItem label='Logout' onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem label='Login' onClick={loginModal.onOpen} />
								<MenuItem label='Sign up' onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
