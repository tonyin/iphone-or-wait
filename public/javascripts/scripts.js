function voteUpgrade () {
  $.post('/vote/upgrade',
    {
      gen: 'iphone7',
      vote: 'upgrade'
    });
};

function voteWait () {
  $.post('/vote/wait',
    {
      gen: 'iphone7',
      vote: 'wait'
    });
};
