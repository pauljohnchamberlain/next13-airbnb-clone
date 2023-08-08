import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ExperienceHeadProps {
	title: string;
	location: string;
	imageCover: string;
	id: number;
	currentUser?: SafeUser | null;
}

const ExperienceHead: React.FC<ExperienceHeadProps> = ({ title, location, imageCover, id, currentUser }) => {
	const { getByValue } = useCountries();

	const locationData = getByValue(location);

	const capitalizeFirstLetter = (location: string) => {
		return location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
	};

	const capitalizeWords = (location: string) => {
		return location.split(' ').map(capitalizeFirstLetter).join(' ');
	};

	const locationBeforeSplit = location.split('-')[0].trim();
	const suburb = capitalizeWords(locationBeforeSplit);

	const state = 'South Australia';

	return (
		<>
			<Heading title={title} subtitle={`${suburb}, ${state}`} />
			<div
				className='
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        '
			>
				<Image src={imageCover} layout='fill' className='object-cover w-full' alt='Experience Image' />
				<div
					className='
            absolute
            top-5
            right-5
          '
				>
					{/* <HeartButton experienceId={id} currentUser={currentUser} /> */}
				</div>
			</div>
		</>
	);
};

export default ExperienceHead;
