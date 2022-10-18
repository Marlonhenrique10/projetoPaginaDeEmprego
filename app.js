const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./db/conexao.js');
const bodyParser = require('body-parser');
const jobs = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}))

// handle bars

// Aqui estou definindo aonde irá ficar a view do projeto
app.set('views', path.join(__dirname, 'views'));

// Aqui estou definindo qual será o arquivo principal view do projeto
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connaction
db
    .authenticate()
    .then(() => {
        console.log("Conectou com banco de dados com sucesso");
    })
    .catch(err => {
        console.log("Não foi possível conectar com o banco", err);
    })

// routes
app.get('/', (req, res) => {

    let pesquisar = req.query.job;
    let query = '%'+pesquisar+'%'; // criado para usar com o like Exmp: Digitou PH -> PHP, ou Java -> JavaScript

    if(!pesquisar) {
        // Chamando todos os dados da tabela jobs
        jobs.findAll({order: [
            ['createdAt', 'DESC'] // ordenando da mais nova para a mais velha
        ]})
        .then(dados => {
            // Renderizando a view
            res.render('index', {
                dados, // Levando os dados do back para a view com a variavel jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        // Chamando todos os dados da tabela jobs
        jobs.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC'] // ordenando da mais nova para a mais velha
        ]})
        .then(dados => {
            // Renderizando a view
            res.render('index', {
                dados, pesquisar, // Levando os dados do back para a view
            });
        })
        .catch(err => console.log(err));
    }
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));
