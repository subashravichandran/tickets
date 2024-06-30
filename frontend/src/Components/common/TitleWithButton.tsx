import { Col, Container, Row } from "react-bootstrap";

interface TitleWithButtonProps {
  title: string,
  buttons: React.ReactNode;
}

function TitleWithButton({title, buttons}: TitleWithButtonProps) {
  return(
    <Container className="header-title">
        <Row className='title-row'>
            <Col className='text-start title-name'>{title}</Col>
            <Col className='text-end'>{buttons}</Col>
        </Row>
    </Container>
  );
}

export function Mandate () {
  return(<span className="mandatory-field"> *</span>);
}

export default TitleWithButton;