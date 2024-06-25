import { Col, Container, Row } from "react-bootstrap";

interface TitleWithButtonProps {
  title: string,
  buttons: React.ReactNode;
}

function TitleWithButton({title, buttons}: TitleWithButtonProps) {
  return(
    <Container className="header-title">
        <Row>
            <Col className='text-start'>{title}</Col>
            <Col className='text-end'>{buttons}</Col>
        </Row>
    </Container>
  );
}

export default TitleWithButton;