import { Button } from "react-bootstrap";

export default function LandingPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="h1 mb-4">Welcome to Budget App</div>
      <Button href="/budget" variant="outline-primary">
        Start Budgeting
      </Button>
    </div>
  );
}
