let teamsData = {
  "teams": [
      {
          "name": "Équipe A",
          "players": [
              {
                  "name": "Théo",
                  "image": "/public/player/theo.png"
              },
              {
                  "name": "Lillian",
                  "image": "/public/player/lillian.png"
              },
              {
                  "name": "Arthur",
                  "image": "/public/player/arthur.png"
              },
              {
                  "name": "Benjamin",
                  "image": "/public/player/benjamin.png"
              },
              {
                  "name": "Micka",
                  "image": "/public/player/micka.png"
              },
              {
                  "name": "Mattieu",
                  "image": "/public/player/mattieu.png"
              },
              {
                "name": "Guim",
                "image": "/public/player/guim.png"
              }
          ]
      },
      {
          "name": "Équipe B",
          "players": [
            {
              "name": "Théo",
              "image": "/public/player/theo.png"
          },
          {
              "name": "Lillian",
              "image": "/public/player/lillian.png"
          },
          {
              "name": "Arthur",
              "image": "/public/player/arthur.png"
          },
          {
              "name": "Benjamin",
              "image": "/public/player/benjamin.png"
          },
          {
              "name": "Micka",
              "image": "/public/player/micka.png"
          },
          {
              "name": "Mattieu",
              "image": "/public/player/mattieu.png"
          },
          {
              "name": "Guim",
              "image": "/public/player/guim.png"
          }
          ]
      }
  ]
};

let draggedPlayer = null;
let playerPositions = new Map(); // Pour stocker les positions des joueurs

function displayPlayers(players, containerId) {
  const container = document.getElementById(containerId);
  players.forEach(player => {
      let playerDiv = document.createElement('div');
      playerDiv.className = 'player ' + 
          (containerId === 'homePlayers' ? 'home-player' : 'away-player');
      playerDiv.id = player.name;
      
      let playerImg = document.createElement('img');
      playerImg.src = player.image;
      playerImg.alt = player.name;
      playerImg.draggable = false;
      playerDiv.appendChild(playerImg);
      
      let playerName = document.createElement('div');
      playerName.innerText = player.name;
      playerName.draggable = false;
      playerDiv.appendChild(playerName);
      
      playerDiv.draggable = true;
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
    draggedPlayer = e.target.closest('.player');
    if (!draggedPlayer) return;
    
    draggedPlayer.classList.add('dragging');
    e.dataTransfer.setData('text/plain', draggedPlayer.id);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedPlayer = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.target.closest('.dropzone');
    if (!dropzone || !draggedPlayer) return;

    // Vérifier si la dropzone contient déjà un joueur
    const existingPlayer = dropzone.querySelector('.player');
    
    if (existingPlayer) {
        // Si le joueur déplacé vient d'une dropzone
        const originalDropzone = draggedPlayer.parentElement;
        if (originalDropzone.classList.contains('dropzone')) {
            // Échanger les deux joueurs
            originalDropzone.appendChild(existingPlayer);
            dropzone.appendChild(draggedPlayer);
            
            // Mettre à jour les positions dans la Map
            playerPositions.set(existingPlayer.id, originalDropzone.id);
            playerPositions.set(draggedPlayer.id, dropzone.id);
        } else {
            // Si le joueur vient de la liste des joueurs, simplement le placer dans la dropzone
            // et remettre l'ancien joueur dans sa liste d'origine
            const playerList = existingPlayer.classList.contains('home-player') 
                ? document.getElementById('homePlayers')
                : document.getElementById('awayPlayers');
            
            playerList.appendChild(existingPlayer);
            dropzone.appendChild(draggedPlayer);
            playerPositions.set(draggedPlayer.id, dropzone.id);
            playerPositions.delete(existingPlayer.id);
        }
    } else {
        // Si la dropzone est vide, simplement placer le joueur
        dropzone.appendChild(draggedPlayer);
        playerPositions.set(draggedPlayer.id, dropzone.id);
    }

    // Sauvegarder les positions
    savePositions();
}

function savePositions() {
    const positions = Object.fromEntries(playerPositions);
    localStorage.setItem('playerPositions', JSON.stringify(positions));
}

function loadPositions() {
    const savedPositions = localStorage.getItem('playerPositions');
    if (savedPositions) {
        const positions = JSON.parse(savedPositions);
        Object.entries(positions).forEach(([playerId, zoneId]) => {
            const player = document.getElementById(playerId);
            const dropzone = document.getElementById(zoneId);
            if (player && dropzone) {
                dropzone.appendChild(player);
                playerPositions.set(playerId, zoneId);
            }
        });
    }
}

// Fonction d'initialisation
function initializeDragAndDrop() {
    // Ajouter les event listeners aux dropzones
    document.querySelectorAll('.dropzone').forEach(dropzone => {
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('drop', handleDrop);
    });

    // Charger les positions sauvegardées
    loadPositions();
}

// Appeler l'initialisation une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Votre code d'initialisation existant...
    initializeDragAndDrop();
});
