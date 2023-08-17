export const dynamic = 'force-dynamic';
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

import Container from '@/app/components/Container';
import PaginationControls from '@/app/components/PaginationControls';
import ExperienceCard from '@/app/components/experiences/ExperienceCard'; // You might need to create this component
import EmptyState from '@/app/components/EmptyState';

import getExperiences, { IExperiencesParams, GetExperiencesResponse } from '@/app/actions/getExperiences'; // Import the getExperiences function
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';

interface ExperiencesProps {
	searchParams: IExperiencesParams;
}

// This function fetches the data
const fetchExperiencesData = async (searchParams: IExperiencesParams) => {
	const result = (await getExperiences(searchParams)) as GetExperiencesResponse;
	const currentUser = await getCurrentUser();
	return { ...result, currentUser };
};

// Previous version, with fetch and rendering in the same component
// const Experiences = async ({ searchParams }: ExperiencesProps) => {
// The component only renders the data
const ExperiencesRenderer = async (
	{
		experiences,
		totalCount,
		currentUser,
		searchParams,
	}: GetExperiencesResponse & { currentUser: any; searchParams: IExperiencesParams },
	experienceChildPage: string
) => {
	// Moved up to the fetchExperiencesData function
	// const result = (await getExperiences(searchParams)) as GetExperiencesResponse;
	// const { experiences, totalCount } = result;
	// const currentUser = await getCurrentUser();

	const page = searchParams['page'] ?? '1';
	const per_page = searchParams['per_page'] ?? '20';
	console.log('Page Setting per_page:', per_page);
	const totalPages = Math.ceil(Number(totalCount) / Number(per_page));

	// mocked, skipped and limited in the real app
	const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
	const end = start + Number(per_page); // 5, 10, 15 ...

	// console.log('Experiences:', experiences);
	console.log('Page tsx Total Count:', totalCount);

	const paginatedExperiences = experiences || [];

	console.log('End Value:', end);
	console.log('Experiences Length:', experiences.length);
	console.log('Experience child page :>> ', searchParams.experienceChildPage);

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
					{paginatedExperiences.map((experience: any) => (
						<ExperienceCard currentUser={currentUser} key={experience.id} data={experience} />
					))}
				</div>
				{totalPages > 1 && (
					<PaginationControls
						hasNextPage={end < totalCount}
						hasPrevPage={start > 0}
						experiences={experiences}
						totalCount={totalCount}
					/>
				)}
			</Container>
		</ClientOnly>
	);
};

const Experiences = async ({ searchParams }: ExperiencesProps) => {
	const data = await fetchExperiencesData(searchParams);
	return <ExperiencesRenderer {...data} searchParams={searchParams} />;
};

export default Experiences;
