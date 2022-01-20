import { useRef } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"


/* 
    add budget form uses bootstrap modal and form
    form takes in props for when to show and handle close
    adds close button next to modal header 
    puts form in modal body, has groups for new budget name and limit
    adds some margin bottom to groups to add space between
    creates add button inside a div so we can position the button
    at the end of the form. uses reference(useRef) for controls(name and number)
    to reference the different variables and submit the form data.
*/
export default function AddBudgetForm({ show, handleClose }) {

    const nameRef = useRef()
    const limitRef = useRef()
    const { addBudget } = useBudgets()

    // passes object with current name and budget limit to 
    // addBudget hook. converts limit from string to float
    function handleSubmit(e){
        e.preventDefault()
        addBudget(
            {
                name: nameRef.current.value,
                limit: parseFloat(limitRef.current.value)
            })
            handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Budget Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="limit">
                        <Form.Label>Budget Limit</Form.Label>
                        <Form.Control ref={limitRef} type="number" required min={0} step={0.1}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add Budget</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
