'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { SafeExperience, SafeUser } from '@/app/types';

import HeartButton from '../HeartButton';
import Button from '../Button';

interface ExperienceCardProps {
	data: SafeExperience;
	currentUser?: SafeUser | null;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ data, currentUser }) => {
	const router = useRouter();

	const handleDetails = useCallback(() => {
		router.push(`/experiences/${data.id}`);
	}, [data.id, router]);

	return (
		<div onClick={handleDetails} className='col-span-1 cursor-pointer group'>
			<div className='flex flex-col gap-2 w-full'>
				<div
					className='
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          '
				>
					<Image
						fill
						className='
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            '
						src={data.imageCover}
						alt='Experience'
					/>
					<div
						className='
            absolute
            top-3
            right-3
          '
					>
						{/* <HeartButton experienceId={data.id} currentUser={currentUser} />{' '} */}
						{/* Update HeartButton to handle experiences */}
					</div>
				</div>
				<div className='font-semibold text-lg'>{data.title}</div>
				<div className='font-light text-neutral-500'>{data.summary}</div>
				<div className='flex flex-row items-center gap-1'>
					<div className='font-semibold'>$ {data.price}</div>
					<div className='font-light'>per person</div>
				</div>
				{data.duration && <div className='font-light'>Duration: {data.duration} hours</div>}
			</div>
		</div>
	);
};

export default ExperienceCard;
