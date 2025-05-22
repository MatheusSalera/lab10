const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  qtde_disponivel: { type: Number, default: 0 }
});

module.exports = mongoose.model('Carro', carroSchema);

// Cadastrar novo carro
app.post('/carros/novo', async (req, res) => {
  await Carro.create(req.body);
  res.redirect('/carros/gerenciar');
});

// Atualizar carro
app.post('/carros/editar/:id', async (req, res) => {
  await Carro.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/carros/gerenciar');
});

// Remover carro
app.post('/carros/remover/:id', async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.redirect('/carros/gerenciar');
});

// Vender carro
app.post('/carros/vender/:id', async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  if (carro.qtde_disponivel > 0) {
    carro.qtde_disponivel -= 1;
    await carro.save();
  }
  res.redirect('/carros/gerenciar');
});

app.get('/carros/gerenciar', async (req, res) => {
  const carros = await Carro.find();
  res.render('admin', { carros });
});
