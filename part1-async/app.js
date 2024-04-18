let favNumber = 3;
let baseURL = "http://numbersapi.com";

//Single number return
async function returnSingleNumberFact(num) {
  let fact = await axios.get(`${baseURL}/${num}?json`);
  console.log(fact.data.text);
}

//Multiple numbers returned
async function returnMultipleNumFacts() {
  let favNumbers = [3, 26, 23];
  let facts = await axios.get(`${baseURL}/${favNumbers}?json`);
  for (const [key, value] of Object.entries(facts.data)) {
    console.log(`${key}: ${value}`);
  }
}

// promise all numbers
async function returnMultipleFacts(num) {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${num}?json`))
  );
  facts.forEach((data) => {
    $("body").append(`<p>${data.text}</p?`);
  });
}
returnMultipleFacts(3)
