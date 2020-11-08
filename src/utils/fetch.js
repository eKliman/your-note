const baseURL = 'https://your-note-5aadc.firebaseio.com/' 

export const sendRequest = async (method, url, data = null, useBaseURL = true, token = '') => {
  const headers = { 'Content-Type': 'application/json' } 
  const requestURL = useBaseURL ? baseURL + url : url 

  if (method === 'POST' || method === 'PUT') {
    try {
      const response = await fetch(requestURL + (token ? `?auth=${token}` : ''), {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      }) 
      return response.json() 
    } catch(err) {
      console.log(err.message) 
    }
  } else {
    try {
      const response = await fetch(requestURL, {
        method: method,
        headers: headers,
      }) 
      return response.json() 
    } catch(e) {
      console.log(e.message) 
    }
  }
} 

export const deleteNote = (userId, noteId, token) => {
  return fetch(
    `${baseURL}notes/${userId}/${noteId}.json?auth=${token}`,
    {
      method: 'DELETE',
    }
  );
}
