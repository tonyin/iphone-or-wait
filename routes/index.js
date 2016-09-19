var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'iPhone or Wait?'
  });
});

/* GET votes */
router.get('/votes', (req, res) => {
  var db = req.db;
  var coll = db.get('votes');
  coll.count({vote: 'upgrade'}).then((votesUpgrade) => {
    coll.count({vote: 'wait'}).then((votesWait) => {
      res.send({
        votesUpgrade: votesUpgrade,
        votesWait: votesWait
      });
    });
  });
});

/* POST votes */
router.post('/vote/upgrade', function (req, res) {
  console.log(req);
  var db = req.db;
  db.collection('votes')
    .insert({
      gen: 'iphone7',
      vote: 'upgrade',
      timestamp: Date.now()
    });
  res.send('ok');
});
router.post('/vote/wait', function (req, res) {
  var db = req.db;
  db.collection('votes')
    .insert({
      gen: 'iphone7',
      vote: 'wait',
      timestamp: Date.now()
    });
    res.send('ok');
});

module.exports = router;
