import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
addEventListener('DOMContentLoaded', getPosts);

// Get form Data
document.querySelector(".post-submit").addEventListener('click', submitData);


function getPosts(){
  http.get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitData(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  http.post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}


