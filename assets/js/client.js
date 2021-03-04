// SETUP
const githubDiv = document.getElementById('github');

function getAllRepos() {
  console.log('FETCHING REPOS');
  fetch('https://api.github.com/users/HeyAero/repos')
    .then((r) => r.json)
    .then(addRepos)
    .catch(addWarning);
}

function dateSort(a, b) {
  return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
}

function addRepos(data) {
  githubDiv.innerHTML = '';
  data.sort(dateSort);
  const newData = data.slice(0, 3);
  newData.forEach(appendRepo);
}

function appendRepo(repo) {
  const name = repo.name;
  const html_url = repo.html_url;
  const description = repo.description ? repo.description : 'One of my repos';
  const updated = repo.updated_at;
}

module.exports {
  getAllRepos
}