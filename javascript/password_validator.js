let regularExpression = /^(?=.*[!@#$%-^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

function passValidator(password) {
    let boolValue = false;
    let message;

    if (password.length < 6) {
        message = 'Password should be minimum of 6 length!';
        return [boolValue, message];
    }

    if (password.length > 20) {
        message = 'Password should be maximum of 20 length!';
        return [boolValue, message];
    }

    if (password.search(/[A-Z]/) < 0) {
        message = 'Password should contain atleast 1 uppercase letter!';
        return [boolValue, message];
    }

    if (password.search(/[a-z]/) < 0) {
        message = 'Password should contain atleast 1 lowercase letter!';
        return [boolValue, message];
    }

    if (password.search(/[0-9]/) < 0) {
        message = 'Password should contain atleast 1 digit!';
        return [boolValue, message];
    }

    if (password.search(' ') != -1) {
        message = 'Password should not contain any spaces!';
        return [boolValue, message];
    }

    if (!regularExpression.test(password)) {
        message = 'Password should contain atleast 1 special character!';
        return [boolValue, message];
    }

    return [true, "Success"];

}