
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Workshop ONLINE' });
};

exports.beer_create = function(req, res){
  res.render('beer_create', { title: 'Formulário de criação de cerveja' })
}