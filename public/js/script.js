document.addEventListener('DOMContentLoaded', function() {

  // update user profile
  const updateUser = (userID, newName, newCity) => {
    return fetch(`/users/${userID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newName, newCity})
    });
  };


  const editBtn = document.getElementById('editProfile');
  const name = document.getElementById('name');
  const city = document.getElementById('city');

  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if(editBtn.textContent === 'Edit Profile') {
      //making name and city editable
      name.setAttribute('contenteditable', 'true');
      city.setAttribute('contenteditable', 'true');
      name.classList.add('change');
      name.focus();
      city.classList.add('change');
      editBtn.textContent = 'Save';
    } else {
      //saving updated info
      const newName = name.textContent;
      const newCity = city.textContent;
      const userID = document.getElementById('id').textContent;
      updateUser(userID, newName, newCity)
        .then(
          res => res.json()
        );
      name.removeAttribute('contenteditable');
      city.removeAttribute('contenteditable');
      name.classList.remove('change');
      city.classList.remove('change');
      editBtn.textContent = 'Update Profile';
    }
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
        .catch(console.error);
    }
  });


  //update user's post
  const updatePost = (postID, content) => {
    return fetch(`/posts/${postID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content})
    });
  };

  //making it editable
  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit')) {
      const postCard = event.target.closest('.postCard');
      const post = postCard.children[3];
      post.setAttribute('contenteditable', 'true');
      post.focus();
    }
  });

  //saving updated info
  const posts = document.querySelectorAll('.content');
  posts.forEach(post => {
    post.addEventListener('blur', (event) => {
      const postCard = event.target.closest('.postCard');
      const postID = postCard.getAttribute('data-id');
      const content = event.target.closest('.content').textContent;
      updatePost(postID, content)
        .then(res => {
          res.json();
        })
        .catch(console.error);
    });
  });

}); //most outer function
