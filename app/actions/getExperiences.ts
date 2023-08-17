import prisma from '@/app/libs/prismadb';
import { url } from 'inspector';

export interface IExperiencesParams {
	userId?: number;
	location?: string;
	suburb?: string;
	duration?: string;
	startDate?: string;
	endDate?: string;
	category?: string;
	tags?: string;
	page?: string;
	per_page?: string;
	experienceChildPage?: string;
}

export interface GetExperiencesResponse {
	experiences: any[]; // Adjust this to the type of your experiences if you have one
	totalCount: number;
}

export default async function getExperiences(params: IExperiencesParams): Promise<GetExperiencesResponse> {
	// console.log('Received params:', params);

	try {
		const {
			userId,
			location,
			duration,
			startDate,
			endDate,
			category,
			tags: tagsString,
			suburb,
			experienceChildPage,
		} = params;

		const page = params.page ? parseInt(params.page) : 1;
		const per_page = params.per_page ? parseInt(params.per_page) : 20;

		// console.log('params', params);

		// Splitting the tags string into an array
		const tags = tagsString ? tagsString.split(',') : [];

		let query: any = {};

		// if (isWineryRoute) {
		// 	// If it's the winery route, ensure that "winery" tag is included
		// 	query.tags = { has: 'Winery' };
		// } else if (tags && tags.length > 0) {
		// 	query.tags = { hasSome: tags };
		// }

		// if (experiencesChildPage) {
		// 	if (experiencesChildPage === 'wineries') {
		// 		const urlTag = 'wineries';
		// 	}
		// }

		// console.log('getExperiences: isWineryRoute :>> ', searchParams.isWineryRoute);

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

		if (params.experienceChildPage === 'Wineries') {
			query.tags = { has: 'Winery' }; // Add the 'Winery' tag conditionally
		} else if (tags && tags.length > 0) {
			query.tags = { hasSome: tags };
		}

		if (startDate && endDate) {
			query.startDate = { gte: startDate };
			query.endDate = { lte: endDate };
		}

		const totalCount = await prisma.experience.count({
			where: query,
		});

		const experiences = await prisma.experience.findMany({
			where: query,
			orderBy: {
				title: 'asc',
			},
			take: per_page,
			skip: (page - 1) * per_page,
		});

		// console.log('Constructed query:', query);

		const safeExperiences = experiences.map((experience) => ({
			...experience,
			createdAt: experience.createdAt.toISOString(),
		}));

		console.log('safeExperiences :>> ', safeExperiences.length);
		console.log('Total records in DB for the query:', totalCount);
		console.log('Page:', page);
		console.log('Per Page:', per_page);
		console.log('Take (Limit):', per_page);
		console.log('Skip (Offset):', (page - 1) * per_page);

		return {
			experiences: safeExperiences || [],
			totalCount: totalCount,
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
