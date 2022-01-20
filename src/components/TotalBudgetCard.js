import { useBudgets } from "../contexts/BudgetsContext";
import ExpenseCard from "./ExpenseCard";


/* 
    total budget card almost same as uncategorized.
    uses useBudgets custom hook to get the expenses and budgets.
    two small functions to reduce the expenses and budgets to calculate the total budget limit
    passes in hide buttons prop to hide the add and view expensed buttons on total card.
*/

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, 
        expense) => total + expense.amount, 0)
    
    const limit = budgets.reduce((total, 
        budget) => total + budget.limit, 0)
    
    if (limit === 0) return null

    return <ExpenseCard amount={amount} name="Total" grayed limit={limit} hideButtons/>    
        
}
