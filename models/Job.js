const Sequelize = require('sequelize');
const db = require('../db/conexao');

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_jobs: {
        type: Sequelize.INTEGER,
    },
    createdAt: {
        type: Sequelize.INTEGER,
    },
    updatedAt: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Job;