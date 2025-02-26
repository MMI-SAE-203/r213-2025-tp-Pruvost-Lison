//Lison Pruvost B1

import { record } from 'astro:schema';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090') ;


export async function getMaisonsParSurface(surface) {
    try {
        let data = await pb.collection('Maison').getFullList({
            filter: `surface > ${surface}`
        });
        return data;
    } catch (error) {
        console.log('Erreur lors de la récupération des maisons par surface', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

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
    console.log ("ici dans bySurface:", surface)
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


export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imgUrl = pb.files.getURL(maison, maison.images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function getAllAgents() {
    return await pb.collection("Agent").getFullList();
}

export async function getAgentById(id) {
    return await pb.collection("Agent").getOne(id);
}


export async function getOffresByAgent(agentEmail) {
    return await pb.collection("Maison").getFullList({
        filter: `Agent = "${agentEmail}"`,
    });
}


export async function getAllAgents() {
    try {
        const agents = await pb.collection("Agent").getFullList({
            auth: null, // Permet d'accéder sans authentification
        });
        return agents;
    } catch (error) {
        console.error("Erreur lors de la récupération des agents :", error);
        return [];
    }
}



export async function setFavori(id, favori) {
    try {
        await pb.collection("Maison").update(id, { favori: favori });
        console.log(`Maison ${id} mise à jour avec favori = ${favori}`);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du favori :", error);
    }
}