import type { BudgetMonth } from 'src/model/StartingModel';

export const exampleData: BudgetMonth[] = [
	{
		month: 0,
		incomes: [
			{
				description: 'Magnus Lön',
				total: 34442,
				month: 0
			},
			{
				description: 'Mikaela Lön',
				total: 20000,
				month: 0
			},
			{
				description: 'Föräldradagar',
				total: 18568,
				month: 0
			},
			{
				description: 'Barnbidrag',
				total: 1250,
				month: 0
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
						total: 4715,
						month: 0
					},
					{
						description: 'Garage',
						isOnCredit: false,
						recurring: true,
						total: 1447,
						month: 0
					},
					{
						description: 'Ränta Lägenheten',
						isOnCredit: false,
						recurring: true,
						total: 2696,
						month: 0
					},
					{
						description: 'Ränta Tomten',
						isOnCredit: false,
						recurring: true,
						total: 7636,
						month: 0
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
						total: 3500,
						month: 0
					},
					{
						description: 'Matkassar',
						isOnCredit: true,
						recurring: true,
						total: 2397,
						month: 0
					},
					{
						description: 'Lunch/fika',
						isOnCredit: false,
						recurring: true,
						total: 500,
						month: 0
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
						total: 2250,
						month: 0
					},
					{
						description: 'Rör du så dör du',
						isOnCredit: true,
						recurring: true,
						total: 2000,
						month: 0
					},
					{
						description: 'Pension (mikaela)',
						isOnCredit: false,
						recurring: true,
						total: 1000,
						month: 0
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
				total: 34442,
				month: 1
			},
			{
				description: 'Mikaela Lön',
				total: 20000,
				month: 1
			},
			{
				description: 'Föräldradagar',
				total: 18568,
				month: 1
			},
			{
				description: 'Barnbidrag',
				total: 1250,
				month: 1
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
						total: 4715,
						month: 1
					},
					{
						description: 'Garage',
						isOnCredit: false,
						recurring: true,
						total: 1447,
						month: 1
					},
					{
						description: 'Ränta Lägenheten',
						isOnCredit: false,
						recurring: true,
						total: 2696,
						month: 1
					},
					{
						description: 'Ränta Tomten',
						isOnCredit: false,
						recurring: true,
						total: 9500,
						month: 1
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
						total: 3500,
						month: 1
					},
					{
						description: 'Matkassar',
						isOnCredit: true,
						recurring: true,
						total: 2397,
						month: 1
					},
					{
						description: 'Lunch/fika',
						isOnCredit: false,
						recurring: true,
						total: 500,
						month: 1
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
						total: 2250,
						month: 1
					},
					{
						description: 'Rör du så dör du',
						isOnCredit: true,
						recurring: true,
						total: 2000,
						month: 1
					},
					{
						description: 'Pension (mikaela)',
						isOnCredit: false,
						recurring: true,
						total: 1000,
						month: 1
					}
				]
			}
		]
	},
	{
		month: 2,
		incomes: [
			{
				description: 'Magnus Lön',
				total: 34442,
				month: 2
			},
			{
				description: 'Mikaela Lön',
				total: 20000,
				month: 2
			},
			{
				description: 'Föräldradagar',
				total: 18568,
				month: 2
			},
			{
				description: 'Barnbidrag',
				total: 1250,
				month: 2
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
						total: 4715,
						month: 2
					},
					{
						description: 'Garage',
						isOnCredit: false,
						recurring: true,
						total: 1447,
						month: 2
					},
					{
						description: 'Ränta Lägenheten',
						isOnCredit: false,
						recurring: true,
						total: 2696,
						month: 2
					},
					{
						description: 'Ränta Tomten',
						isOnCredit: false,
						recurring: true,
						total: 9500,
						month: 2
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
						total: 3500,
						month: 2
					},
					{
						description: 'Matkassar',
						isOnCredit: true,
						recurring: true,
						total: 2397,
						month: 2
					},
					{
						description: 'Lunch/fika',
						isOnCredit: false,
						recurring: true,
						total: 500,
						month: 2
					},
					{
						description: 'LUS',
						isOnCredit: false,
						recurring: true,
						total: 1500,
						month: 2
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
						total: 2250,
						month: 2
					},
					{
						description: 'Rör du så dör du',
						isOnCredit: true,
						recurring: true,
						total: 2000,
						month: 2
					},
					{
						description: 'Pension (mikaela)',
						isOnCredit: false,
						recurring: true,
						total: 1000,
						month: 2
					}
				]
			}
		]
	}
];
