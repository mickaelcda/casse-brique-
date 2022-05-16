const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const rayonBalle = 10, barreHauteur = 10, barreLargeur = 75;

// Positionner la balle et la barre sur x et y 
let x = canvas.width/2, y = canvas.height -30,
barreX = (canvas.width - barreLargeur)/2;

// Dessiner la barre et la balle 

function dessineBalle() {
    
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, Math.PI * 2);
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

