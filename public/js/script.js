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

  const profile = document.getElementById('userInfo');
  const editBtn = document.getElementById('editProfile');
  const name = document.getElementById('name');
  const nameWrapper = document.getElementsByName('name')[0];
  const city = document.getElementById('city');
  const cityWrapper = document.getElementsByName('city')[0];

  editBtn.addEventListener('click', (event) => {
    // const editBtn = event.target;
    event.preventDefault();
    if(editBtn.textContent === 'Edit Profile') {
      //making name and city editable
      name.setAttribute('contenteditable', 'true');
      city.setAttribute('contenteditable', 'true');
      nameWrapper.classList.add('change');
      name.focus();
      cityWrapper.classList.add('change');
      editBtn.textContent = 'Save';
    } else {
      //saving updated info
      const newName = name.textContent;
      const newCity = city.textContent;
      const userID = profile.getAttribute('data-id');

      updateUser(userID, newName, newCity)
        .then(
          res => res.json()
        );
      name.removeAttribute('contenteditable');
      city.removeAttribute('contenteditable');
      nameWrapper.classList.remove('change');
      cityWrapper.classList.remove('change');
      editBtn.textContent = 'Edit Profile';
    }
  });


  // delete user's post
  const deletePost = postID => {
    return fetch(`/posts/${postID}`, {
      method: 'DELETE'
    });
  };

  const confirm = new CustomConfirm();

  const postsWrapper = document.getElementById('userPosts');

  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete')) {
      const postCard = event.target.closest('.postCard');
      const postID = postCard.getAttribute('data-id');
      const handler = () => {
        deletePost(postID)
          .then(() => {
            postsWrapper.removeChild(postCard);
          })
          .catch(console.error);
      }
      confirm.render('Are you sure you want to delete this post?', handler);
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
