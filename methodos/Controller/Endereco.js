//index,show,store,update,destroy
const Endereco = require('../Model/Endereco');

const request = require();

module.exports = {
  //Index traz todos os registros pelo methodo Get
  async index(req,res){
    //Busca todos os registross
    let enderecos = await Endereco.find();
    return res.json(endereco);
  },

  //show traz um registro onde o id do registro é igual ao id assado na url
  async show(req, res){
    //Busca um registro no banco
    let endereco = await Endereco.findOne({_id : req.params.id});
    return res.json(endereco);
  },

  //Store usa o methodo POST para gravar
  async store(req, res){

    end = request('http://viacep.com.br/ws/'+ cep +'/json/', function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode);        
        
        console.log('body:', body); 
        var data = JSON.parse(body)
    //passa os dados que veio do post para uma variavel
        const cep = data.cep;
        const logradouro = data.logradouro;
        const complemento = data.complemento;
        const bairro = data.bairro;
        const localidade = data.localidade;
        const uf = data.uf;
        const ibge = data.ibge;
        const user_id = data.user_id;
        Endereco.create({cep, logradouro, complemento, bairro, localidade, uf, ibge, user_id});
    });
    return res.json(endereco);
  },
  
  //update pega o id, busca no banco esse registro, alreta ele no controlador e manda gravar
  async update(req, res){
    //recupero o registro
    let endereco = await Endereco.findOne({cep : req.params.cep});
    //edito os registros    
    endereco.logradouro = req.body.logradouro;
    endereco.complemento = req.body.complemento;
    endereco.bairro = req.body.bairro;
    endereco.localidade = req.body.localidade;
    endereco.uf = req.body.uf;
    endereco.ibge = req.body.ibge;
    endereco.user_id = req.body.user_id;
    //atualiza os dados no banco
    endereco = await Endereco.update(endereco);

    return res.json(end);
  },

  //delete = apaga o registro de cordo com o id pasasado no parametro
  async destroy(req, res){
    let endereco = await Endereco.deleteOne({_id : req.params.id});
    return res.json(endereco);
  }
};