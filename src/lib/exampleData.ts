import type { BudgetMonth } from 'src/model/StartingModel';

export const exampleData: BudgetMonth[] = [
	{
		month: 0,
		incomes: [
			{
				description: 'Magnus Lön',
				total: 34442
			},
			{
				description: 'Mikaela Lön',
				total: 20000
			},
			{
				description: 'Föräldradagar',
				total: 18568
			},
			{
				description: 'Barnbidrag',
				total: 1250
			}
		],
		categories: [
			{
				name: 'Boende',
				elements: [
					{
						description: 'Hyra',
						isOnCredit: false,
						recurring: true,
						total: 4715
					},
					{
						description: 'Garage',
						isOnCredit: false,
						recurring: true,
						total: 1447
					},
					{
						description: 'Ränta Lägenheten',
						isOnCredit: false,
						recurring: true,
						total: 2696
					},
					{
						description: 'Ränta Tomten',
						isOnCredit: false,
						recurring: true,
						total: 7636
					}
				]
			},
			{
				name: 'Mat',
				elements: [
					{
						description: 'Ica',
						isOnCredit: false,
						recurring: true,
						total: 3500
					},
					{
						description: 'Matkassar',
						isOnCredit: true,
						recurring: true,
						total: 2397
					},
					{
						description: 'Lunch/fika',
						isOnCredit: false,
						recurring: true,
						total: 500
					}
				]
			},
			{
				name: 'Spar',
				elements: [
					{
						description: 'William',
						isOnCredit: false,
						recurring: true,
						total: 2250
					},
					{
						description: 'Rör du så dör du',
						isOnCredit: true,
						recurring: true,
						total: 2000
					},
					{
						description: 'Pension (mikaela)',
						isOnCredit: false,
						recurring: true,
						total: 1000
					}
				]
			}
		]
	},
	{
		month: 1,
		incomes: [
			{
				description: 'Magnus Lön',
				total: 34442
			},
			{
				description: 'Mikaela Lön',
				total: 20000
			},
			{
				description: 'Föräldradagar',
				total: 18568
			},
			{
				description: 'Barnbidrag',
				total: 1250
			}
		],
		categories: [
			{
				name: 'Boende',
				elements: [
					{
						description: 'Hyra',
						isOnCredit: false,
						recurring: true,
						total: 4715
					},
					{
						description: 'Garage',
						isOnCredit: false,
						recurring: true,
						total: 1447
					},
					{
						description: 'Ränta Lägenheten',
						isOnCredit: false,
						recurring: true,
						total: 2696
					},
					{
						description: 'Ränta Tomten',
						isOnCredit: false,
						recurring: true,
						total: 7636
					}
				]
			},
			{
				name: 'Mat',
				elements: [
					{
						description: 'Ica',
						isOnCredit: false,
						recurring: true,
						total: 3500
					},
					{
						description: 'Matkassar',
						isOnCredit: true,
						recurring: true,
						total: 2397
					},
					{
						description: 'Lunch/fika',
						isOnCredit: false,
						recurring: true,
						total: 500
					}
				]
			},
			{
				name: 'Spar',
				elements: [
					{
						description: 'William',
						isOnCredit: false,
						recurring: true,
						total: 2250
					},
					{
						description: 'Rör du så dör du',
						isOnCredit: true,
						recurring: true,
						total: 2000
					},
					{
						description: 'Pension (mikaela)',
						isOnCredit: false,
						recurring: true,
						total: 1000
					}
				]
			}
		]
	}
];
