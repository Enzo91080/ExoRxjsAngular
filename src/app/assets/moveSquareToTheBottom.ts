export function moveSquareToTheBottom() {
  let id: any = null;
  // Variable permettant de récupérer par l'id le carré rouge
  const elem = document.getElementById('animate');
  // On définit une position à 0.
  let pos = 0;
  //  permet d'annuler une action répétée minutée initiée via un appel à setInterval()
  clearInterval(id);
  // Méthode avec deux arguments(1: la fonction, 2: Le temps, en millisecondes )
  id = setInterval(frame, 1000);
  // Affichage de debug
  console.log(id);
  // Fonction permettant de faire savoir à l'utilisateur lorsqu'il à perdu
  function frame() {
    if (pos > 12) {
      clearInterval(id);
      alert('you loose');
    } else {
      pos++;
      // Permet
      elem!.style.marginTop = pos * 50 + 'px';
    }
  }
}
