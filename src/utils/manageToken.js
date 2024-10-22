import jwt from 'jsonwebtoken'
import { SECRET_JWS_KEY, SECRET_JWS_KEY_REFRESH } from '../config.js'

export const generateToken = (_id, name) => {
  try {
    const expiresIn = '5m'
    const token = jwt.sign({ _id, name },
      SECRET_JWS_KEY,
      { expiresIn })
    return { token, expiresIn }
  } catch (e) {
    return '{ message: e }'
  }
}

export const generateRefreshToken = (_id, name, res) => {
  try {
    const expiresIn = 60 * 60 * 24 * 7
    const refreshToken = jwt.sign({ _id, name },
      SECRET_JWS_KEY_REFRESH,
      { expiresIn })
    res.cookie('access_token_refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: expiresIn * 1000
    })
  } catch (e) {
    return { message: e }
  }
}
