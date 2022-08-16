// comparer 2 tableaux
let listNumeroChoisi = [];
let nbrNumeroSelectionne = 0;
const effacerBtn = document.getElementById("reset").addEventListener("click",resetGrille);

const tirageBtn = document.getElementById("tirage");
console.log(tirageBtn);
tirageBtn.addEventListener("click",tirage);

function comparerNumeros(numerosTirage,numerosJouer){
    let nbrBonNumero = 0;
    let numeroCommun = [];
    if (numerosTirage.length > 0 || numerosJouer > 0) {
        
        for(let i = 0 ; i < numerosJouer.length; i++){
            for (let j = 0; j < numerosJouer.length; j++) {
                if (numerosTirage[i] === numerosJouer[j]) {
                    nbrBonNumero++;
                    numeroCommun.push(numerosJouer[j]);
                    
                }
                
            }
        }
    }
    return numeroCommun;
}

function creerGrilleLotoHtml(){
    // créer la grille container
    let grille = document.getElementById("grille");
    for (let i = 1; i < 50; i++) {
        let div = document.createElement("div");
        div.classList.add(""+i);
        div.classList.add("numero");
        div.innerHTML = `<p>${i}</p>`;
        grille.appendChild(div);
    }
    // document.getElementById("grilleContainer").appendChild(grille);
}



function ajouterEventNumero(){
    let listElementNumero = document.getElementsByClassName("numero");
    // console.log(listElementNumero);
    for(let i=0 ; i< listElementNumero.length; i++){
        listElementNumero[i].addEventListener("click",event =>{
            
            if(event.target.tagName.toLowerCase() !== 'p'){
                // console.log(event.target.classList);
                let numero = parseInt(event.target.classList[0]);
                // console.log("test ="+numero);
                if(event.target.classList.length === 3){
                    event.target.classList.toggle("chosen");
                    suprimmerNumero(numero);
                }
                else
                {
                    if (listNumeroChoisi.length<5) {
                        event.target.classList.toggle("chosen");
                        ajouterNumero(numero);
                        
                        // event.target.classList.add("animCase")
                    }
                }
               
                
            }
            else{
                let numero = parseInt(event.target.parentElement.classList[0]);
                // console.log("test ="+numero);
                if(event.target.parentElement.classList.length === 3){
                    event.target.parentElement.classList.toggle("chosen");
                    suprimmerNumero(numero);
                }
                else
                {
                    // debugger;
                    
                    // debugger;
                    if (listNumeroChoisi.length<5) {
                        event.target.parentElement.classList.toggle("chosen");
                        ajouterNumero(numero);
                    }
                    
                    // debugger;
                }
            }
            
            console.log(listNumeroChoisi);
            afficherNumeroChoisi();
        });
        
    }
    
    // TODO
}
function ajouterNumero(numero){
    // debugger;
    if (listNumeroChoisi.length <5) {
        // debugger
        listNumeroChoisi.push(numero);
        // debugger
        
        return true;
    }
    return false;
}
function suprimmerNumero(numero){
    if (listNumeroChoisi.length >0) {
        for(let i = 0; i< listNumeroChoisi.length;i++){
            if(parseInt(listNumeroChoisi[i]) === numero){
                listNumeroChoisi.splice(i,1);
                return true;
            }
        }
    }
    return false;
}
function randInt(max){
    return Math.floor(Math.random()*max +1);
}

function resetGrille(){
    
    let grille = document.getElementsByClassName("numero");
    
    listNumeroChoisi=[];
    for(let i=0;i<grille.length;i++){
        
        grille[i].classList.remove('chosen');
        
    }
    afficherNumeroChoisi();
}
document.getElementById("aleatoire").addEventListener("click",e =>{

    resetGrille();
    while(listNumeroChoisi.length<5){
        let num = randInt(49);
        if(listNumeroChoisi.indexOf(num)===-1){
            listNumeroChoisi.push(num);
        }
    }
    updateGrille();
    console.log(listNumeroChoisi);
});
function randomNumero(){
    let liste = [];
    while(liste.length<5){
        let randNum = randInt(49);
        if (liste.indexOf(randNum)===-1) {
            liste.push(randNum);
        }
    }
    return liste;
}
function updateGrille(){
    for (let i = 0; i < listNumeroChoisi.length; i++) {
        // console.log(document.getElementsByClassName(""+listNumeroChoisi[i]));
        let div = document.getElementsByClassName(""+(listNumeroChoisi[i]))
        console.log(div);
        div[0].classList.add('chosen');

        
    }
    afficherNumeroChoisi();
}

const afficherNumeroChoisi = () => {
    listNumeroChoisi.sort(function(a,b) {
        return a-b;
    });
    const p = document.getElementById("choisi");
    p.textContent="vos numéros : ";
    listNumeroChoisi.forEach((numero)=>{
        p.textContent+= `${numero}  `
    })

};

function afficherNumeroTires(numeros){
    numeros.sort(function(a,b){
        return a-b;
    });
    const p = document.getElementById("resultat");
    p.textContent="tirage :";
    numeros.forEach((numero)=>{
        p.textContent+= `${numero}  `;
    });
}

function tirage(){
    console.log("test");
    if(listNumeroChoisi.length===5){
        
        let numeroTires = randomNumero();
        let resultat = comparerNumeros(numeroTires,listNumeroChoisi);  
        console.log(resultat);
        afficherNumeroTires(numeroTires);
        let pComparaison = document.getElementById("comparaison");
        pComparaison.textContent = `Vous avez ${resultat.length} bon(s) numéro(s): `;
        resultat.forEach((numero) =>{
            pComparaison.textContent+= `${numero}  `;
        })
    }
    else{
        console.log("error, need 5 num");
    }
}
creerGrilleLotoHtml();
ajouterEventNumero();