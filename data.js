let githubReposData;

async function fetchGithubData(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data = await response.json();
    githubReposData = data;
    console.log("Данные успешно получены:", githubReposData);

    // Call renderPage here after githubReposData is fetched
    renderPage(username, githubReposData);
  } catch (error) {
    console.error(error.message);
  }
}

fetchGithubData("annakh85");

function renderRepos(repos) {
  const markup = repos
    .map(
      (repo) => `
        <li>
            <a href="${repo.html_url}">${repo.name}</a>
        </li>
    `
    )
    .join("");
  return markup;
}

function renderPage(username, repos) {
  const markup = `
        <h1>Репозитории ${username}</h1>
        <div id="reposContainer">
            <div class="repo">
                <div class="repo-name">
                    <a href="https://github.com/${username}">Link to repository</a>
                </div>
                <ul class="repo-list">
                     ${renderRepos(repos)}
                </ul>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", markup);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage("annakh85", githubReposData);
});
