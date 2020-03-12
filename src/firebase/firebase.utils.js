import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAyQgkt7wJyl3MkowGBBbv8aA5UfO1gjY0",
    authDomain: "crwn-clothes-db-3f3fa.firebaseapp.com",
    databaseURL: "https://crwn-clothes-db-3f3fa.firebaseio.com",
    projectId: "crwn-clothes-db-3f3fa",
    storageBucket: "crwn-clothes-db-3f3fa.appspot.com",
    messagingSenderId: "324339851910",
    appId: "1:324339851910:web:af59fd890cb7c2646e2707"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const creactedAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                creactedAt,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user", error);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
