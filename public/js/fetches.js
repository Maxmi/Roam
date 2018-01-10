const fetches = {

  addPost: (title, content, userID, cityID) => {
    return fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: 'JSON.stringify({title, content, userID, cityID})'
    })
      .then(res => {
        return res.json();
      });
  },


  updatePost: postID => {
    return fetch(`/posts/${postID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'html'
      }
    })
      .then(res => {
        return res;
      });
  },


  deletePost: postID => {
    return fetch(`/posts/${postID}`, {
      method: 'delete'
    });
  },


  updateUser: (userID, name, city) => {
    return fetch(`/users/${userID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'html'
      }
    })
      .then(res => {
        return res;
      });
  }

};
