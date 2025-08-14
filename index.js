import express, { json, urlencoded } from 'express';
import { readFileSync } from 'fs';

const app = express();
const port = 3032;

app.use(json({ extended: false }));
app.use(urlencoded({ extended: true }));

const rulesData = readFileSync('./data/rules.json');
let availableRules = JSON.parse(rulesData)["rules"];

function getRuleById(id) {
    return availableRules.find(rule => rule.id === id);
}

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/get-rule', (req, res) => {
    let { tags } = req.query;

    tags = tags ? tags.split(',') : [];
    tags = tags.filter(tag => tag != "non-constant");

    const filteredRules = availableRules.filter(rule => {
        if (!tags || tags.length === 0) return true;
        return tags.every(tag => rule.tags.includes(tag));
    });

    if (filteredRules.length === 0) {
        return res.send({ success: false, content: 'No matching rules found' });
    }

    const randomRuleId = filteredRules[Math.floor(Math.random() * filteredRules.length)].id;
    res.send({success: true, content: getRuleById(randomRuleId)});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
    process.exit();
});
