import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase';

const useSelections = () => {
    const [selections, setSelections] = useState([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getSelections = async () => {
            firebase.db.collection('motorcycles').onSnapshot(handleSnapshot)
        }
        getSelections();
    },[]);

    function handleSnapshot(snapshot){
        const snapSelections = snapshot.docs.map( doc => {
        return {
            ...doc.data(),
            id: doc.id,
        }
        })
        setSelections(snapSelections);
    }

    async function saveGobalSelection(newSelections){
        // console.log(selections[0],{newSelections});
        await firebase.db.collection("motorcycles").doc(selections[0].id).update({ rented: newSelections });
    }

    return {selections: selections[0],saveGobalSelection};
}
 
export default useSelections;