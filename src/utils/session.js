const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotallySecretKey')

const validateSession = async (req, res) => {
  await req.sessionStore.get(req.sessionID, (_err, data) => {
    if (data === undefined) {
      res.send('La sesión no existe, por favor ingrese nuevamente')
    }
  })
}

const destroySession = async (req) => {
  await req.sessionStore.destroy(req.sessionID, (err) => err)
}

const encryptPassword = (text) => {
  return cryptr.encrypt(text)
}

const decryptPassword = (text) => {
  return cryptr.decrypt(text)
}

module.exports = {
  validateSession,
  destroySession,
  encryptPassword,
  decryptPassword
}
