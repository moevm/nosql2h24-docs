///////////    DB METHODS   ////////////

// get
export const fetchTableData = async (field, orderBy, search) => {
  const response = await fetch(
    `${process.env.VUE_APP_BASE_URL}/db/get-info-code-table?field=${field}&orderBy=${orderBy}&search=${search}`,
    {
      credentials: 'include',
    },
  );
  const data = await response.json();

  return data;
};

export const fetchInfoCodeVariants = async (field, orderBy, search) => {
  const response = await fetch(
    `${process.env.VUE_APP_BASE_URL}/db/get-info-code-variants?field=${field}&orderBy=${orderBy}&search=${search}`,
    {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    },
  );
  const data = await response.json();
  return data;
};

export const fetchSchemaVariants = async (field, orderBy, search) => {
  const response = await fetch(
    `${process.env.VUE_APP_BASE_URL}/db/get-schema-variants?field=${field}&orderBy=${orderBy}&search=${search}`,
    {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    },
  );
  const data = await response.json();
  return data;
};

// create
export const fetchPostCreateTable = async (value) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/db/create-info-code-table-entry`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(value),
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostCreateInfocode = async (value) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/db/create-info-code-variant`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(value),
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostCreateSchema = async (value) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/db/create-schema-variant`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(value),
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// delete
export const fetchDeleteTable = async (id) => {
  try {
    await fetch(
      `${process.env.VUE_APP_BASE_URL}/db/delete-info-code-table-entry`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ id: id }),
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteInfocode = async (id) => {
  try {
    await fetch(`${process.env.VUE_APP_BASE_URL}/db/delete-info-code-variant`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify({ id: id }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteSchema = async (id) => {
  try {
    await fetch(`${process.env.VUE_APP_BASE_URL}/db/delete-schema-variant`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify({ id: id }),
    });
  } catch (error) {
    console.log(error);
  }
};

// change
export const fetchPostChangeTable = async (value) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/db/change-info-code-table-entry`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(value),
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostChangeInfocode = async (value) => {
  try {
    await fetch(`${process.env.VUE_APP_BASE_URL}/db/change-info-code-variant`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify(value),
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostChangeSchema = async (value) => {
  try {
    await fetch(`${process.env.VUE_APP_BASE_URL}/db/change-schema-variant`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify(value),
    });
  } catch (error) {
    console.log(error);
  }
};

///////////    USER METHODS   ////////////

export const fetchPostAuthorization = async (login, password) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/authorization/enter`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostSignup = async (login, password) => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/authorization/signup`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({
          login: login,
          password: password,
        }),
      },
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchCheckAuth = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/authorization/check`,
      {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogout = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/authorization/logout`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRefreshToken = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/authorization/refresh`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
