// ID de l'utilisateur spécifique
const userId = 1; // Change l'ID pour tester avec un autre utilisateur

fetch("https://jsonplaceholder.typicode.com/posts?")
  .then((response) => response.json())
  .then((posts) => {
    // Filtrer les posts
    const userPosts = posts.filter((post) => post.userId === userId);

    // Sélectionner le conteneur
    const container = document.getElementById("thePosts");

    // Ajouter les posts au conteneur
    userPosts.forEach((post) => {
      let postDiv = document.createElement("div"); // Conteneur pour un post
      let postsTitle = document.createElement("h3");
      let userIdPosts = document.createElement("p");

      postsTitle.textContent = post.title;
      userIdPosts.textContent = post.body;

      postDiv.appendChild(postsTitle);
      postDiv.appendChild(userIdPosts);

      let body = document.querySelector("body");
      body.appendChild(postDiv);

      container.appendChild(postDiv); // Ajouter le post au conteneur principal
    });
  });
