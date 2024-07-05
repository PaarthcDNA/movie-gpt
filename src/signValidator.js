export const signValidator = (email,password) => {
const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

if(!isEmailValid) return "Email id not valid"


}