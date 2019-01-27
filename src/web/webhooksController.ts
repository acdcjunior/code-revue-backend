import {handleWebhook} from "../webhook/handleWebhook";

export default function (app) {

    app.post('/webhooks', function (request, response) {
        // noinspection JSIgnoredPromiseFromCall
        handleWebhook(request.body);
        response.send('Webhook received for processing, thanks.');
    });

};