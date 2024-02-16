const bcrypt = require('bcrypt');
const pool = require('./db');
const jwt=require('jsonwebtoken');

const createUser = async (name, email, password) => {
    try {
      const { rows } = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [
        name,
        email,
        password,
      ]);
  
      const newUser = rows[0]; // Assuming the first row contains the new user data
  
      if (!newUser) {
        throw new Error('Failed to create user');
      }
  
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'TIME');
  
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  };

const getUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  //console.log(rows[0].password + "test");
  return rows[0];
};
const getUserById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    //console.log(rows[0].password + "test");
    return rows[0];
  };
  

  
  const login = async (email, password) => {
    const user = await getUserByEmail(email);
  //console.log(user);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, 'TIME');

    return { ...user, token };
    
  };
module.exports = { createUser, getUserByEmail,login,getUserById};
