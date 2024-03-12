export  function requestGroup(setLoading, setData)
{
    setLoading(true)
    return  setTimeout(() =>{
        return fetch('https://raw.githubusercontent.com/3all/vkTest/master/groups.json')
            .then(response  => {
                if (response.ok)
                    return response.json()
                else
                    console.log(response.status, response.links)
            })
            .then((data) => {
                    setData(data)
                }).finally(() => setLoading(false))
    }, 100)
}

export function requestGetIdeas(setData, setLoading, getURL)
{
    setLoading(true)
    fetch(getURL)
    .then(response  => {
        console.log(response)
            if (response.ok)
                return response.json()
            else
                console.error(response.status, response.links)
        })
        .then((data) => {
            if (data.result === 1 && data.data && data.data.length > 0)
                setData(data.data)
            else
                console.error("Bad response")})
        .finally(() => setLoading(false))
}