import { Button, Modal, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"


/* 
    view expenses form uses custom useBudgets hook to get the functions
    getBudgetExpenses to calculate budget expenses, as well as deleteBudget and deleteExpense.
    We use a stack in the header and position it horizontaly to show the expenses for a specific budget.
    Pass in budgetId to use as show for the form(if budgetId is not null show form). 
    To get the actual budget first check if the budgetId is the uncategorized budget id, if true then 
    create a new budget so we can use it otherwise search through the budgets array and find the matching
    budgetId for an existing budget. In div in stack put question mark to say if budget is defined then get name 
    otherwise ignore. If budgetId is not uncategorized(cannot delete uncategorized) then show button for deleting. 
    In the body use a vertical stack with big gaps of 3 to map the expenses we get from context using getBudgetExpenses
    function. Put each individual expense in a horizontal stack with gap of 2 and the expense decsription, 
    the currency formatter with the expense amount, and a close button using &times;.
*/
export default function ViewExpensesForm({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const expenses = getBudgetExpenses(budgetId)
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } : 
    budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }} variant="outline-danger">Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Stack direction="vertical" gap={3}>
                       {expenses.map(expense => (
                           <Stack direction="horizontal" gap="2" key={expense.id}>
                               <div className="me-auto fs-4">{expense.description}</div>
                               <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                               <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                           </Stack>
                       ))}
                   </Stack>
                </Modal.Body>
        </Modal>
    )
}
