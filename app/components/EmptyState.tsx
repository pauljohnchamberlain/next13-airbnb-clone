'use client';

import { useRouter, usePathname } from 'next/navigation';

import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = 'No exact matches',
	subtitle = 'Try changing or removing some of your filters.',
	showReset,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const basePathName = pathname.split('?')[1];

	const resetFilters = () => {
		if (pathname === '/experiences') {
			router.push('/experiences');
		} else if (pathname === '/listings') {
			router.push('/listings');
		}
	};

	return (
		<div
			className='
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      '
		>
			<Heading center title={title} subtitle={subtitle} />
			<div className='w-48 mt-4'>
				{showReset && <Button outline label='Remove all filters' onClick={resetFilters} />}
			</div>
		</div>
	);
};
 
export default EmptyState;