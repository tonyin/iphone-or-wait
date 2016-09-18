var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  var db = req.db;
  var coll = db.get('votes');
  coll.count({vote: 'upgrade'}).then((votesUpgrade) => {
    coll.count({vote: 'wait'}).then((votesWait) => {
      res.render('index', {
        title: 'iPhone or Wait?',
        votesUpgrade: votesUpgrade,
        votesWait: votesWait
      });
    });
  });
});

/* POST votes */
router.post('/vote/wait', function (req, res) {
  var db = req.db;
  db.collection('votes')
    .insert({
      gen: "iphone7",
      vote: "wait"
    });
    res.send('complete');
});
router.post('/vote/upgrade', function (req, res) {
  var db = req.db;
  db.collection('votes')
    .insert({
      gen: "iphone7",
      vote: "upgrade"
    });
  res.send('complete');
});

module.exports = router;
