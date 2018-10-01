const express = require('express');
const router = express.Router();


// FIXME about API https://expressjs.com/en/4x/api.html

router.get('/', (request, response, next) => {

    // get mongoDB Instance from app
    request.app.get('mongodb').collection('offers').find().toArray((err, offers) => {
        if (err) next(new Error(err));
        response.json(offers);
    });

});

router.put('/', async (req, res, next) => {
    if (!req.query.name && !req.query.discount)
        return res.status(400).json({message: "miss some data"});

    try {
        const result = await req.app.get('mongodb').collection('offers').insertOne({
            ...req.query,
            createDate: new Date()
        });
    } catch (e) {
        return next(new Error(e));
    }

    return res.json({message: "it\'s save", result});
});

module.exports = router;
