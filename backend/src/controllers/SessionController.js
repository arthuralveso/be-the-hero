const connection = require('../database/connection');


module.exports = {
  async create(req, res) {
    const { id } = req.body;

    //medoto firts é responsável por pegar apenas o valor e não o array com o valor
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return res.status(400).json({error : 'No ONG found with this ID' })
    }

    return res.json(ong)

  } 
}