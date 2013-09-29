var mongoose = require("mongoose")
  , Schema = mongoose.Schema
  , url = require("url");

mongoose.connect('mongodb://localhost/workshop-sampa');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' }
});

var Beer = mongoose.model('Beer', BeerSchema);

exports.create = function(req, res){
  // CREATE
  var dados = {
    name: "Baden Baden - Chocolate",
    description: "Tem gosto de chocolá",
    type: "Stout"
  };

  var beer = new Beer(dados);

  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('Cerveja cadastrada com sucesso');
    }
  });

} //fim create


exports.retrieve = function(req, res){  
  // RETRIEVE 
  var id = req.params.id;
  var query = {};

  query = {_id: id};

  Beer.findOne(query, function (err, beer) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_retrieve', {cerveja: beer, title: "Minha cerveja: "+beer.name});
    }
  });
}

exports.list = function(req, res){  
  // RETRIEVE
   var query = {};

  Beer.find(query, function (err, beers) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_list', {cervejas: beers, title: "Minhas cervejas"});
    }
  })
}

exports.update = function(req, res){
// UPDATE
  var id = req.params.id;
  var query = {};

  query = {_id: id};
  dados = req.body;

  Beer.update(query, dados, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja atualizada com sucesso');
      
      Beer.findOne(query, function (err, beer) {
        console.log('achou algo?');
        if(err) {
          console.log('Houve algum erro, tente novamente', err);
        } else {
          res.render('beer_retrieve', {cerveja: beer, title: "Minha cerveja: "+beer.name});
        }
      });
    }
  });
}

exports.delete = function(req, res, id){
  // DELETE
  Beer.remove({_id: id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      res.end('Cerveja deletada com sucesso!');
    }
  });
}









