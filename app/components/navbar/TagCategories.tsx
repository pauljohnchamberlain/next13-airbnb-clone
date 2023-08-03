'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

const tagCategories = [
	{
		label: 'Eat & Drink',
		name: 'Eat & Drink',
		href: '/eat-drink',
		current: true,
		children: [
			{
				label: 'Food',
				name: 'Food',
				href: '/eat-drink/food',
				children: [
					{ label: 'Chinese', name: 'Chinese', href: '/eat-drink/food/chinese' },
					{ label: 'Thai', name: 'Thai', href: '/eat-drink/food/thai' },
					{ label: 'Korean', name: 'Korean', href: '/eat-drink/food/korean' },
					// Add more food types here
				],
			},
			{
				label: 'Drink',
				name: 'Drink',
				href: '/eat-drink/drink',
				children: [
					{ label: 'Wine', name: 'Wine', href: '/eat-drink/drink/wine' },
					{ label: 'Beer', name: 'Beer', href: '/eat-drink/drink/beer' },
					{ label: 'Cider', name: 'Cider', href: '/eat-drink/drink/cider' },
				],
			},
		],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Nature & Outdoors',
		name: 'Nature & Outdoors',
		href: '/nature',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Kids & Family',
		name: 'Kids & Family',
		href: '/kids',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Sightseeing',
		name: 'Sightseeing',
		href: '/drink',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Tours',
		name: 'Tours',
		href: '/tours',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Stay',
		name: 'Stay',
		href: '/accommodation',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Art & Culture',
		name: 'Art & Culture',
		href: '/culture',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Entertainment',
		name: 'Entertainment',
		href: '/users',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
	{
		label: 'Wellness',
		name: 'Wellness',
		href: '/wellness',
		current: false,
		children: [],
		icon: GiCactus,
		description: 'Add description here',
	},
];

export default tagCategories;
