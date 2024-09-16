const apiURL = 'https://conmebol-api.vercel.app/api/results';

function makeResult(resultado) {
    const { first_team, second_team, winner, date } = resultado; // Extraemos los equipos y el ganador

    const cardsContainer = document.querySelector(".results-container");

    // Crear elementos para mostrar los equipos y el marcador
    const titleFirstTeam = document.createElement('h3');
    titleFirstTeam.textContent = `${first_team.country} - Goles: ${first_team.goals}`;

    const titleSecondTeam = document.createElement('h3');
    titleSecondTeam.textContent = `${second_team.country} - Goles: ${second_team.goals}`;

    const ganador = document.createElement('h3');
    ganador.textContent = `Ganador: ${winner}`;

    const fecha = document.createElement('h3');
    fecha.textContent = `Fecha: ${new Date(date).toLocaleString()}`; // Formatear la fecha

    // Crear una tarjeta para mostrar los resultados
    const Card = document.createElement('div');
    Card.classList.add('result-card'); // Agregar una clase para estilos (opcional)
    Card.appendChild(titleFirstTeam);
    Card.appendChild(titleSecondTeam);
    Card.appendChild(ganador);
    Card.appendChild(fecha);
    Card.style.background = "gray";

    cardsContainer.appendChild(Card);
}

async function getResults() {
    try {
        const response = await fetch(apiURL);

        // Verificar si la respuesta es correcta (status 200)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const results = await response.json();

        // Iterar sobre cada jornada (ejemplo: "Jornada 8", "Jornada 7", etc.)
        Object.keys(results).forEach(jornada => {
            const jornadaResults = results[jornada];

            // Crear un título de jornada en el DOM (opcional)
            const jornadaTitle = document.createElement('h2');
            jornadaTitle.textContent = jornada;
            document.querySelector(".results-container").appendChild(jornadaTitle);

            // Iterar sobre los resultados de la jornada
            jornadaResults.forEach(result => {
                makeResult(result);
            });
        });

        console.log(results);  // Para ver el resultado completo en la consola

    } catch (error) {
        console.error(`Failed to fetch results: ${error.message}`);
    }
}

getResults();
