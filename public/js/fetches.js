
const addPost = post => {
  return fetch('/posts', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: 'JSON.stringify({post})'
  })
    .then(res => {
      return res.json();
    });
};


const updatePost = postID => {
  return fetch(`/posts/${postID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'html'
    }
  })
    .then(res => {
      return res;
    });
};


const deletePost = postID => {
  return fetch(`/posts/${postID}`, {
    method: 'delete'
  });
};


const updateUser = userID => {
  return fetch(`/users/${postID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'html'
    }
  })
    .then(res => {
      return res;
    });
};
