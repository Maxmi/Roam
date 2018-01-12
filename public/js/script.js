document.addEventListener('DOMContentLoaded', function() {

  // update user profile
  const updateUser = (userID, name, current_city) => {
    return fetch(`/users/${userID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, current_city})
    });
  };


  const editBtn = document.getElementById('editProfile');

  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').textContent;
    const city = document.getElementById('city').textContent;
    const userID = document.getElementById('id').textContent;
    updateUser(userID, name, city)
      .then(res => res.json());
  });



  // delete user's post
  const deletePost = postID => {
    return fetch(`/posts/${postID}`, {
      method: 'DELETE'
    });
  };

  const postsWrapper = document.getElementById('userPosts');

  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete')) {
      const postCard = event.target.closest('.postCard');
      const postID = postCard.getAttribute('data-id');

      deletePost(postID)
        .then(() => {
          postsWrapper.removeChild(postCard);
        })
        .catch(err  => {
          console.error;
        });
    }
  });


  //update user's post

  //making it editable
  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit')) {
      const postCard = event.target.closest('.postCard');
      const post = postCard.children[3];
      post.setAttribute('contenteditable', 'true');
      post.focus();
    }
  });


  const updatePost = (postID, content) => {
    return fetch(`/posts/${postID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content})
    });
  };

  //saving updated info
  const posts = document.querySelectorAll('.content');
  posts.forEach(post => {
    post.addEventListener('blur', (event) => {
      const postID = event.target.getAttribute('data-id');
      const content = event.target.closest('.content').textContent;
      updatePost(postID, content)
        .then(res => {
          res.json();
        });
    });
  });

}); //most outer function
