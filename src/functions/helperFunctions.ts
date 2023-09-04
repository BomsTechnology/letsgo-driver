import { showMessage } from "react-native-flash-message";

const showError = (message: string, duration?: number) => {
    showMessage({
        message: message,
        type: "danger",
        icon: "danger",
        duration: duration ? duration : 2000,
        textStyle: {
            fontFamily: 'Poppins_300Light'
        }
    });
}

const showSuccess = (message: string, duration?: number) => {
    showMessage({
        message: message,
        type: "success",
        icon: "success",
        duration: duration ? duration : 2000,
        textStyle: {
            fontFamily: 'Poppins_300Light'
        }
    });
}

export { showError, showSuccess }; 