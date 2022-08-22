// Users
export async function register(regEmail,regPassword,name,address) {
  const response = await fetch(`http://localhost:4000/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: regEmail,
      password: regPassword,
      name: name,
      address: address,
      admin: false,
    }),
  });
  const result = await response.json();
  const token = result.token;
  localStorage.setItem("token", token);
  return result
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
  const response = await fetch(
    `http://localhost:4000/api/users/login`,
    request
  );
  const result = await response.json();
  // const token = result.token;
  return result;
}

export async function getAllUsers() {
  try {
    const response = await fetch(`http://localhost:4000/api/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    throw error;
  }
}

export async function editUserInfo(userId, name,email,address) {
  const response = await fetch(
    `http://localhost:4000/api/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        address: address,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function whoAmI(token) {
  try {
    const response = await fetch(`http://localhost:4000/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// Products
export async function createProduct(
  token,
  nameProduct,
  description,
  price,
  category
) {
  const response = await fetch(`http://localhost:4000/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameProduct,
      description: description,
      price: price,
      category: category,
    }),
  });
  const result = await response.json();
  return result;
}

export async function getProducts() {
  const response = await fetch(`http://localhost:4000/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function getProductById(productId) {
  const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function editProduct(
  productId,
  token,
  nameProduct,
  description,
  price,
  category
) {
  const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameProduct,
      description: description,
      price: price,
      category: category,
    }),
  });
  const result = await response.json();
  return result;
}

export async function deleteProduct(productId) {
  const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

// Cart Products
export async function addToCartProducts( cartId, product_id, quantity) {
  const response = await fetch(
    `http://localhost:4000/api/cartProducts/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function getCartProducts() {
  const response = await fetch(`http://localhost:4000/api/cartProducts/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
export async function getCartProductsById(id) {
  const response = await fetch(`http://localhost:4000/api/cartProducts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function editCartProduct(cartProductId, quantity) {
  const response = await fetch(
    `http://localhost:4000/api/cartProducts/${cartProductId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function removeCartProduct(cartProductId) {
  const response = await fetch(
    `http://localhost:4000/api/cartProducts/${cartProductId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}

// Cart
export async function createCart(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/createCart`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
    }),
  })
    const cart = await response.json();
    return cart;
  } catch (error) {
    throw error;
  }
}

export async function getCartById(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/${id}`)
    const cart = await response.json();
    return cart;
  } catch (error) {
    throw error;
  }
}

export async function emptyCart(cartId){
  try {
    const response = await fetch(`http://localhost:4000/api/cart/emptyCart/${cartId}`)
    const emptied = await response.json();
    return emptied
  } catch (error) {
    next(error)
  }
}



