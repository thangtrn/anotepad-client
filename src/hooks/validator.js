import { toast } from "react-toastify";

function validator(formData) {
    const {email, password, confirmPassword, secret} = formData;
    const errors = [];
    
    for(const key in formData) {
        if(!formData[key]) {
            if(key==='confirmPassword') {
                errors.push(`Please enter your confirm password.`)
            }
            else if(key==='secret') {
                errors.push(`Please enter your secret answer.`)
            }
            else{
                errors.push(`Please enter your ${key}.`)
            } 
        }
    }

    if(!validateEmail(email)) {
        errors.push('Invalid email.');
    }
    if(password.length < 6) {
        errors.push('Password must be at least 6 characters.');
    }
    if(password !== confirmPassword) {
        errors.push('Confirm password incorrect.');
    }
    if(secret.length < 3) {
        errors.push('Secret answer must be at least 3 characters.');
    }

    if(errors.length > 0) {
        errors.forEach((er) => {
            toast.warning(er, {autoClose: 3000});
        })
        return false
    }
    
    return true
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default validator