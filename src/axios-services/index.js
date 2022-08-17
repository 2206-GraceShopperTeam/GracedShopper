// Users
export async function register(email, password, name, address) {
  const response = await fetch(`http://localhost:4000/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      address: address,
    }),
  });
  const result = await response.json();
  const token = result.token;
  localStorage.setItem("token", token);
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
  const token = result.token;
  return token;
}

// Products
export async function createProduct() {}

export async function getProducts() {
  try {
    const response = await fetch(`http://localhost:4000/api/products`);
    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function editProduct() {}

export async function deleteProduct() {}

// Cart Products
export async function addToCartProducts(cart_id, product_id, quantity) {
  const response = await fetch(
    `http://localhost:4000/api/cartProducts/${cart_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product_id,
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
export async function createCart() {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/createCart`);
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

