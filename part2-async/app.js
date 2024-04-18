const baseURL = "https://deckofcardsapi.com/api/deck";
let deckId = null;

async function drawCard() {
  let card = await $.getJSON(`${baseURL}/new/draw/`);
  let { suit, value } = card.cards[0];
  console.log(`${value} of ${suit}`);
}

let firstCard = null;
async function drawMultipleCards() {

  let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
  let card1 = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
  console.log(`${card1.cards[0].value} of ${card1.cards[0].suit}`)
  let card2 = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
  console.log(`${card2.cards[0].value} of ${card2.cards[0].suit}`)
}
let $btn = $("button");
let $cardArea = $(".card-area");

async function drawCards() {

  let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);

  $btn.show().on("click", async function () {
    let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
    let cardImg = cardData.cards[0].image;
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
    if (cardData.remaining === 0) $btn.remove();
  });
}
