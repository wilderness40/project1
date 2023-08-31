const { body } = require('express-validator')

const isFieldEmpty = (field) => { //Form 필드가 비어있는지 검사
    return body(field)
    .not()
    .isEmpty()
    .withMessage(`user ${field} is requried`)
    .bail() // if email is empty. the following will not be run
    .trim()
}
const validationUserName = () => {
    return isFieldEmpty('name')
    .isLength({min: 2, max: 20}) // 이름 2~20자
    .withMessage('user name length must be between 2~20 characters')
}
const validationUserEmail = () => {
    return isFieldEmpty('email')
    .isEmail() // 이메일 형식에 맞는지 검사
    .withMessage('user email is not vaild')
}
const validationUserId = () => {
    return isFieldEmpty('userId')
    .isLength({min:4})
    .withMessage('아이디는 최소 4자 이상이어야 합니다')
    .bail()
    .isLength({max: 10})
    .withMessage('아이디는 10자를 넘을 수 없습니다')
    .bail()
    .not()
    .isAlpha()
    .withMessage('아이디는 숫자를 최소 하나를 포함하여야 합니다.')
    .bail()
}
const validationUserPassword = () => {
    return isFieldEmpty('password')
    .isLength({min: 7})
    .withMessage('password must be more than 7 characters')
    .bail()
    .isLength({max: 15})
    .withMessage('password must be less than 15 characters')
    .bail()
    .not()
    .isAlpha()
    .withMessage('password must be at least 1 number')
    .matches(/[!@#$%^&*]/)
    .withMessage('password must be at least 1 special charactor')
    .bail()
    //Form 에서 전달된 password 정보가 일치하는지 검사
    // value : password
    // .custom((value, { req }) => req.body.confirmPassword === value)
    // .withMessage('Passwords don\'t match.')
}

module.exports = {
    validationUserName,
    validationUserEmail,
    validationUserId,
    validationUserPassword
}