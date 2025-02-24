'use client';
import { usePathname } from 'next/navigation'; // Import useRouter from next/router
import { SafeUser } from '@/app/types';

import Categories from './Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Filter from './Filter';

interface NavbarProps {
	currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	const pathName = usePathname(); // Use the useRouter hook

	return (
		<div className='fixed z-10 w-full bg-white shadow-sm'>
			<div className='py-4 border-b-[1px]'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			{pathName === '/' || pathName.startsWith('/experiences') ? (
				<Filter />
			) : pathName === '/listings' ? (
				<Categories />
			) : null}
		</div>
	);
};

export default Navbar;
