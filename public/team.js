document.addEventListener('DOMContentLoaded', () => {
  const teams = [
    { abbreviation: 'ANA', fullName: 'Anaheim Ducks' },
    { abbreviation: 'ARI', fullName: 'Arizona Coyotes' },
    { abbreviation: 'BOS', fullName: 'Boston Bruins' },
    { abbreviation: 'BUF', fullName: 'Buffalo Sabres' },
    { abbreviation: 'CGY', fullName: 'Calgary Flames' },
    { abbreviation: 'CAR', fullName: 'Carolina Hurricanes' },
    { abbreviation: 'CHI', fullName: 'Chicago Blackhawks' },
    { abbreviation: 'COL', fullName: 'Colorado Avalanche' },
    { abbreviation: 'CBJ', fullName: 'Columbus Blue Jackets' },
    { abbreviation: 'DAL', fullName: 'Dallas Stars' },
    { abbreviation: 'DET', fullName: 'Detroit Red Wings' },
    { abbreviation: 'EDM', fullName: 'Edmonton Oilers' },
    { abbreviation: 'FLA', fullName: 'Florida Panthers' },
    { abbreviation: 'LAK', fullName: 'Los Angeles Kings' },
    { abbreviation: 'MIN', fullName: 'Minnesota Wild' },
    { abbreviation: 'MTL', fullName: 'Montreal Canadiens' },
    { abbreviation: 'NSH', fullName: 'Nashville Predators' },
    { abbreviation: 'NJD', fullName: 'New Jersey Devils' },
    { abbreviation: 'NYI', fullName: 'New York Islanders' },
    { abbreviation: 'NYR', fullName: 'New York Rangers' },
    { abbreviation: 'OTT', fullName: 'Ottawa Senators' },
    { abbreviation: 'PHI', fullName: 'Philadelphia Flyers' },
    { abbreviation: 'PIT', fullName: 'Pittsburgh Penguins' },
    { abbreviation: 'SJS', fullName: 'San Jose Sharks' },
    { abbreviation: 'STL', fullName: 'St. Louis Blues' },
    { abbreviation: 'TBL', fullName: 'Tampa Bay Lightning' },
    { abbreviation: 'TOR', fullName: 'Toronto Maple Leafs' },
    { abbreviation: 'VAN', fullName: 'Vancouver Canucks' },
    { abbreviation: 'VGK', fullName: 'Vegas Golden Knights' },
    { abbreviation: 'WSH', fullName: 'Washington Capitals' },
    { abbreviation: 'WPG', fullName: 'Winnipeg Jets' }
  ];

  const teamForm = document.getElementById('teamForm');
  const teamSelect = document.getElementById('teamAbbreviation');
  const teamNameDisplay = document.getElementById('team-name');

  if (teamForm && teamSelect) {
    teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.abbreviation;
      option.textContent = `${team.fullName} (${team.abbreviation})`;
      teamSelect.appendChild(option);
    });

    teamForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      const selectedTeamAbbreviation = teamSelect.value;
      const selectedTeam = teams.find(team => team.abbreviation === selectedTeamAbbreviation);

      if (selectedTeam) {
        fetch(`https://hz-challenge-api-nhl-v2.onrender.com/proxy/v1/club-stats/${selectedTeamAbbreviation}/20232024/2`)
          .then(response => response.json())
          .then(data => {
            console.log('Data fetched:', data);
            const players = data.skaters;

            const teamStats = document.getElementById('team-stats');
            teamStats.innerHTML = `
  <h2 class="text-xl mb-2">Team: ${selectedTeam.fullName}</h2>
  <table class="table-auto w-full text-left border border-collapse border-black">
    <thead>
      <tr>
        <th class="border px-4 py-2 border-black">Name</th>
        <th class="border px-4 py-2 border-black">Position</th>
        <th class="border px-4 py-2 border-black">Games Played</th>
        <th class="border px-4 py-2 border-black">Goals</th>
        <th class="border px-4 py-2 border-black">Assists</th>
        <th class="border px-4 py-2 border-black">Points</th>
        <th class="border px-4 py-2 border-black">Plus/Minus</th>
        <th class="border px-4 py-2 border-black">Penalty Minutes</th>
        <th class="border px-4 py-2 border-black">Power Play Goals</th>
        <th class="border px-4 py-2 border-black">Shorthanded Goals</th>
        <th class="border px-4 py-2 border-black">Game Winning Goals</th>
        <th class="border px-4 py-2 border-black">Overtime Goals</th>
        <th class="border px-4 py-2 border-black">Shots</th>
        <th class="border px-4 py-2 border-black">Shooting %</th>
        <th class="border px-4 py-2 border-black">Time On Ice (avg)</th>
        <th class="border px-4 py-2 border-black">Shifts (avg)</th>
        <th class="border px-4 py-2 border-black">Faceoff Win %</th>
      </tr>
    </thead>
    <tbody id="player-table-body">
      ${players.map(player => `
        <tr>
          <td class="border px-4 py-2 border-black">${player.firstName.default} ${player.lastName.default}</td>
          <td class="border px-4 py-2 border-black">${player.positionCode}</td>
          <td class="border px-4 py-2 border-black">${player.gamesPlayed}</td>
          <td class="border px-4 py-2 border-black">${player.goals}</td>
          <td class="border px-4 py-2 border-black">${player.assists}</td>
          <td class="border px-4 py-2 border-black">${player.points}</td>
          <td class="border px-4 py-2 border-black">${player.plusMinus}</td>
          <td class="border px-4 py-2 border-black">${player.penaltyMinutes}</td>
          <td class="border px-4 py-2 border-black">${player.powerPlayGoals}</td>
          <td class="border px-4 py-2 border-black">${player.shorthandedGoals}</td>
          <td class="border px-4 py-2 border-black">${player.gameWinningGoals}</td>
          <td class="border px-4 py-2 border-black">${player.overtimeGoals}</td>
          <td class="border px-4 py-2 border-black">${player.shots}</td>
          <td class="border px-4 py-2 border-black">${(player.shootingPctg * 100).toFixed(2)}%</td>
          <td class="border px-4 py-2 border-black">${player.avgTimeOnIcePerGame.toFixed(2)}</td>
          <td class="border px-4 py-2 border-black">${player.avgShiftsPerGame.toFixed(2)}</td>
          <td class="border px-4 py-2 border-black">${(player.faceoffWinPctg * 100).toFixed(2)}%</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

          })
          .catch(error => console.error('Error fetching data:', error));
      }
    });
  }
});
