import Container from '@/app/components/Container';
import ExperienceCard from '@/app/components/experiences/ExperienceCard'; // You might need to create this component
import EmptyState from '@/app/components/EmptyState';

import getExperiences, { IExperiencesParams } from '@/app/actions/getExperiences'; // Import the getExperiences function
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';

interface ExperiencesProps {
	searchParams: IExperiencesParams;
}

const Experiences = async ({ searchParams }: ExperiencesProps) => {
	const experiences = await getExperiences(searchParams);
	const currentUser = await getCurrentUser();

	if (experiences.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<Container>
				<div
					className='
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          '
				>
					{experiences.map((experience: any) => (
						<ExperienceCard currentUser={currentUser} key={experience.id} data={experience} />
					))}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Experiences;
