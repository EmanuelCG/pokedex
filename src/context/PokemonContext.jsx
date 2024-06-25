import { createContext, useState } from "react";
import { formatAbilities, formatStats, formatTypes, getEvolutions, getImageByPokemon, getPokemonDescription } from "../components/helpers/pokemon";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [showDetailPokemon, setshowDetailPokemon] = useState(false)
    const [pokemonDetail, setPokemonDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const showPokemon = async (pokemonInfo) => {
        setIsLoading(true)
        const { data: dataSpecies } = await axios.get(pokemonInfo.species.url)
        const { data: dataEvolution } = await axios.get(dataSpecies.evolution_chain.url)
        const { id, name, height, weight, stats, types, abilities } = pokemonInfo

        const evolutions = await getEvolutions(dataEvolution)
        setPokemonDetail({
            id,
            name,
            height,
            weight,
            stats: formatStats(stats),
            types: formatTypes(types),
            abilities: formatAbilities(abilities),
            description: getPokemonDescription(dataSpecies),
            evolutions: evolutions,
            image: getImageByPokemon(pokemonInfo.sprites)

        });
        setshowDetailPokemon(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }
    const closePokemonDetail = () => {
        setshowDetailPokemon(false)
    }
    return <PokemonContext.Provider value={{ showDetailPokemon, showPokemon, closePokemonDetail, pokemonDetail, isLoading }}>
        {children}
    </PokemonContext.Provider>
}

export { PokemonContext, PokemonProvider }