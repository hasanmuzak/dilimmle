const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');


router.route('/:word')
    .get((req, res, next) => {
        request(`https://tureng.com/tr/turkce-ingilizce/${req.params.word}`, (error, response, html) => {
            const meaningList = [];
           if(!error && response.statusCode === 200){
               const $ = cheerio.load(html);
               const dataTable = $("#englishResultsTable").first().find(".tr.ts");
               if (dataTable.length !== 0) {
                   dataTable.slice(0, 9).each((i, el) => {
                       const item = $(el).text();
                       if (meaningList.includes(item) === false) {
                           meaningList.push(item);
                       }
                   })
                   res.send({
                       data : meaningList
                   });
               } else {
                   res.status(400).send({
                       data : "Sonuç bulunamadı."
                   });
               }
           }
        });
    });


module.exports = router;