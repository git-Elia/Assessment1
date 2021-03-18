import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USER:{
        USERNAME: process.env.USER_NAME,
        PASSWORD: process.env.PASSWORD
    },
    INVALID_USER:{
        USERNAME : 'invalid_user',
        PASSWORD : 'invalid_pw'
    }
}
export const USERINFO = {
    USER_INFO_VALID:{
        NAME : 'ELIA',
        LAST_NAME : 'RIOS',
        ZIP_CODE : '25000'
    }
}

