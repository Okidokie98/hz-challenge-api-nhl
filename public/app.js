document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

    const teamButton = document.getElementById('team');

    if (teamButton) {
        console.log('Team button found');
        teamButton.addEventListener('click', () => {
            console.log('Team button clicked');
            fetch(`https://hz-challenge-api-nhl.onrender.com/https://api-web.nhle.com/v1/club-stats/${selectedTeamAbbreviation}/20232024/2`)
                .then(response => response.json())
                .then(data => {
                    console.log('Data fetched:', data);
                    const players = data.data;
                    const teamStats = document.getElementById('team-stats');
                    teamStats.innerHTML = `
                        <h1 class="text-2xl font-bold mb-4">Team: Nashville Predators</h1>
                        <h2 class="text-xl mb-2">Debut Year: 1998</h2>
                        <table class="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th class="border px-4 py-2">Name</th>
                                    <th class="border px-4 py-2">Position</th>
                                    <th class="border px-4 py-2">Goals</th>
                                    <th class="border px-4 py-2">Assists</th>
                                    <th class="border px-4 py-2">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${players.map(player => `
                                    <tr>
                                        <td class="border px-4 py-2">${player.firstName} ${player.lastName}</td>
                                        <td class="border px-4 py-2">${player.position}</td>
                                        <td class="border px-4 py-2">${player.goals}</td>
                                        <td class="border px-4 py-2">${player.assists}</td>
                                        <td class="border px-4 py-2">${player.points}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    } else {
        console.error('Team button not found');
    }
});
