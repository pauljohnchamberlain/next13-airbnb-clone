import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: number;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	location?: string;
	category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { userId, roomCount, guestCount, bathroomCount, location, startDate, endDate, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (location) {
			query.location = location;
		}

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.accommodation.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeListings = listings.map((accommodation) => ({
			...accommodation,
			createdAt: accommodation.createdAt.toISOString(),
		}));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
