export const userSesionMiddleware = (req, res, next) => {
  try {
    const { user } = req.session
    if (!user) return res.status(403).send('Access not Autorized')
    next()
  } catch (e) {
    return { message: e }
  }
}
