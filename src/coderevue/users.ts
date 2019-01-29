import {firestore} from "../db/db";


export async function getAllUserKeys(): Promise<string[]> {

    let usersCollectionRef = await firestore.collection('users');
    const query = await usersCollectionRef.select();
    const querySnapshot = await query.get();
    return querySnapshot.docs.map(queryDocumentSnapshot => queryDocumentSnapshot.id);

}