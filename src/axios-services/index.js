

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
  const response = await fetch(`http://localhost:4000/api/users/login`, request);
  const result = await response.json();
  const token = result.token;
  return token;
}



export async function register(email, password, name, address) {
  // const registerEmail = event.target[0].value;
  // const registerPassword = event.target[1].value;
  // const registerName     = event.target[2].value;
  // const registerAddress  = event.target[3].value;

  const response = await fetch(`http://localhost:4000/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name : name,
      address: address
    }),
  });
  const result = await response.json();
  const token = result.token;

  localStorage.setItem("token", token);
}


export async function getProducts() {
  try {
    const response = await fetch(`http://localhost:4000/api/products`);
    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
}