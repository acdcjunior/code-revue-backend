import * as express from 'express';
import * as bodyParser from 'body-parser';

import config from '../config';
import webhooksController from "./webhooksController";

const app = express();

app.use(express.static('resources/public'));

app.use(bodyParser.json());

webhooksController(app);

app.get('*', function(req, res){
    // The 404 Route (ALWAYS Keep this as the last route)
    res.status(404).send(`No endpoint is listening at ${req.url} via GET. Wrong HTTP method, maybe?`);
});

app.listen(config.codeRevue.repoGitlab.codeRevueBackendPort, '0.0.0.0', () => {
    console.log(`
CodeRevue now listening at port ${config.codeRevue.repoGitlab.codeRevueBackendPort}.

CodeRevue webhooks URL (for the integrations project page) will be: ${config.codeRevue.repoGitlab.codeRevueBackendUrl + config.codeRevue.repoGitlab.webhooksUrl}
`);
    console.log(`CodeRevue is up at ${config.codeRevue.repoGitlab.codeRevueBackendUrl}.`);
});
