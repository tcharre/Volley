let teams = ["Équipe A", "Équipe B"];

window.onload = function() {
    let homeTeamSelect = document.getElementById('homeTeam');
    let awayTeamSelect = document.getElementById('awayTeam');
    
    teams.forEach(team => {
        let option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        homeTeamSelect.appendChild(option.cloneNode(true));
        awayTeamSelect.appendChild(option);
    });
}

// Définissez les fonctions comme méthodes globales en les attachant à `window`
window.updateVisitorOptions = function updateVisitorOptions() {
    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam');
    awayTeam.innerHTML = `<option value="">-- Sélectionner une équipe --</option>`;

    teams.filter(team => team !== homeTeam)
         .forEach(team => {
            let option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            awayTeam.appendChild(option);
         });
}

window.goToNextPage = function goToNextPage() {
    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam').value;
    if (homeTeam && awayTeam) {
        window.location.href = `terrain.html?homeTeam=${homeTeam}&awayTeam=${awayTeam}`;
    } else {
        alert('Veuillez sélectionner les deux équipes.');
    }
}
