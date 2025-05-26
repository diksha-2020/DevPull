const validate = require("validator");

function validateSignUpData(req){
    console.log("req,", req.body);
    const {firstName, lastName, emailId} = req.body;
    if(firstName && (firstName.length < 4 || firstName.length > 40)){
        throw new Error("First Name is not valid!!");
    } else if(lastName && (lastName.length > 40)){
        throw new Error("Last name is not valid!!");
    } else if(!validate.isEmail(emailId)){
        throw new Error("Email id is not valid!!");
    } 
    // else {
    //     const isPasswordStrong = validate.isStrongPassword(password);
    //     if(!isPasswordStrong){
    //         throw new Error("Passord is not strong!!");
    //     }
    // }
}

module.exports = {validateSignUpData};