$(function () {
  const baseURL = "https://deckofcardsapi.com/api/deck";
  let deckId = null;

  $.getJSON(`${baseURL}/new/draw/`).then((data) => {
    let { suit, value } = data.cards[0];
    console.log(`${value} of ${suit}`);
  });

  let firstCard = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
      firstCard = data.cards[0];
      deckId = data.deck_id;
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then((data) => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function (card) {
        console.log(`${card.value} of ${card.suit}`);
      });
    });

  deckId = null;
  let $btn = $("button");
  let $cardArea = $(".card-area");

  $.getJSON(`${baseURL}/new/draw/`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on("click", function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then((data) => {
      let cardImg = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $("<img>", {
          src: cardImg,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});
