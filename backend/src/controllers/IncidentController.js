const connection = require('../database/connection');

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query

    //retorna apenas 1 valor por isso a desestruturação com [count].
    const [count] = await connection('incidents').count();

    //limita o numero de casos pra 5 por pagina e o offset informa a partir de qual caso vai pegar 
    /**o join é utilizado para juntar dados de outras tabelas. Nesse caso ele ta pegando da tabela
     * ongs (apenas quando o id da ong for o mesmo do FK ong_id) os dados como nome email e whats
    **/
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp', 
      'ongs.city'
    ]);

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    //request.headers -> cabeçalho da requisição: dados da autenticação do usuario, idioma, contexto da requisição
    const ong_id = req.headers.authorization;


    // desestruturamos o id de dentro do elemento que nos inserimos no BD, já que o mesmo é autoincremental e gerado automaticamente na nossa migration
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    return res.json({ id })
  },

  async delete(req, res){
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    // pegamos o ong_id onde na tabela de incidentes o id for igual ao id passado nos parametros
    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    //verifica se o ong_id do incidente é o mesmo do ong_id passado no header e retornamos um erro em caso negativo
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error : 'Operation not permited'})
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();

  }
};