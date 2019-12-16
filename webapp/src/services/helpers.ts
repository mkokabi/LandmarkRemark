export function handleResponse(response: any) {  
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true);
        alert("401 Error");
      }
      const error = (data && data.Message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}