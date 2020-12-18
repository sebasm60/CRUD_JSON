const { Router } = require('express');
const router = Router();
const fs = require('fs');

const gamesFile = fs.readFileSync("./games.json", "utf-8");
let games = JSON.parse(gamesFile);

router.get('/', (req, res) => {
    res.json('Bienvenido a mi API');
})

router.get('/games', (req, res) => {
    res.status(200).json(games);
})

router.post('/games', (req, res) => {
    const { name, platform, genre, year, developer } = req.body;

    if (!name || !platform || !genre || !year || !developer) {
        res.status(401).json({ error: 'Por favor, diligencie todos los datos.' });
    } else {
        const id = games.length + 1;

        let newGame = {
            id,
            name,
            platform,
            genre,
            year,
            developer,
        };

        games.push(newGame);
        const json_games = JSON.stringify(games);

        fs.writeFileSync('./games.json', json_games, 'utf-8');

        res.status(200).json_games;
    }
});

router.put('/games/:id', (req, res) => {
    const { name, platform, genre, year, developer } = req.body;
    const id = req.params.id;

    if (!name || !platform || !genre || !year || !developer || !id) {
        res.status(401).json({ error: 'Debe completar los datos y especificar el id.' })
    } else {
        games.filter((game) => {
            if (game.id == id) {
                game.name = name;
                game.platform = platform;
                game.genre = genre;
                game.year = year;
                game.developer = developer;
            }
        });

        const json_games = JSON.stringify(games);
        fs.writeFileSync('./games.json', json_games, 'utf-8');

        res.status(200).json(games);
    }
});

router.delete('/games/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ error: 'Especifique un Id' });
    } else {
        const indexGame = games.findIndex((game) => game.id === id);
        games.splice(indexGame, 1);

        const json_games = JSON.stringify(games);
        fs.writeFileSync('./games.json', json_games, 'utf-8');

        res.status(200).json(games);
    }
});

module.exports = router;