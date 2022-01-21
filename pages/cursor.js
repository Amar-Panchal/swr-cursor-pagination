import useSWRInfinite from 'swr/infinite'

const getKey = (pageIndex, previousPageData) => {
  console.log("getkey pageIndex value",pageIndex)

    if (previousPageData && !previousPageData.data) return null
    //if (pageIndex === 0) return `http://localhost:8000/posts?_limit=5`
    
   // return `http://localhost:8000/posts?_page=${previousPageData.nextCursor}&_limit=5`
   return `http://localhost:8000/posts?_page=4&_limit=5`
  }
  const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function Cursor () {

    const { data ,size, setSize} = useSWRInfinite(getKey, fetcher)
    if (!data) return 'loading'
  
    
    console.log(data)
    return <div>
     <table className="table  table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {data.map((items) => {
        return items.map(item =>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.Name}</td>
            <td>{item.email}</td>
          </tr>
          )
      })}
    </tbody>
    </table>

    <button onClick={() => setSize(size - 1)}>Previous</button>
    <button onClick={() => setSize(size + 1)}>Next</button>
    </div>
  }
  