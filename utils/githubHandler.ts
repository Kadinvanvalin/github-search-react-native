export function fetchGitHubAPI(url) {
  const base = 'https://api.github.com'
  return fetch(`${base}${url}`, {
    method:"GET",
    headers: {
      // TODO: unauthenticated github requests limits at 60 requests an hour, add auth
      'Content-Type': 'application/json'
      },
  })
  .then((response) => {
    console.log(response)
    if (!response.ok) { throw response.json() }
    return response.json()
  })
  .catch((response) => {
    console.error(response.message)
  })
}