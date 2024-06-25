import { Col, Container, Row } from "react-bootstrap";

interface TitleWithButtonProps {
  title: string,
  buttons: React.ReactNode;
}

function TitleWithButton({title, buttons}: TitleWithButtonProps) {
  return(
    <Container>
        <Row>
            <Col>{title}</Col>
            <Col>{buttons}</Col>
        </Row>
    </Container>
  );
}

export default TitleWithButton;