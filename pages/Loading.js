import useSWRInfinite from 'swr/infinite'

const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `http://localhost:8000/posts?_page=${pageIndex}&_limit=5`                    // SWR key
  }
  const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function Loading () {
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
    if (!data) return 'loading'
  
    // We can now calculate the number of all users
    let totalUsers = 0
    for (let i = 0; i < data.length; i++) {
      totalUsers += data[i].length
    }
  
    return <div>
      <p>{totalUsers} users listed</p>
      {data.map((users, index) => {
        // `data` is an array of each page's API response.
        return users.map(user => <div key={user.id}>{user.Name}</div>)
      })}
        <button onClick={() => setSize(size - 1)}>perious</button>
      <button onClick={() => setSize(size + 1)}>next</button>
    </div>
  }
  