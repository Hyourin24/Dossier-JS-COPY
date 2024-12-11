// ID de l'utilisateur spécifique
const userId = 1; // Change l'ID pour tester avec un autre utilisateur

fetch("https://jsonplaceholder.typicode.com/posts?")
  .then((response) => response.json())
  .then((posts) => {
    // Filtrer les posts
    const userPosts = posts.filter((post) => post.userId === userId);

    // Sélectionner le conteneur
    const container = document.querySelector(".userSection2");

    // Ajouter les posts au conteneur
    userPosts.forEach((post) => {
      const postDiv = document.createElement("div"); // Conteneur pour un post
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr>
      `;
      container.appendChild(postDiv); // Ajouter le post au conteneur principal
    });
  });
