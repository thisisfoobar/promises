let favNumber = 3;
let baseURL = "http://numbersapi.com";

//Single number return
axios
  .get(`${baseURL}/${favNumber}?json`)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));


//Multiple numbers returned
let favNumbers = [3, 26, 23];
axios
  .get(`${baseURL}/${favNumbers[0]}?json`)
  .then((n1) => {
    console.log(n1.data);
    return axios.get(`${baseURL}/${favNumbers[1]}?json`);
  })
  .then((n2) => {
    console.log(n2.data);
    return axios.get(`${baseURL}/${favNumbers[2]}?json`);
  })
  .then((n3) => {
    console.log(n3.data);
  })
  .catch((err) => console.log(err));


// promise all numbers
Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}/${favNumber}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  });