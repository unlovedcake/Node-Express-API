const router = require('express').Router();
//const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/all', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

/* POST programming language */
router.post('/programming-languages/create', async function (req, res, next) {
    try {


        res.json(await programmingLanguages.create(req.body));
        console.log(`Save`, req.body);
        // console.log(`Save`, JSON.stringify(req.body));

    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/programming-languages/:id', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating programming language`, err.message);
        next(err);
    }
});

/* DELETE programming language */
router.delete('/programming-languages/:id', async function (req, res, next) {
    try {



        res.json(await programmingLanguages.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting programming language`, err.message);
        next(err);
    }
});

module.exports = router;