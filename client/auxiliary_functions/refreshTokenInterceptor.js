export const refreshTokenInterceptor = (current, refresh, options, type) => {

    return fetch(refresh, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(result => {
            localStorage.setItem('accessToken', result.newTokens.accessToken)
            options.headers.Authorization = `Bearer ${result.newTokens.accessToken}`
            return fetch(current, options)
                .then(response => {
                    if (type === 'status') return response.status
                    else return response.json()
                })
                .catch(error => console.log(error))
        })
}