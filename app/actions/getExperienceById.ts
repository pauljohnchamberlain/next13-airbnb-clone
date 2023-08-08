import prisma from '@/app/libs/prismadb';

interface IParams {
	experienceId?: number;
}

export default async function getExperienceById(params: IParams) {
	try {
		const { experienceId } = params;

		if (!experienceId) {
			throw new Error('Experience ID is required');
		}

		const experienceIdNumber = parseInt(experienceId.toString(), 10);

		console.log('experienceIdNumber', experienceIdNumber);

		// Check if the parsed value is a valid number
		if (isNaN(experienceIdNumber)) {
			throw new Error('Invalid Experience ID');
		}

		console.log('Params', params);

		const experience = await prisma.experience.findUnique({
			where: {
				id: experienceIdNumber,
			},
			include: {
				user: true,
			},
		});

		if (!experience) {
			return null;
		}

		return {
			...experience,
			createdAt: experience.createdAt.toString(),
			user: {
				...experience.user,
				createdAt: experience.user.createdAt.toString(),
				updatedAt: experience.user.updatedAt.toString(),
				emailVerified: experience.user.emailVerified?.toString() || null,
			},
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
