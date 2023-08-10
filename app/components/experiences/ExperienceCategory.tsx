'use client';

import { IconType } from 'react-icons';

interface ExperienceCategoryProps {
	icon?: IconType;
	label?: string;
	description?: string;
	category?: string[];
}

const ExperienceCategory: React.FC<ExperienceCategoryProps> = ({ icon: Icon, label, description, category }) => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-row items-center gap-4'>
				{Icon && <Icon size={40} className='text-neutral-600' />}
				<div className='flex flex-col'>
					<div className='text-lg font-semibold'>{category || label}</div>
					<div className='text-neutral-500 font-light'>{description}</div>
				</div>
			</div>
		</div>
	);
};

export default ExperienceCategory;
