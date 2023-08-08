import prisma from '@/app/libs/prismadb';

export interface IExperiencesParams {
	userId?: number;
	location?: string;
	duration?: number;
	startDate?: string;
	endDate?: string;
	category?: string;
	tags?: string[];
}

export default async function getExperiences(params: IExperiencesParams) {
	try {
		const { userId, location, duration, startDate, endDate, category, tags } = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (location) {
			query.location = location;
		}

		if (duration) {
			query.duration = {
				gte: +duration,
			};
		}

		if (category) {
			query.category = category;
		}

		if (tags) {
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
