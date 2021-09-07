import { Alert } from "react-bootstrap";

const AlertDismissible = (props) => {
      return (
        <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
          <Alert.Heading>{props.data}</Alert.Heading>
        </Alert>
      );
}

export default AlertDismissible;