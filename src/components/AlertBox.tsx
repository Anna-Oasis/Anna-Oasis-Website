import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type alertProps = {
    alertTitle : string,
    alertDescription : string,
    error : boolean
}

const AlertBox: React.FC<alertProps> = ({
    alertTitle,
    alertDescription,
    error
}) => {
    return (
        <Alert variant={error ? 'destructive' : 'default'}>
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>{alertDescription}</AlertDescription>
        </Alert>
    );
}

export default AlertBox;
