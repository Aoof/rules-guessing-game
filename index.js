import express, { json, urlencoded } from 'express';
import { readFileSync, writeFile, writeFileSync } from 'fs';

const app = express();
const port = 3032;

app.use(json({ extended: false }));
app.use(urlencoded({ extended: true }));

const rulesData = readFileSync('./data/rules.json');
let availableRules = JSON.parse(rulesData)["rules"].map((rule) => ({ id: null, text: rule }));

for (let i = availableRules.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableRules[i], availableRules[j]] = [availableRules[j], availableRules[i]];
}

availableRules = availableRules.map((rule, index) => ({ ...rule, id: index + 1 }));

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
    let takenRules = readFileSync('./data/taken.json', 'utf-8');
    takenRules = JSON.parse(takenRules)["taken"]
    let _availableRules = availableRules.filter(rule => !takenRules.includes(rule.id));

    if (_availableRules.length === 0) {
        res.send({success: false, content: 'No available rules ask for a rule check, the current taken rules are: ' + takenRules.sort((a, b) => a - b).join(', ')});
    } else {
        const randomRuleId = _availableRules[Math.floor(Math.random() * _availableRules.length)].id;
        writeFile('./data/taken.json', JSON.stringify({ taken: [...takenRules, randomRuleId] }), (err) => {
            if (err) {
                console.error(err);
                res.send({success: false, content: 'Error writing taken file'});
                return;
            }
            res.send({success: true, content: getRuleById(randomRuleId)});
        });
    }
});

app.get('/restart-taken', (req, res) => {
    let { password } = req.params;
    if (password == 'whippersnapper') writeFileSync('./data/taken.json', JSON.stringify({ taken: [] }));
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.on('close', () => {
    writeFileSync('./data/taken.json', JSON.stringify({ taken: [] }));
});

process.on('SIGINT', () => {
    app.emit('close');
    process.exit();
});
