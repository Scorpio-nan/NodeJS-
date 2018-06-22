module.exports = {
    regUser: /^[a-zA-Z0-9_]{4,8}$/,
    regPass: /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/,
    regEmail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
}
