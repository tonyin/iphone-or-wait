document.addEventListener('DOMContentLoaded', function() {
  setVotes();
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
      verdict.innerHTML = 'A: You should upgrade.'
    } else if (votesUpgrade < votesWait) {
      verdict.innerHTML = 'A: You should wait.'
    } else {
      verdict.innerHTML = 'A: Standby..'
    };
  });
};
function voteUpgrade () {
  $.post('/vote/upgrade',
    {
      gen: 'iphone7',
      vote: 'upgrade'
    }, setVotes());
};
function voteWait () {
  $.post('/vote/wait',
    {
      gen: 'iphone7',
      vote: 'wait'
    }, setVotes());
};
