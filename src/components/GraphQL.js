import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const GraphQL = () => {
    //set up stateful vars
    const [aulas, setAulas] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [fullList, setFullList] = useState([])

    //perform a search
    const performSearch = () => {
        const payload = `
        {
            search(nameContains: "${searchTerm}"){
                id
                name
                size
                review
            }
        }`;

        const headers = new Headers();
        headers.append("Content-Type", "application/graphql")

        const requestOptions = {
            method:"POST",
            headers:headers,
            body: payload,

        }

        fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let list = Object.values(response.data.search)
                setAulas(list)
            })
            .catch(err => {console.log(err)})
            
    }

    const handleChange = (e) => {
        e.preventDefault()

        let value = e.target.value
        setSearchTerm(value)

        if (value.length > 2 ) {
            performSearch()
        } else {
            setAulas(fullList);
        }

    }

    // useEffect
    useEffect(() => {
        const payload = `
        {
            list {
                id
                name
                active
                size
                review
            }
        }`;

        const headers = new Headers()
        headers.append("Content-Type", "application/graphql")

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
            
            .then((response) => response.json())
            .then((response) => {
                //const decodedResponse = atob(response);
                //const parsedResponse = JSON.parse(decodedResponse)
                
                let list = Object.values(response.data.list)
                console.log(response)
                setAulas(list)
                setFullList(list)
            })
            .catch(err => { console.log(err) })

    }, [])

    return (
        <div>
            <h2>GraphQL</h2>
            <hr />

            <form onSubmit={handleChange}>
                <input
                    type="search"
                    placeholder="Nome da aula"
                    className="border border-gray-300 rounded-l-md px-4 py-2"
                    value={searchTerm}
                    onChange={handleChange}
                    
                />
            </form>
            {aulas ? (
            <table className="min-w-full bg-white border border-gray-300 border-separate border-spacing-2 animate-fade-in delay-200">
                <thead>
                    <tr>
                        <th>Nome da Aula</th>
                        <th>Matérias</th>
                        <th>Etapas</th>
                        <th>Aula Ativa</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((a)=>(
                        <tr key={a.id}>
                            <td>
                                <Link to={`/home/movies/${a.id}`}>
                                    {a.name}
                                </Link>
                            </td>
                            <td>{""}</td>
                            <td>{a.size}</td>
                            <td>{a.active}</td>
                            <td>{a.review}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p> No movies </p>
        )}
        </div>

        
    )


}


export default GraphQL