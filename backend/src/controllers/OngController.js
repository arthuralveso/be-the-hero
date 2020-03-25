//aqui nós iremos codar toda os metodos que a entidade ong pode fazer
//pra dps no routes.js nós importarmos apenas o metodo que queremos utilizar.
//mais organizado. Abstração

const connection = require('../database/connection');
// crypto para gerar o ID da ong de forma automatica (utilizado usualmente para criptografia)
const crypto = require('crypto');

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
  
  // o crypto vai gerar 4 caracteres randomicos e transforma-los em strings no formato hexadecimal (documentação do node)
  const id = crypto.randomBytes(4).toString('HEX');

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  });

  return res.json({ id });
  },

  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }
}