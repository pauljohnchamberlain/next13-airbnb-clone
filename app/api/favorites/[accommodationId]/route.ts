import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
	accommodationId?: string | number;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { accommodationId } = params;

	if (accommodationId === undefined || isNaN(Number(accommodationId))) {
		throw new Error('Invalid ID');
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];
	favoriteIds.push(Number(accommodationId)); // Convert to number and push

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { accommodationId } = params;

	if (accommodationId === undefined || isNaN(Number(accommodationId))) {
		throw new Error('Invalid ID');
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];
	favoriteIds = favoriteIds.filter((id) => id !== Number(accommodationId));

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}
