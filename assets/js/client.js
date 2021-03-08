// SETUP
// MOMENT - npm dependency for formating dates
var moment = require('moment'); // require
const githubDiv = document.getElementById('github');

function getAllRepos() {
  console.log('FETCHING REPOS');
  fetch('https://api.github.com/users/HeyAero/repos')
    .then((r) => r.json())
    .then(addRepos)
    .catch(addWarning);
}

function addRepos(data) {
  console.log(data);
  githubDiv.innerHTML = '';
  const sortedData = data.sort(function compare(a, b) {
    var dateA = new Date(a.updated_at);
    var dateB = new Date(b.updated_at);
    console.log(dateA);
    return dateB - dateA;
  });
  console.log(sortedData);
  const newData = sortedData.slice(0, 3);
  newData.forEach(appendRepo);
}

function appendRepo(repo) {
  console.log('TEST');
  const name = repo.name;
  const html_url = repo.html_url;
  const description = repo.description || 'One of my repos';
  const updated = moment(repo.updated_at).format('DD/MM/YYYY');
  createCard(name, html_url, description, updated);
}

function addWarning() {
  const h1Warning = document.createElement('H1');
  h1Warning.innerHTML = 'No repos found :(';
}

function createCard(name, url, desc, date) {
  const cardHolder = document.createElement('DIV');
  cardHolder.classList.add('github-card');
  cardHolder.classList.add('col-sm');
  cardHolder.classList.add('p-5');
  cardHolder.classList.add('m-2');
  const nameEl = document.createElement('h5');
  const dateEl = document.createElement('p');
  dateEl.classList.add('card-date');
  const descEl = document.createElement('p');
  const urlEl = document.createElement('a');

  nameEl.innerHTML = name;
  dateEl.innerHTML = date;
  descEl.innerHTML = desc;
  urlEl.innerHTML = 'Click Here to View';
  urlEl.setAttribute('href', url);

  cardHolder.appendChild(dateEl);
  cardHolder.appendChild(nameEl);
  cardHolder.appendChild(descEl);
  cardHolder.appendChild(urlEl);

  githubDiv.appendChild(cardHolder);
}

module.exports = {
  getAllRepos,
};
