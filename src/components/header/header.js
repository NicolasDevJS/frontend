import { Container, Navbar, Nav } from "react-bootstrap";


export default function Header() {
    return (
        <Navbar bg="light" variant="ligth" className="header">
            <Container>
                <Navbar.Brand href="#home">Pegaboy</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link href="#features">Sistema</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }