import { Col, Row } from "react-bootstrap";
import styles from './styles.module.scss';
import AlertComponent from "../../components/AlertComponent";
import CardRegister from "../CardRegister";
export default function RegisterPage() {
    return (
        <Col className={styles.container}>
            <Row className={styles.container__row}>
                <Col xs={12} sm={8} md={4}>
                    <AlertComponent />
                    <CardRegister />
                </Col>
            </Row>
        </Col>
    )
}
