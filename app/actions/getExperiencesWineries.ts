import prisma from '@/app/libs/prismadb';

export interface IExperiencesParams {
	userId?: number;
	location?: string;
	suburb?: string;
	duration?: string;
	startDate?: string;
	endDate?: string;
	category?: string;
	tags?: string;
}

export default async function getExperiencesWineries(params: IExperiencesParams, isWineryRoute = false) {
	try {
		const { userId, location, duration, startDate, endDate, category, tags: tagsString, suburb } = params;

		console.log('params', params);

		// Splitting the tags string into an array
		const tags = tagsString ? tagsString.split(',') : [];

		// This call filters by wineries
		const wineryExperiences = await getExperiencesWineries(params, true);

		if (wineryExperiences.length === 0) {
			return (
				<ClientOnly>
					<EmptyState showReset />
				</ClientOnly>
			);
		}

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (location) {
			query.location = location;
		}

		if (suburb) {
			query.location = {
				startsWith: suburb + ' - ', // This will match only the exact city name followed by " - "
			};
		}

		if (duration === '0-3 hours') {
			let durationIntMax = 3;
			let durationIntMin = 1;
			query.duration = {
				lte: durationIntMax,
				gte: durationIntMin,
			};
		} else if (duration === '3-5 hours') {
			let durationIntMax = 5;
			let durationIntMin = 3;
			query.duration = {
				lte: durationIntMax,
				gte: durationIntMin,
			};
		} else if (duration === '5-7 hours') {
			let durationIntMax = 5;
			let durationIntMin = 7;
			query.duration = {
				lte: durationIntMax,
				gte: durationIntMin,
			};
		} else if (duration === '7+ hours') {
			let durationIntMax = 24;
			let durationIntMin = 7;
			query.duration = {
				lte: durationIntMax,
				gte: durationIntMin,
			};
		} else if (duration === 'Multi-day') {
			let durationIntMax = 72;
			let durationIntMin = 24;
			query.duration = {
				lte: durationIntMax,
				gte: durationIntMin,
			};
		}

		if (category) {
			query.category = category;
		}

		if (tags && tags.length > 0) {
			query.tags = {
				hasSome: tags,
			};
		}

		if (startDate && endDate) {
			query.startDate = { gte: startDate };
			query.endDate = { lte: endDate };
		}

		const experiences = await prisma.experience.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeExperiences = experiences.map((experience) => ({
			...experience,
			createdAt: experience.createdAt.toISOString(),
		}));

		return safeExperiences;
	} catch (error: any) {
		throw new Error(error);
	}
}
