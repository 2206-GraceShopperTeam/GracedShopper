import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function login(email, password) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  const response = await fetch(`${BASE}/users/login`, request);
  const result = await response.json();
  const token = result.token;
  return token;
}



export async function register(event) {
  const registerUsername = event.target[0].value;
  const registerPassword = event.target[1].value;
  const registerName     = event.target[2].value;
  const registerAddress  = event.target[3].value;

  const response = await fetch(`${BASE}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: registerEmail,
      password: registerPassword,
      name : registerName,
      address: registerAddress
    }),
  });
  const result = await response.json();
  const token = result.token;

  localStorage.setItem("token", token);
}
