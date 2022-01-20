import { currencyFormatter } from "../utils";
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';


export default function ExpenseCard({ name, amount, limit, grayed, onAddExpenseClick, hideButtons, onViewExpensesClick}) {
    const cardColor = [] // array to set card background color based on amount

    // if the expense amount is more than the limit set card background color to red
    if(amount > limit) {
        cardColor.push("bg-danger", "bg-opacity-10") 
    } else if (grayed) { // if grayed prop is passed set card color to gray
        cardColor.push("bg-light")
    }


    // function to check the budget ratio and return proper color scheme
    function getProgressColor(amount, limit) {
        const ratio = amount / limit

        // check ration and return color
        if(ratio < 0.5) return "primary" // if ratio is less than 50 color is primary
        else if(ratio < .75) return "warning" // else if its over 50% but less than 75% color is warning
        else return "danger" // if budget amount is over 75% color is danger
    }

    return (
        // bootstrap card component holds expenses and title and so on
        // retrieve name of card and amount / limit from pops passed
        // use utils file to format currency. make span so we can style limit
        // make text muted and font size 6 to show less emphasis.
        // add margin at start of 1 to seperate num from slash.
        // utilize progress bar from bootstrap for expense tracking
        // only return limit span and progress bar if their is a max limit on budget.
        // if hide buttons prop is not true then show stack and buttons, (total budget card hides buttons)
        <Card className={cardColor.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline 
                fw-normal mb-3">
                    <div className="me-2">{name}</div> 
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)} 
                       {limit && <span className="text-muted fs-6 ms-1">
                         / {currencyFormatter.format(limit)}
                        </span>}
                    </div>
                </Card.Title>
                {limit && <ProgressBar className="rounded-pill" variant={getProgressColor(amount, limit)}
                    min={0} max={limit} now={amount}
                />} 
                {!hideButtons && <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button  onClick={onAddExpenseClick} variant="outline-primary" className="ms-auto">
                        Add Expense
                    </Button>
                    <Button onClick={onViewExpensesClick} variant="outline-secondary">View Expenses</Button>
                </Stack>}
            </Card.Body>
        </Card>
    )
}
