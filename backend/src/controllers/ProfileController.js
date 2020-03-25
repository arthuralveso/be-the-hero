const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization
    const { page = 1 } = req.query

    //compara o id da ong do header com o id da ong do incident
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .limit(5)
    .offset((page - 1) * 5)
    .select('*');

    //se a resposta for um array vazio retorna um erro
    if (incidents.length === 0) {
      return res.status(400).json({error : 'No incidents found'})
    }

    return res.json(incidents)

  }
}