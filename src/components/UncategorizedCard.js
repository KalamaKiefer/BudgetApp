import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import ExpenseCard from './ExpenseCard'


/* 
    pass props to self closing expense card, uncategorized is like wrapper around expense card.
    amount calculated like in app for budgets accept using uncategorized budget id from context.
    Uses custom hook useBudgets to calculate the uncategorized expenses. 
    First check if uncategorized budget amount is equal to 0 and if true then dont show uncategorized card.
*/

export default function UncategorizedCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, 
        expense) => total + expense.amount, 0)
    
    if (amount === 0) return null

    return (
        <ExpenseCard amount={amount} name="Uncategorized" grayed {...props}/>
    )
}
