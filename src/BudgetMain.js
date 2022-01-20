import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import ExpenseCard from "./components/ExpenseCard";
import AddBudgetForm from "./components/AddBudgetForm";
import AddExpenseForm from "./components/AddExpenseForm"
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import UncategorizedCard from "./components/UncategorizedCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesForm from "./components/ViewExpensesForm";

export default function BudgetMain() {
  const [showAddBudget, setAddBudget] = useState(false)
  const [showAddExpense, setAddExpense] = useState(false)
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState()
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()


  // function opens add expense form from specific budget
  // by taking in budgetId and setting the budget category
  // directly to that ID
  function openAddExpenseBudget(budgetId) {
    setAddExpense(true)
    setAddExpenseBudgetId(budgetId)
  }


  // container for default bootstrap styles, uses my-4 for spacing on top and bottom of page
  // stack contains elements, gap spaces elements 1-5, and mb-4 gives a lot of margin on bottom
  // to give space from each budget container, h1 clas name me-auto for auto reposition so h1 always
  // on left side of screen(margin on end of h1 takes up as much space as possible).
  // custom css grid to contain each budget card. 1rem gap between the cards.
  // map budgets using custom useBudgets hook and mapping over expense card with budget details.
  // Using a small function for amount calculating, that gets all expenses for the budget adds them together
  // and returns that value as the amount. when add expense is clicked on a specific budget card
  // openAddExpense function called and pass the specific budget id in to open the expense form with the current budget.
  return (
    <>
      <Container className="my-4"> 
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget App</h1>
          <Button onClick={() => setAddBudget(true)} variant="primary">Add a Budget</Button> 
          <Button onClick={openAddExpenseBudget} variant="outline-primary">Add an Expense</Button>
        </Stack>
        {/* using css grid, minimum size 300px, max size 1fr take up as much space */}
        <div style={{display:"grid", gridTemplateColumns: 
        "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1rem", alignItems: "flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, 
              expense) => total + expense.amount, 0)

          return <ExpenseCard key={budget.id} name={budget.name} amount={amount} limit={budget.limit}
              onAddExpenseClick={() => openAddExpenseBudget(budget.id)} 
              onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}></ExpenseCard>
        })}
          <UncategorizedCard onAddExpenseClick={openAddExpenseBudget} onViewExpensesClick={() => setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetForm show={showAddBudget} handleClose={() => setAddBudget(false)}/>
      <AddExpenseForm show={showAddExpense} defaultBudgetId={addExpenseBudgetId} handleClose={() => setAddExpense(false)} />
      <ViewExpensesForm budgetId={viewExpensesBudgetId} handleClose={() => setViewExpensesBudgetId()} />
    </>
  );
}


