// Definerer variablene
var paaBrett = ["dice0", "dice1", "dice2", "dice3", "dice4"]
var valgteTerninger = [];
var resultat = [];
var terningKombi = [];
var antallKast = 0;
var antallRunder = 0;
var terningVerdier = [];

var uValgt = document.getElementById('uValgt');
var Valgt = document.getElementById('Valgt');
var knapp1 = document.getElementById("knapp1");
var meldinger = document.getElementById("meldinger");

var aktivert = true;
var aktivert2 = true;

var enere = 0;
var toere = 0;
var treere = 0;
var firere = 0;
var femmere = 0;
var seksere = 0;
var verdiAntall = [];
var par = [];
var etPar = 0;
var toPar = 0;
var treLike = 0;
var fireLike = 0;
var litenStraight = 0;
var storStraight = 0;
var husPar;
var husTrio;
var hus = 0;
var sjanse = 0;
var tabellYatzy = 0;

var enereEl = document.getElementById("enere");
var toereEl = document.getElementById("toere");
var treereEl = document.getElementById("treere");
var firereEl = document.getElementById("firere");
var femmereEl = document.getElementById("femmere");
var seksereEl = document.getElementById("seksere");
var etParEl = document.getElementById("etPar");
var toParEl = document.getElementById("toPar");
var treLikeEl = document.getElementById("treLike");
var fireLikeEl = document.getElementById("fireLike");
var litenStraightEl = document.getElementById("litenStraight");
var storStraightEl = document.getElementById("storStraight");
var husEl = document.getElementById("hus");
var sjanseEl = document.getElementById("sjanse");
var tabellYatzyEl = document.getElementById("tabellYatzy");
var enTilSeksSumEl = document.getElementById("enTilSeksSum");
var bonusEl = document.getElementById("bonus");
var poengsumEl = document.getElementById("poengsum");

enereAktivert = true; toereAktivert = true; treereAktivert = true; firereAktivert = true; femmereAktivert = true;
seksereAktivert = true; etParAktivert = true; toParAktivert = true; treLikeAktivert = true; fireLikeAktivert = true;
litenStraightAktivert = true; storStraightAktivert = true; husAktivert = true; sjanseAktivert = true; tabellYatzyAktivert = true;

var sluttResultat = [];
var enTilSeksResultat = [];
var sluttsum = 0;

// Kast funkjonen som fullfører kast
async function kast() {
// Deaktiverer kast mens funksjonen kjører så man ikke kan klikke på den og de andre funksjonene og rote til
    if (aktivert == true ) {
    aktivert = false;
    aktivert2 = true;

    for (var i = 0; i < paaBrett.length; i++) {
            document.getElementById(paaBrett[i]).innerHTML = "<img src='media/blank.png' alt='blank' width='72px' lenght='72px' id='dank" + i + "'>";
        } 
    await sleep(300);

    if (antallKast >= 2) {
        meldinger.innerHTML = "<b><h4> Du har ingen kast igjen </h4> </b> <br>";
        knapp1.style.backgroundColor = "red";
        knapp1.style.border = "1px solid red";
        terningKombi = [];
        resultat = [];
        aktivert = false; // Gjør slik at angreterning og fjernterning funksjonene kan bli deaktivert

        for (var i = 0; i < paaBrett.length; i++) {
            resultat.push(Math.ceil(Math.random() * 6)); //Gjør de om til tilfeldige mellom 1-6
            terningKombi.push([paaBrett[i], resultat[i]]);
            document.getElementById(terningKombi[i][0]).innerHTML = "<img src='media/" + terningKombi[i][1] + ".png' alt='" + terningKombi[i][1] + "' width='72px' lenght='72px' id='dank" + i + "'>";
        }
        beregn()

        await sleep(500);

        while (uValgt.childNodes.length > 0) {
            Valgt.appendChild(uValgt.childNodes[0]);
        }

    } else {
        var kastIgjen = 2 - antallKast;
        meldinger.innerHTML = "<b><h4> Du har: " + kastIgjen + " kast igjen </h4> </b> <br>";
        terningKombi = [];
        resultat = [];
        for (var i = 0; i < paaBrett.length; i++) {
            resultat.push(Math.ceil(Math.random() * 6)); //Gjør de om til tilfeldige mellom 1-6
            terningKombi.push([paaBrett[i], resultat[i]]);
            document.getElementById(terningKombi[i][0]).innerHTML = "<img src='media/" + terningKombi[i][1] + ".png' alt='" + terningKombi[i][1] + "' width='72px' lenght='72px' id='dank" + i + "'>";
        }
        beregn();
        aktivert = true;
    }
    antallKast++;
}}

// Sender terningene til de valgte terningene
function fjernterning(terningId) {
    if (aktivert == true) {
    Valgt.appendChild(document.getElementById("dice" + terningId));
    paaBrett.splice(paaBrett.indexOf("dice" + terningId), 1);
    
    for(var i = 0; i < terningKombi.length; i++){
    if(terningKombi[i][0] == 'dice'+terningId) {
        valgteTerninger.push([terningKombi[i][0], terningKombi[i][1]]);
       }
    }


    for (var i = 0; i < 5; i++) {
        if (terningId == i) {
            document.querySelector("#dice" + i).setAttribute("onClick", "javascript: angreterning(" + i + ");");
        }
    }
}}

// Sender terningene tilbake til uvalgte terninger
function angreterning(terningId) {
    if (aktivert == true) {
    uValgt.appendChild(document.getElementById("dice" + terningId));
    paaBrett.push("dice" + terningId);

    for(var i = 0; i < valgteTerninger.length; i++){
    if(valgteTerninger[i][0] == 'dice'+terningId) {
        valgteTerninger.splice(i, 1);
       }
    }

    for (var i = 0; i < 5; i++) {
        if (terningId == i) {
            document.querySelector("#dice" + i).setAttribute("onClick", "javascript: fjernterning(" + i + ");");
        }

    }
}} 
// Sleep funksjon
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Beregne funksjonen
function beregn() {
// Resetter verdiene
    terningVerdier = [];

    // Får verdiene fra de forskjellige arrayene
    for (var i = 0; i < valgteTerninger.length; i++) {
        terningVerdier.push(valgteTerninger[i][1]);
    }
    // Kan gjøre det med resultat istedenfor terningKombi, men gjorde det slik
    for (var i = 0; i < terningKombi.length; i++) {
        terningVerdier.push(terningKombi[i][1]);
    }
    // Resetter verdiene
    enere = 0; toere = 0; treere = 0; firere = 0; femmere = 0; seksere = 0;

    // Summerer alt fra enere til seksere
       for (var i = 0; i < terningVerdier.length; i++) {
            if (terningVerdier[i] == 1) {
                enere += 1;
            }
            if (terningVerdier[i] == 2) {
                toere += 2;
            }
            if (terningVerdier[i] == 3) {
                treere += 3;
            }
            if (terningVerdier[i] == 4) {
                firere += 4;
            }
            if (terningVerdier[i] == 5) {
                femmere += 5;
            }
            if (terningVerdier[i] == 6) {
                seksere += 6;
            }
        } 
        // Resetter verdier
        verdiAntall = [];
        verdiAntall = [enere, toere/2, treere/3, firere/4, femmere/5, seksere/6];
        etPar = 0; toPar = 0; treLike = 0; fireLike = 0; litenStraight = 0;
        storStraight = 0; hus = 0; sjanse = 0; tabellYatzy = 0;

        // Lager array med par, resetter først
        par = [];
        for (var i = 0; i < verdiAntall.length; i++) {
            if (verdiAntall[i] >= 2) {
                par.push(i+1);
            }
        }
        // Et par
        if (par.length >= 1) {
            etPar = par[par.length-1]*2;
        }
        // To par
        if (par.length == 2) {
            toPar = par[0]*2+par[1]*2;
        }
        // Tre like
        for (var i = 0; i < verdiAntall.length; i++) {
            if (verdiAntall[i] >= 3) {
                y = i + 1;
                treLike = y*3;
            }
        }
        // Fire like
        for (var i = 0; i < verdiAntall.length; i++) {
            if (verdiAntall[i] >= 4) {
                y = i + 1;
                fireLike = y*4;
            }
        }        
        // Liten straight        
        if (Math.max(...verdiAntall) == 1 && verdiAntall[0] != 0 && verdiAntall[5] == 0) {
            litenStraight = 15;
        }
        // Stor straight
        if (Math.max(...verdiAntall) == 1 && verdiAntall[0] == 0 && verdiAntall[5] != 0) {
            storStraight = 20;
        }
        husPar = 0; husTrio = 0;
        // Hus
        if (par.length == 2 && treLike >= 1) {
            for (var i = 0; i < verdiAntall.length; i++) {
                if (verdiAntall[i] == 2) {
                    y = i + 1;
                    husPar = y * 2;
                } else if (verdiAntall[i] == 3) {
                    y = i + 1;
                    husTrio = y * 3;
                }
            } hus = husPar + husTrio;
        }  
        // Sjanse
        sjanse = enere + toere + treere + firere + femmere + seksere;
        // Yatzy
        for (var i = 0; i < verdiAntall.length; i++) {
            if (verdiAntall[i] == 5) {
                tabellYatzy = 50;
            }
        }
        // Gjør slik at aksjonene kan deaktiveres
        if (enereAktivert == true) {
            enereEl.innerHTML = enere;
            enereEl.setAttribute("onClick", "javascript: poeng(enere, 'enere');");
        }
        if (toereAktivert == true) {
            toereEl.innerHTML = toere;
            toereEl.setAttribute("onClick", "javascript: poeng(toere, 'toere');");
        }
        if (treereAktivert == true) {
            treereEl.innerHTML = treere;
            treereEl.setAttribute("onClick", "javascript: poeng(treere, 'treere');");
        }
        if (firereAktivert == true) {
            firereEl.innerHTML = firere;
            firereEl.setAttribute("onClick", "javascript: poeng(firere, 'firere');");
        }
        if (femmereAktivert == true) {
            femmereEl.innerHTML = femmere;
            femmereEl.setAttribute("onClick", "javascript: poeng(femmere, 'femmere');");
        }
        if (seksereAktivert == true) {
            seksereEl.innerHTML = seksere;
            seksereEl.setAttribute("onClick", "javascript: poeng(seksere, 'seksere');");
        }
        if (etParAktivert == true) {
            etParEl.innerHTML = etPar;
            etParEl.setAttribute("onClick", "javascript: poeng(etPar, 'etPar');");
        }
        if (toParAktivert == true) {
            toParEl.innerHTML = toPar;
            toParEl.setAttribute("onClick", "javascript: poeng(toPar, 'toPar');");
        }
        if (treLikeAktivert == true) {
            treLikeEl.innerHTML = treLike;
            treLikeEl.setAttribute("onClick", "javascript: poeng(treLike, 'treLike');");
        }
        if (fireLikeAktivert == true) {
            fireLikeEl.innerHTML = fireLike;
            fireLikeEl.setAttribute("onClick", "javascript: poeng(fireLike, 'fireLike');");
        }
        if (litenStraightAktivert == true) {
            litenStraightEl.innerHTML = litenStraight;
            litenStraightEl.setAttribute("onClick", "javascript: poeng(litenStraight, 'litenStraight');");
        }
        if (storStraightAktivert == true) {
            storStraightEl.innerHTML = storStraight;
            storStraightEl.setAttribute("onClick", "javascript: poeng(storStraight, 'storStraight');");
        }
        if (husAktivert == true) {
            husEl.innerHTML = hus;
            husEl.setAttribute("onClick", "javascript: poeng(hus, 'hus');");
        }
        if (sjanseAktivert == true) {
            sjanseEl.innerHTML = sjanse;
            sjanseEl.setAttribute("onClick", "javascript: poeng(sjanse, 'sjanse');");
        }
        if (tabellYatzyAktivert == true) {
            tabellYatzyEl.innerHTML = tabellYatzy;
            tabellYatzyEl.setAttribute("onClick", "javascript: poeng(tabellYatzy, 'tabellYatzy');");
        }
}

// Funksjon som setter permanent inn i tabellen
function poeng(sum, kombinasjon) {
if (aktivert2 == true) {
    aktivert2 = false;
    // Array for alle verdiene
    sluttResultat.push(sum);
    sluttsum = 0;
    // Teller sluttsummen
    for (var i = 0; i < sluttResultat.length; i++) {
        sluttsum += sluttResultat[i]
    }
    // Array for 1-6 verdiene
    if (kombinasjon == 'enere' || kombinasjon == 'toere' || kombinasjon == 'treere' || kombinasjon == 'firere' || kombinasjon == 'femmere' || kombinasjon == 'seksere') {
        enTilSeksResultat.push(sum);
    }

    var enTilSeksSum = 0;
    // Teller summen av kombinasjonene mellom 1 - 6
    for (var i = 0; i < enTilSeksResultat.length; i++) {
        enTilSeksSum += enTilSeksResultat[i];
    }
    // Sjekker om man har fått nok til bonus
    if (enTilSeksSum >= 63) {
        bonusEl.innerHTML = 50;
        sluttsum += 50;
    }

    enTilSeksSumEl.innerHTML = enTilSeksSum;
    poengsumEl.innerHTML = sluttsum;
    // Resetter verdiene
    paaBrett = ["dice0", "dice1", "dice2", "dice3", "dice4"];
    // Tar vekk alle terningene
    for (var i = 0; i < paaBrett.length; i++) {
        if (Valgt.children[0] != undefined) {
        Valgt.children[0].remove();
    }}
    for (var i = 0; i < paaBrett.length; i++) {
        if (uValgt.children[0] != undefined) {
        uValgt.children[0].remove();
    }}
    // Setter inn nye diver med funksjoner til terningene
    uValgt.innerHTML =  "<div id='dice0' onclick='javascript: fjernterning(0);'></div>" +
                        "<div id='dice1' onclick='javascript: fjernterning(1);'></div>" +
                        "<div id='dice2' onclick='javascript: fjernterning(2);''></div>" +
                        "<div id='dice3' onclick='javascript: fjernterning(3);'></div>" +
                        "<div id='dice4' onclick='javascript: fjernterning(4);''></div>";

    knapp1.style.backgroundColor = "#44c767";
    knapp1.style.border = "1px solid #18ab29";

    meldinger.innerHTML = "<b> <h4> Trykk kast for å starte </h4> </b> <br>";

    document.getElementById(kombinasjon).style.backgroundColor = "#ccffcc";
    // Deaktiverer funksjonene slik at de ikke kan bli brukt flere ganger
    if (kombinasjon == 'enere') { enereAktivert = false; enereEl.onclick = null;
    } else if (kombinasjon == 'toere') {toereAktivert = false; toereEl.onclick = null;
    } else if (kombinasjon == 'treere') {treereAktivert = false; treereEl.onclick = null;
    } else if (kombinasjon == 'firere') {firereAktivert = false; firereEl.onclick = null;
    } else if (kombinasjon == 'femmere') {femmereAktivert = false; femmereEl.onclick = null;
    } else if (kombinasjon == 'seksere') {seksereAktivert = false; seksereEl.onclick = null;
    } else if (kombinasjon == 'etPar') {etParAktivert = false; etParEl.onclick = null;
    } else if (kombinasjon == 'toPar') {toParAktivert = false; toPar.onclick = null;
    } else if (kombinasjon == 'treLike') {treLikeAktivert = false; treLikeEl.onclick = null;
    } else if (kombinasjon == 'fireLike') {fireLikeAktivert = false; fireLikeEl.onclick = null;
    } else if (kombinasjon == 'litenStraight') {litenStraightAktivert = false; litenStraightEl.onclick = null;
    } else if (kombinasjon == 'storStraight') {storStraightAktivert = false; storStraightEl.onclick = null;
    } else if (kombinasjon == 'hus') {husAktivert = false; husEl.onclick = null;
    } else if (kombinasjon == 'sjanse') {sjanseAktivert = false; sjanseEl.onclick = null;
    } else if (kombinasjon == 'tabellYatzy') {tabellYatzyAktivert = false; tabellYatzyEl.onclick = null;}
    
    // Setter de verdiene som ikke er valgt til 0
    if (enereAktivert == true) { enereEl.innerHTML = 0;
    } if (toereAktivert == true) { toereEl.innerHTML = 0;
    } if (treereAktivert == true) { treereEl.innerHTML = 0;
    } if (firereAktivert == true) { firereEl.innerHTML = 0;
    } if (femmereAktivert == true) { femmereEl.innerHTML = 0;
    } if (seksereAktivert == true) { seksereEl.innerHTML = 0;
    } if (etParAktivert == true) { etParEl.innerHTML = 0;
    } if (toParAktivert == true) { toParEl.innerHTML = 0;
    } if (treLikeAktivert == true) { treLikeEl.innerHTML = 0;
    } if (fireLikeAktivert == true) { fireLikeEl.innerHTML = 0;
    } if (litenStraightAktivert == true) { litenStraightEl.innerHTML = 0;
    } if (storStraightAktivert == true) { storStraightEl.innerHTML = 0;
    } if (husAktivert == true) { husEl.innerHTML = 0;
    } if (sjanseAktivert == true) { sjanseEl.innerHTML = 0;
    } if (tabellYatzyAktivert == true) { tabellYatzyEl.innerHTML = 0;
    }
    
    // Avslutter spillet
    if (antallRunder < 14) {
        antallKast = 0;
        aktivert = true;
    } else {
        alert("Du fikk: "+sluttsum+" av 374 mulige poeng!");
        knapp1.style.backgroundColor = "yellow";
        knapp1.style.border = "1px solid yellow";
        knapp1.style.color = "#000000";
        meldinger.innerHTML =   "<b> <h4> Refresh siden for å starte på nytt. <a href='javascript: location.reload(true)'>Trykk her for å refreshe</a> </h4> </b> <br>";
    }
    antallRunder++;
    valgteTerninger = [];
    terningKombi = [];
}}