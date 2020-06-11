const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let flag = 0;
let totalMiss = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  if (hits > 0) {
    $(event.target).removeClass("target");
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  // TODO: помечать target текущим номером
  if (hits <= maxHits - 1) {
    $('.target').text(hits + 1);
  }
  // FIXME: тут надо определять при первом клике firstHitTime
  if (flag===0) {
      flag = 1;
      firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.game-field').removeClass();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(totalMiss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $('.target').text('');
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } 
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass("miss");
    totalMiss = totalMiss + 1;
  }
  setTimeout(function() {
    $(event.target).removeClass("miss");
    }, 500);
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
