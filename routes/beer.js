var Beer = require('../modules/db.js').model;

exports.create = function(req, res){
  // CREATE
  var dados = req.body;

  var beer = new Beer(dados);
  var query = {};

  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log('Houve algum erro, tente novamente', err);
        } else {
          // res.render('beer_list', {cervejas: beers, title: "Minhas cervejas"});
          res.redirect('/beers');
        }
      });
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
  });
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

exports.delete = function(req, res){
  // DELETE

  var id = req.params.id;
  var query = {};

  query = {_id: id};

  Beer.remove(query, function(err) {
    if(err) {
      console.log(err);
    } else {
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log('Houve algum erro, tente novamente', err);
        } else {
          // res.render('beer_list', {cervejas: beers, title: "Minhas cervejas"});
          res.redirect('/beers');
        }
      });
    }
  });
}










