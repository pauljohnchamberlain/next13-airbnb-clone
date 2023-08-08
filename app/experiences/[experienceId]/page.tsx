import getCurrentUser from '@/app/actions/getCurrentUser';
import getExperienceById from '@/app/actions/getExperienceById';
import getExperienceBookings from '@/app/actions/getExperienceBookings';
import getExperiences, { IExperiencesParams } from '@/app/actions/getExperiences';

import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import ExperienceClient from './ExperienceClient';
import { SafeExperienceBooking } from '@/app/types';

interface IParams {
	experienceId?: number;
}

const ExperiencePage = async ({ params }: { params: IParams }) => {
	const experiences = await getExperienceById(params);
	const experienceBookings = await getExperienceBookings(params);
	const currentUser = await getCurrentUser();

	console.log('Experience object in ExperiencePage:', experiences);

	if (!experiences) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	// Convert the updatedAt field to a string
	const experienceWithUpdatedDate = {
		...experiences,
		updatedAt: experiences.updatedAt?.toISOString() ?? '',
	};

	return (
		<ClientOnly>
			<ExperienceClient
				experience={experienceWithUpdatedDate}
				experienceBookings={experienceBookings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ExperiencePage;
