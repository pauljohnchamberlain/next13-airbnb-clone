export const dynamic = 'force-dynamic';
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

import Container from '@/app/components/Container';
import ExperienceCard from '@/app/components/experiences/ExperienceCard'; // You might need to create this component
import EmptyState from '@/app/components/EmptyState';

import getExperiences, { IExperiencesParams } from '@/app/actions/getExperiences'; // Import the getExperiences function
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../../components/ClientOnly';
import Experiences from '../page';

// Define the types for the props that will be passed to the WineryExperiences component.
interface ExperiencesProps {
	searchParams: IExperiencesParams; // The search parameters for fetching the experiences.
}

// The main component for displaying winery experiences.
const WineryExperiences = async ({ searchParams }: ExperiencesProps) => {
	// Fetch the current user's information.
	const currentUser = await getCurrentUser();

	// Fetch the winery experiences based on the provided search parameters.
	const wineryExperiences = await getExperiences(searchParams);
	// console.log('Wineries: searchParams :>> ', searchParams);

	// Check if there are no experiences returned.
	if (wineryExperiences.experiences.length === 0) {
		// If no experiences are returned, display an EmptyState component inside a ClientOnly component.
		return (
			/* // Ensure this component is only rendered on the client side (browser). */
			<ClientOnly>
				{/* // Display a message or icon indicating that no experiences were found. */}
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	// If there are experiences, display them using the Experiences component.
	// Also, pass a flag (isWineryRoute) to indicate that this is the winery route.
	return <Experiences searchParams={{ ...searchParams, experienceChildPage: 'Wineries' }} />;
};

// Export the WineryExperiences component as the default export for this module.
export default WineryExperiences;