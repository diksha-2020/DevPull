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
}

function isProfileUpdateValid(dataToEdit){
    const ALLOWED_FIELDS = ["skills", "about", "avatarUrl", "lastName", "firstName", "age"];
    const areFieldsAllowed = Object.keys(dataToEdit).every((field) => ALLOWED_FIELDS.includes(field));
    console.log("^areFieldsAllowed", areFieldsAllowed);
    return areFieldsAllowed;
}

module.exports = {validateSignUpData, isProfileUpdateValid};