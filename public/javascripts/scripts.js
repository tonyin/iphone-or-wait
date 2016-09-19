document.addEventListener('DOMContentLoaded', function() {
  setVotes();
  checkVoted();
});

function setVotes() {
  $.get('/votes', (data) => {
    var votesUpgrade = data.votesUpgrade;
    var votesWait = data.votesWait;

    var votesUpgradeElem = document.getElementById('votes-upgrade')
    votesUpgradeElem.innerHTML = votesUpgrade;
    var votesWaitElem = document.getElementById('votes-wait')
    votesWaitElem.innerHTML = votesWait;
    
    var verdict = document.getElementById('verdict');
    if (votesUpgrade > votesWait) {
      verdict.innerHTML = 'upgrade.'
    } else if (votesUpgrade < votesWait) {
      verdict.innerHTML = 'wait.'
    } else {
      verdict.innerHTML = '??'
    };
  });
};

function checkVoted() {
  var voted = Cookies.get('iphone7');
  var yourVote = document.getElementById('your-vote');
  if (typeof voted !== 'undefined') {
    var overlays = document.getElementsByClassName('overlay');
    Array.from(overlays).forEach((e, i, array) => {
      array[i].style.display = 'none';
    });
    yourVote.innerHTML = 'You voted to ' + voted + '.';
  } else {
    yourVote.innerHTML = 'You have not yet voted.';
  };
};
function setVoted(gen, vote) {
  Cookies.set(gen, vote);
  setVotes();
  checkVoted();
};

/* API */
function voteUpgrade () {
  var voted = Cookies.get('iphone7');
  if (voted == null) {
    $.post('/vote/upgrade', setVoted('iphone7', 'upgrade'));
  };
};
function voteWait () {
  var voted = Cookies.get('iphone7');
  if (voted == null) {
    $.post('/vote/wait', setVoted('iphone7', 'wait'));
  };
};
