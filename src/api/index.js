import Config from './config'

const Api = {

  getProjects (params) {
    const requestURL = Config.API_URL + '/projects'
    const req = {
      method: 'get',
      url: requestURL,
      params
    }

    return fetch(req.url, req).then((response) => {
      return response.json()
    })
  }
}
export default Api
