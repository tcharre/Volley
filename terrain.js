let teamsData = {
  "teams": [
      {
          "name": "Équipe A",
          "players": [
              {
                  "name": "Théo",
                  "image": "/assets/player/theo.png"
              },
              {
                  "name": "Lillian",
                  "image": "/assets/player/lillian.png"
              },
              {
                  "name": "Arthur",
                  "image": "/assets/player/arthur.png"
              },
              {
                  "name": "Benjamin",
                  "image": "/assets/player/benjamin.png"
              },
              {
                  "name": "Micka",
                  "image": "/assets/player/micka.png"
              },
              {
                  "name": "Mattieu",
                  "image": "/assets/player/mattieu.png"
              },
              {
                "name": "Mattieu",
                "image": "/assets/player/theo.png"
              }
          ]
      },
      {
          "name": "Équipe B",
          "players": [
            {
              "name": "Théo",
              "image": "/assets/player/theo.png"
          },
          {
              "name": "Lillian",
              "image": "/assets/player/lillian.png"
          },
          {
              "name": "Arthur",
              "image": "/assets/player/arthur.png"
          },
          {
              "name": "Benjamin",
              "image": "/assets/player/benjamin.png"
          },
          {
              "name": "Micka",
              "image": "/assets/player/micka.png"
          },
          {
              "name": "Mattieu",
              "image": "/assets/player/mattieu.png"
          },
          {
            "name": "Mattieu",
            "image": "/assets/player/theo.png"
          }
          ]
      }
  ]
};

function displayPlayers(players, containerId) {
  const container = document.getElementById(containerId);
  players.forEach(player => {
      let playerDiv = document.createElement('div');
      playerDiv.className = 'player';
      
      // Créer et ajouter l'image
      let playerImg = document.createElement('img');
      playerImg.src = player.image;
      playerImg.alt = player.name;
      playerDiv.appendChild(playerImg);
      
      // Ajouter le nom du joueur
      let playerName = document.createElement('div');
      playerName.innerText = player.name;
      playerDiv.appendChild(playerName);
      
      playerDiv.draggable = true;
      playerDiv.id = player.name;

      playerDiv.addEventListener('dragstart', handleDragStart);
      playerDiv.addEventListener('dragend', handleDragEnd);

      container.appendChild(playerDiv);
  });
}

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const homeTeam = urlParams.get('homeTeam');
  const awayTeam = urlParams.get('awayTeam');
  
  document.getElementById('homeTeamTitle').innerText = homeTeam;
  document.getElementById('awayTeamTitle').innerText = awayTeam;

  const homeTeamData = teamsData.teams.find(team => team.name === homeTeam);
  const awayTeamData = teamsData.teams.find(team => team.name === awayTeam);

  displayPlayers(homeTeamData.players, 'homePlayers');
  displayPlayers(awayTeamData.players, 'awayPlayers');

  // Initialize dropzones for drag and drop
  const dropzones = document.querySelectorAll('.dropzone');
  dropzones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
  });
};

function handleDragStart(e) {
  e.target.classList.add('dragging');
  e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
}

function handleDragOver(e) {
  e.preventDefault(); // Necessary to allow dropping
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const playerId = e.dataTransfer.getData('text/plain');
  const player = document.getElementById(playerId);

  if (player) {
    e.target.appendChild(player); // Move player to the dropzone
  }
}
