const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const rayonBalle = 10, barreHauteur = 10, barreLargeur = 75,
    nbCol = 8, nbLigne = 5, largeurBrique = 75 , hauteurbrique = 20;

// Positionner X et Y pour la balle et barreX pour la barre 
let x = canvas.width/2, y = canvas.height -30,
barreX = (canvas.width - barreLargeur)/2;

// Dessiner la barre et la balle 

function dessineBalle() {
    
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, 360); // postion sur x et y, rayon, angle de depart, angle de fin 
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
dessineBalle()

function dessinebarre() {

    ctx.beginPath();
    ctx.rect(barreX, canvas.height - barreHauteur - 2, barreLargeur, barreHauteur); //position sur x puis y  longueur et hauteur
    ctxfillStyle = '#333'; 
    ctx.fill();
    ctx.closePath()
}

//dessinebarre()

// tableau de colonne imbriqué dans le tableau de ligne
// pour chaques briques du tableau 3D nous créons un objet
const briques = [];

for (i = 0; i < nbLigne; i++){

    briques[i] = [];

    for (j = 0; j < nbCol; j++){

        briques[i][j] = {x:0,y:0,statut:1}
    }
}

console.log(briques)

/*
   Pour centrer les briques sur l'abscisse il nous faut le nb de briques par ligne  * largeur de briques  8*75 = 600
   l'espace générer par tour de boucle à la fin de chaques briques pour les separer les unes des autres 8*10 = 80
   pour la marge l'espace restant diviser par deux  750-680 = 70 / 2 = 35 
   !important nous n'avons besoins que de 7 espaces entres les briques,
   il faut donc redistribuer a la marge les 10 pixel généré a la fin de la derniere brique
   70 + 10 / 2 = 40 
*/

function dessinerBriques() {

    for (i = 0; i < nbLigne; i++) {
        for (j = 0; j < nbCol; j++) {
            if (briques[i][j].statut === 1) {

                 let briqueX = (j * (largeurBrique + 10) + 40); //au 1 er tour de boucle j*(75+10) = 0 + 40 -- briqueX = 40
                let briqueY = (i * (hauteurbrique + 10) + 30); //au 1 er tour de boucle i*(20+10) = 0 + 30 -- briqueY = 30

                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;

                ctx.beginPath();
                ctx.rect(briqueX, briqueY, largeurBrique, hauteurbrique);
                ctx.fillStyle = '#333'
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

dessinerBriques()