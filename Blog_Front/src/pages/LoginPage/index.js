import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import AlertComponent from "../../components/AlertComponent";
import CardLogin from "../CardLogin";
export default function LoginPage() {
    return (
        <Col className={styles.container}>
            <Row className={styles.container__row}>
                <Col xs={12} sm={8} md={4}>
                    <AlertComponent />
                    <CardLogin />
                </Col>
            </Row>
        </Col>
    );
}
