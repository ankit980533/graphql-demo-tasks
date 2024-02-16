const pool = require('./db');
const createPost = async (title, content, userId) => {
   // console.log("tsst"+userId);
  const { rows } = await pool.query('INSERT INTO posts(title, content, user_id) VALUES($1, $2, $3) RETURNING *', [
    title,
    content,
    userId,
  ]);
  return rows[0];
};

const getPostByUserId= async (UserId) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE user_id = $1', [UserId]);
  console.log(rows);
  return rows;
};
const getAllPost=async()=>{
    const{ rows}=await pool.query('select *FROM posts');
    return rows;
}

const getPostUserWise = async () => {
    const { rows } = await pool.query(
      'SELECT posts.*, users.id as user_id, users.name as user_name, users.email as user_email FROM posts INNER JOIN users ON posts.user_id = users.id'
    );
  
    console.log(rows[0]+"c hii");
    const postsByUser = {};
    rows.forEach((post) => {
      const { user_id, user_name, user_email, ...posts } = post;
  
      if (!postsByUser[user_id]) {
        postsByUser[user_id] = {
          user_id,
          user_name,
          user_email,
          posts: [],
        };
      }
  
      postsByUser[user_id].posts.push(posts);

    });
  
  
    const result = Object.values(postsByUser);
    // const result = await pool.query(`
    // SELECT users.email, JSON_AGG(posts.*) AS user_posts
    // FROM users
    // LEFT JOIN posts ON users.id = posts.user_id
    // GROUP BY users.id;
    // `
    //   );
    //   console.log(result.rows);
    //   console.log("heherl");

    // const postsByUser = result.rows.map((user) => ({
      
    //   [user.email]: user.user_posts,
    // }));
    console.log(postsByUser);
  
    return result;
  };
  
const editPostById = async (postId, title, content, userId) => {
  const { rows } = await pool.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [title, content, postId, userId]
  );
  return rows[0];
};
const getPostById=async(id)=>{
  const{rows}=await pool.query('select * from posts where id=$1',[id]);
  return rows[0];
}

const deletePostById = async (postId, userId) => {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *', [postId, userId]);
  return rows[0];
};

module.exports = { createPost, getPostByUserId, editPostById, deletePostById,getAllPost ,getPostUserWise,getPostById};
