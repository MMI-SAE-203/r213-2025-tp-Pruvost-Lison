//Lison Pruvost B1

import { record } from 'astro:schema';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090') ;

export async function allMaisons() {
    let records = await pb.collection('Maison').getFullList();
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.images[0]);
        return maison;
    });
    return records;
}

// Question 11

export async function oneID(id) {
    const oneRecord = await pb.collection('Maison').getOne(id);
    return oneRecord;
}

// Question 12

export async function allMaisonsFavori() {
    const records = await pb.collection('Maison').getFullList({
        filter: 'favori = true'
    });
    return records;
}

// Question 13
export async function allMaisonsSorted() {
    const records = await pb.collection('Maison').getFullList({
        sort: 'prix'
    });
    return records;
}

// Question 14
export async function bySurface(surface) {
    const records = await pb.collection('Maison').getFullList({
        filter: `surface > ${surface}`  
    });
    return records;
}

//Question 15
export async function surfaceORprice(surface, price) {
    const records = await pb.collection('Maison').getFullList({
        filter: `surface > ${surface} || prix < ${price}` 
    });
    return records;
}

//Question 16 sur Pocketbase

//Question 19
export async function getAgentByID(id) {
    try {
        const agent = await pb.collection('Agent').getOne(id);
        return agent;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'agent :", error);
        return null;
    }
}
