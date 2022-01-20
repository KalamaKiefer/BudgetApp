import { Button } from "react-bootstrap";


export default function LandingPage() {
    return (
        <div className="text-center">
            <div className="h1 mb-5 mt-5">Welcome to Budget App</div>
            <Button href="/budget" variant="outline-primary" >Start Budgeting</Button>
        </div>
    )
}
