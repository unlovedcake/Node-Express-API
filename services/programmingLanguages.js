const db = require('./db');
const helper = require('../helper');
const config = require('../config');



async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, released_year, github_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    const status = '200';


    return {
        data,
        meta,
        status,

    }
}


async function create(programmingLanguage) {
    const result = await db.query(
        `INSERT INTO programming_languages 
      (name, released_year, github_rank, pypl_rank, tiobe_rank) 
      VALUES 
      ("${programmingLanguage.name}","${programmingLanguage.released_year}", "${programmingLanguage.github_rank}", "${programmingLanguage.pypl_rank}", "${programmingLanguage.tiobe_rank}")`
    );



    let message = 'Error in creating programming language';
    const status = '200';
    let data = {};


    if (result.affectedRows) {
        message = 'Programming language created successfully';
        data = programmingLanguage;

    }

    return { message, data, status };
}

async function update(id, programmingLanguage) {
    const result = await db.query(
        `UPDATE programming_languages 
      SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, github_rank=${programmingLanguage.github_rank}, 
      pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
      WHERE id=${id}`
    );

    let message = 'Error in updating programming language';

    if (result.affectedRows) {
        message = 'Programming language updated successfully';
    }

    return { message };
}

async function remove(id, stat) {
    const result = await db.query(
        `DELETE FROM programming_languages WHERE id=${id}`
    );

    let message = 'Error in deleting programming language';



    if (result.affectedRows) {
        message = 'Programming language deleted successfully';

    }

    return { message };
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}