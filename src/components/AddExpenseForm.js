import { useRef } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"


/* 
    add expense form uses bootstrap modal and form
    form takes in props for when to show and handle close and a default budget id
    adds close button next to modal header. takes in show, handle close and default 
    budget id props, uses default budget id for form select.
    puts form in modal body, has groups for new budget name and limit
    adds some margin bottom to groups to add space between
    creates add button inside a div so we can position the button
    at the end of the form. uses reference(useRef) for controls(description, amount, budgetId)
    to reference the different variables and submit the form data.
    useBudgets hook to bring in all budgets and map through all the budgets
    as options for the form select. 
*/
export default function AddExpenseForm({ show, handleClose, defaultBudgetId }) {

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    // passes object with current expense description, amount, and budget id to 
    // addExpense. converts amount from string to float
    function handleSubmit(e){
        e.preventDefault()
        addExpense(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
            })
            handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Expense Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Expense Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={0.1}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add Budget</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
