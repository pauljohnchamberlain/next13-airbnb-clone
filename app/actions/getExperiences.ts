import prisma from '@/app/libs/prismadb';

export interface IExperiencesParams {
	userId?: number;
	location?: string;
	duration?: string;
	startDate?: string;
	endDate?: string;
	category?: string;
	tags?: string;
}

export default async function getExperiences(params: IExperiencesParams) {
	try {
		const { userId, location, duration, startDate, endDate, category, tags: tagsString } = params;

		console.log('duration :>> ', duration);

		console.log('params', params);

		console.log('params.tags', params.tags);

		// Splitting the tags string into an array
		const tags = tagsString ? tagsString.split(',') : [];

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (location) {
			query.location = location;
		}
		console.log('query.duration :>> ', query.duration);

		if (duration === '0-3 hours') {
			let durationInt = 3;
			query.duration = {
				lte: durationInt,
			};
		}

		console.log('query.duration :>> ', query.duration);

		// if (durationInt != null) {
		// 	// Check if duration is not null or undefined

		// 	query.duration = {
		// 		lte: durationInt,
		// 	};
		// }

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
