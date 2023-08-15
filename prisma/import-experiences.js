const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();
const path = require('path');

const importWineries = async () => {
	// Count the number of records before the import
	const initialCount = await prisma.experience.count();

	console.log(`Number of records before import: ${initialCount}`);

	const filePath = path.resolve(__dirname, '..', 'vendor', 'mclarenvaleandfleurieu.json');
	const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

	let counter = 0; // Initialize counter

	for (const winery of data) {
		counter++; // Increment counter

		// Convert winery data to Experience format
		const experience = {
			userId: 1, // Placeholder - Update based on your application's requirements
			title: winery.title || 'Default Title',
			slug: winery.title ? winery.title.toLowerCase().replace(/\s+/g, '-') : 'default-slug',
			tags: ['Eat & Drink', 'Drink', 'Winery'],
			description: winery.overview || 'Lorem Ipsum',
			ratingsAverage: winery.ratingsAverage || 5.0,
			ratingsCount: winery.ratingsCount || 1,
			imageCover: winery.imageUrl || 'https://source.unsplash.com/random',
			location: winery.location || 'Default Location',
			street: winery.address ? winery.address.split(',')[0] : 'Default Street',
			email: winery.email || 'default@email.com',
			phone: winery.phone || '123-456-7890',
			website: winery.website || 'https://website.com',
			summary: winery.summary || 'Default Summary',
			cancellationPolicy: 'Default Cancellation Policy',
			price: winery.price || 0,
			duration: winery.duration || 1,
		};

		const existingExperience = await prisma.experience.upsert({
			where: {
				slug: experience.slug,
			},
			update: experience,
			create: experience,
		});

		console.log(`Processed winery ${counter}/${data.length}: ${experience.title}`);
	}

	console.log('Data import completed.');
	// Count the number of records before the import
	const finalCount = await prisma.experience.count();

	console.log(`Number of records before import: ${finalCount}`);
	await prisma.$disconnect();
};

importWineries();
