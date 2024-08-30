import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_SPECIES } from '../utils/queries'

export const Test = () => {
    const { loading, data, error } = useQuery(QUERY_ALL_SPECIES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const species = data?.species || []

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Species List</h1>
            <div>
                {species.map((species) => (
                    <div key={species.id} className="mb-4 p-4 border rounded">
                        <h3 className="text-xl font-semibold">{species.name}</h3>
                        <p><strong>Homeworld:</strong> {species.homeworld}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Test