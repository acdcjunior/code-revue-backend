import config from "../config";

const Firestore = require('@google-cloud/firestore');
const fs = require('fs');

fs.writeFileSync('/tmp/tmp-revue.json', config.codeRevue.dbJson || '');

export const firestore = new Firestore({
    projectId: 'code-revue',
    keyFilename: '/tmp/tmp-revue.json',
});

export async function databaseTest() {

    const docz = firestore.doc('test/Vf4Tm5AzTrB1KZMr1FhR');

    // Enter new data into the docz.
    await docz.set({
        title: 'Welcome to Firestore',
        body: 'Hello World',
    }).then(() => {
        console.log('Updated successfully ONE')
    });

    // Update an existing docz.
    await docz.update({
        body: 'My first Firestore app',
    }).then(() => {
        console.log('Updated successfully TWO')
        // Document updated successfully.
    });

    // Read the docz.
    await docz.get().then((doc) => {
        console.log(doc.id, '=>', doc.data());
    });

// Delete the docz.
//docz.delete().then(() => {
    // Document deleted successfully.
//});

}