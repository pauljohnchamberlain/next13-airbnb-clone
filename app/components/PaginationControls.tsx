'use client';

import { FC } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	experiences: any[];
	totalCount: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({ hasNextPage, hasPrevPage, experiences, totalCount }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	console.log('pathname :>> ', pathname);

	const page = searchParams.get('page') ?? '1';
	const per_page = searchParams.get('per_page') ?? '20';

	const totalExperiences = experiences.length; // You need to pass this as a prop to PaginationControls

	return (
		<div className='flex justify-center flex-row pt-6'>
			<div className='flex gap-6 items-center p-4'>
				<button
					className='bg-primary text-white p-1 px-4'
					disabled={!hasPrevPage}
					onClick={() => {
						router.push(`${pathname}/?page=${Number(page) - 1}&per_page=${per_page}`);
					}}
				>
					prev page
				</button>
				<div>
					{page} / {Math.ceil(totalCount / Number(per_page))}
				</div>
				<button
					className='bg-primary text-white p-1 px-4'
					disabled={!hasNextPage}
					onClick={() => {
						router.push(`${pathname}/?page=${Number(page) + 1}&per_page=${per_page}`);
					}}
				>
					next page
				</button>
			</div>
		</div>
	);
};

export default PaginationControls;
