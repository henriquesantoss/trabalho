
async function fetchGitHubData(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
          throw new Error('Erro ao buscar dados do GitHub');
      }
      const userData = await response.json();
      return userData;
  } catch (error) {
      console.error('Erro:', error);
  }
}


async function fetchGitHubRepos(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
          throw new Error('Erro ao buscar repositórios do GitHub');
      }
      const reposData = await response.json();
      return reposData;
  } catch (error) {
      console.error('Erro:', error);
  }
}


async function loadGitHubData(username, isMainUser = false) {
  try {
      const userData = await fetchGitHubData(username);
      const reposData = await fetchGitHubRepos(username);

      
      if (isMainUser) {
          document.getElementById('github-avatar').src = userData.avatar_url;
          document.getElementById('github-name').textContent = userData.name || 'Nome do Usuário';
          document.getElementById('github-bio').textContent = userData.bio || '';

          
          const repoCards = document.getElementById('repo-cards');
          repoCards.innerHTML = '';
          reposData.slice(0, 3).forEach(repo => {
              const card = document.createElement('div');
              card.classList.add('card');
              card.innerHTML = `
                  <div class="card-body">
                      <h5 class="card-title">${repo.name}</h5>
                      <p class="card-text">${repo.description || 'Sem descrição.'}</p>
                      <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Ver Repositório</a>
                  </div>
              `;
              repoCards.appendChild(card);
          });
      } else {
          
          console.log('Não é o usuário principal.');
      }
  } catch (error) {
      console.error('Erro ao carregar dados do GitHub:', error);
  }
}


async function loadCoworkers() {
  try {
      const response = await fetch('http://localhost:3000/colegas');
      if (!response.ok) {
          throw new Error('Erro ao buscar colegas de trabalho');
      }
      const coworkersData = await response.json();

      // Exibir colegas de trabalho
      const coworkersDiv = document.getElementById('coworkers');
      coworkersDiv.innerHTML = '';
      coworkersData.slice(0, 3).forEach(coworker => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
              <img src="${coworker.foto}" class="coworker-avatar" alt="Foto do Colega">
              <div class="card-body">
                  <h5 class="card-title">${coworker.nome}</h5>
                  <a href="${coworker.github}" target="_blank" class="btn btn-primary">Perfil</a>
              </div>
          `;
          coworkersDiv.appendChild(card);
      });
  } catch (error) {
      console.error('Erro ao carregar colegas de trabalho:', error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadGitHubData('henriquesantoss', true); 
  loadCoworkers(); 
});
const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'))
}

function showSlider() {
  slider[currentSlide].classList.add('on')
}

function nextSlider() {
  hideSlider()
  if(currentSlide === slider.length -1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  showSlider()
}

function prevSlider() {
  hideSlider()
  if(currentSlide === 0) {
    currentSlide = slider.length -1
  } else {
    currentSlide--
  }
  showSlider()
}

btnNext.addEventListener('click', nextSlider)
btnPrev.addEventListener('click', prevSlider)

async function loadGitHubData(username, isMainUser = false) {
  try {
      const userData = await fetchGitHubData(username);
      const reposData = await fetchGitHubRepos(username);

      if (isMainUser) {
          document.getElementById('github-avatar').src = userData.avatar_url;
          document.getElementById('github-name').textContent = userData.name || 'Nome do Usuário';
          document.getElementById('github-bio').textContent = userData.bio || '';

          const repoCards = document.getElementById('repo-cards');
          repoCards.innerHTML = '';
          reposData.slice(0, 3).forEach(repo => {
              const card = document.createElement('div');
              card.classList.add('card');
              card.innerHTML = `
                  <div class="card-body">
                      <h5 class="card-title">${repo.name}</h5>
                      <p class="card-text">${repo.description || 'Sem descrição.'}</p>
                      <button class="btn btn-primary" onclick="viewRepo('${repo.name}', '${repo.description}', '${repo.html_url}', '${repo.language}', '${repo.created_at}', '${repo.stargazers_count}')">Ver Repositório</button>
                  </div>
              `;
              repoCards.appendChild(card);
          });
      } else {
          console.log('Não é o usuário principal.');
      }
  } catch (error) {
      console.error('Erro ao carregar dados do GitHub:', error);
  }
}

function viewRepo(name, description, url, language, createdAt, stars) {
    const repoData = {
        name,
        description,
        url,
        language,
        createdAt,
        stars
    };
    localStorage.setItem('repoData', JSON.stringify(repoData));
    window.location.href = 'repo.html';
}
