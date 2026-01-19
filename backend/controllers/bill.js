const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const R = require('ramda')

const { Expense, User } = require('../models')

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch {
			return res.status(401).json({ error: 'token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}
	next()
}


router.get('/', tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id)

		// Helper function to calculate income and expense totals
		const calculateTotals = (expenses) => {
			return expenses.reduce(
				(acc, expense) => {
					const { money } = expense;
					if (money > 0) {
						acc.income += money;
					} else {
						acc.expense += Math.abs(money);
					}
					return acc;
				},
				{ income: 0, expense: 0 }
			);
		};

		// Fetch all expenses for the user
		const expensesAll = await Expense.findAll({
			where: {
				userId: user.id
			},
			order: [['createdAt', 'ASC']]
		});

		// Filter out asset updates
		const expenses = expensesAll.filter(item => item.isAssetUpdate === false);

		// Group expenses by year and month manually
		const groupedByYear = {};

		expenses.forEach((expense) => {
			const expenseDate = new Date(expense.createdAt);
			const year = expenseDate.getFullYear();
			const month = expenseDate.getMonth() + 1; // 1-12

			// Initialize year if it doesn't exist
			if (!groupedByYear[year]) {
				groupedByYear[year] = {
					monthly: {},
					yearly: { income: 0, expense: 0 }
				};
			}

			// Initialize month if it doesn't exist
			if (!groupedByYear[year].monthly[month]) {
				groupedByYear[year].monthly[month] = { income: 0, expense: 0 };
			}

			// Add to monthly totals
			if (expense.money > 0) {
				groupedByYear[year].monthly[month].income += expense.money;
				groupedByYear[year].yearly.income += expense.money;
			} else {
				groupedByYear[year].monthly[month].expense += Math.abs(expense.money);
				groupedByYear[year].yearly.expense += Math.abs(expense.money);
			}
		});

		// Transform the data structure to match the expected format
		const billItems = {};

		Object.keys(groupedByYear).forEach((year) => {
			const yearData = groupedByYear[year];

			// Convert monthly object to array format
			const monthlyArray = Object.keys(yearData.monthly)
				.sort((a, b) => parseInt(a) - parseInt(b))
				.map((month) => ({
					[month]: yearData.monthly[month]
				}));

			billItems[year] = {
				monthly: monthlyArray,
				yearly: yearData.yearly
			};
		});

		res.json(billItems);

	} catch (error) {
		next(error)
	}
})

module.exports = router