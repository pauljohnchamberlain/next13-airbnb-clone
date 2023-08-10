import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import Avatar from '../Avatar';
import ExperienceCategory from './ExperienceCategory';
import AdelaideMap from '../AdelaideMap';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

interface ExperienceInfoProps {
	user: SafeUser;
	description: string;
	duration: number | null;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| string[];
	location: string;
}

const ExperienceInfo: React.FC<ExperienceInfoProps> = ({ user, description, duration, category, location }) => {
	const { getByValue } = useCountries();

	const coordinates = getByValue(location)?.latlng;

	duration = 1; // Provide a default value

	return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div
					className='
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          '
				>
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div
					className='
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          '
				>
					<div>{duration} hours</div>
				</div>
			</div>
			<hr />
			{Array.isArray(category) ? (
				<div className='categories'>{category.join(', ')}</div>
			) : (
				<ExperienceCategory icon={category.icon} label={category.label} description={category.description} />
			)}
			<hr />
			<div
				className='
      text-lg font-light text-neutral-500'
			>
				{description}
			</div>
			<hr />
			<AdelaideMap suburb={location} />
		</div>
	);
};

export default ExperienceInfo;
