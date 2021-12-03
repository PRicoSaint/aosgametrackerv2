// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const createGame = (gameData, token) => {
  return fetch('/api/users/games', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gameData),
  });
};

// addRound
export const addRound = (gameId, roundData, token) => {
  console.log("this is line 45: ",gameId, roundData);
  let newRoundData = {...roundData};
  if (roundData.btcomplete == 'on'){
    newRoundData.btcomplete = true;
  }else if(roundData.btcomplete == ''){
    newRoundData.btcomplete = false;
  }
  return fetch(`/api/users/games/${gameId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newRoundData),
  });
};

export const getGame = (gameId) => {
  return fetch(`/api/users/games/${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllGames = () => {
  return fetch(`/api/users/alldata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUserGames = (token) => {
  return fetch('/api/users/me/games', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};


// // remove saved book data for a logged in user
// export const deleteBook = (bookId, token) => {
//   return fetch(`/api/users/books/${bookId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// // make a search to google books api
// // https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };
