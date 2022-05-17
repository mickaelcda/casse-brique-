const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const affichageScore = document.querySelector('.score');

const rayonBalle = 10, barreHauteur = 10, barreLargeur = 75,
    nbCol = 8, nbLigne = 5, largeurBrique = 75 , hauteurBrique = 20;

// Positionner X et Y pour la balle et barreX pour la barre 
let x = canvas.width/2, y = canvas.height -30,
barreX = (canvas.width - barreLargeur)/2 , fin = false, vitesseX = 5, vitesseY = -5, score = 0;

// Dessiner la barre et la balle 

function dessineBalle() {
    
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, 360); // postion sur x et y, rayon, angle de depart, angle de fin 
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
//dessineBalle()

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

//console.log(briques)

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
                let briqueY = (i * (hauteurBrique + 10) + 30); //au 1 er tour de boucle i*(20+10) = 0 + 30 -- briqueY = 30

                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;

                ctx.beginPath();
                ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
                ctx.fillStyle = '#333'
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

//dessinerBriques()


function dessine() {
    
    if (fin === false) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // on efface tout (x, y, largeur, hauteur)
        dessinerBriques();
        dessineBalle();
        dessinebarre();
        detectionCollision()
        //faire rebondir la balle 
        /* vitesseX incremente la valeur de x au fur et a mesure quand x atteint la largeur du canvas
         moins le rayon de la balle on change la valeur de vitesseX en -vitesseX pour decrementer */
        if (x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle) {
            vitesseX = -vitesseX;
        }
        if (y + vitesseY < rayonBalle) {
            vitesseY = -vitesseY
        }
        if (y + vitesseY > canvas.height - rayonBalle - barreHauteur) {
            
            if (x > barreX - rayonBalle && x < barreX + barreLargeur + rayonBalle) {
                vitesseX = vitesseX + 0.1;
                vitesseY = vitesseY + 0.1;
                vitesseY = -vitesseY;
            }
            else { 
                fin = true;
                affichageScore.innerHTML = `Perdu <br> Clique sur le casse brique pour recommencer.`
            }
        }
        x += vitesseX;
        y += vitesseY;
        requestAnimationFrame(dessine) // On callback la fonction

    }

}

dessine();
//console.log(x );
//console.log(y );
//console.log(vitesseX);
//console.log(vitesseY);
function detectionCollision() {
    
    for(let i = 0; i < nbLigne; i++){
        for(let j = 0; j < nbCol; j++){

            let b = briques[i][j];
            if(b.statut === 1){
                if(x > b.x - rayonBalle && x < b.x + largeurBrique + rayonBalle && y > b.y - rayonBalle && y < b.y  + hauteurBrique + rayonBalle){
                    vitesseY = -vitesseY;
                    b.statut = 0;

                    score++;
                    affichageScore.innerHTML = `Score : ${score}`;

                    setTimeout(() => {
                        if(score === nbCol * nbLigne){
                        
                            affichageScore.innerHTML = `Bravo ! <br> Clique sur le casse-briques pour recommencer.`,
                            fin = true                                               
                    }
                    },2000)
                  
                }
            }

        }
    }

}




// Mouvement de la barre

document.addEventListener('mousemove', mouvementSouris);

function mouvementSouris(e){

let posXBarreCanvas = e.clientX - canvas.offsetLeft;
    
    /*
    e.clienX = de la gauche de l'ecran jusqu'à la souris
    canvas.offsetLeft = du bord gauche du canvas à la gauche de l'ecran
    posXBarreCanvas = de la gauche du canvas a position de la souris 
    */
     
    if(posXBarreCanvas > barreLargeur / 2 && posXBarreCanvas < canvas.width - barreLargeur / 2){
        barreX = posXBarreCanvas - barreLargeur / 2;
        //console.log(barreX);
    }

}

