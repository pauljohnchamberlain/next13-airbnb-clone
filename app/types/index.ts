import { Accommodation, AccommodationBooking, User, Experience } from '@prisma/client';

export type SafeListing = Omit<Accommodation, 'createdAt'> & {
	createdAt: string;
};

export type SafeReservation = Omit<AccommodationBooking, 'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: SafeListing;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export type SafeExperience = Omit<Experience, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

export type SafeExperienceBooking = {
	id: number;
	userId: number;
	experienceId: number;
	startDate: string; // Or Date, depending on how you're handling dates
	endDate: string; // Or Date
	totalPrice: number;
	createdAt: string; // Or Date
};
