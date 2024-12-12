async function AfficherArticles() {
  try {
    // Récupérer les articles via l'API
    let responseArticles = await fetch("https://jsonplaceholder.typicode.com/posts");
    let articles = await responseArticles.json();

    // Récupérer l'ID de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem("selectedPostName");

    // Filtrer les posts correspondant à cet utilisateur
    const userPosts = articles.filter(post => post.userId == userId);

    // Sélectionner le conteneur principal
    const container = document.querySelector(".userSection2");

    // Ajouter les posts au conteneur
    userPosts.forEach(post => {
      let postDiv = document.createElement("div"); 
      postDiv.classList.add("postDiv");

      let postsTitre = document.createElement("h3");
      postsTitre.classList.add("postTitre");
      postsTitre.textContent = `Titre: ${post.title}`;

      let postBody = document.createElement("p");
      postBody.classList.add("postBody");
      postBody.textContent = `Contenu: ${post.body}`;

      postDiv.appendChild(postsTitre);
      postDiv.appendChild(postBody);

      container.appendChild(postDiv); 

      //Ajout de lien vers la page 3
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
  }
}

// Appeler la fonction
AfficherArticles();