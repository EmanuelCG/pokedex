import { IconSearch } from "@tabler/icons-react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import PokemonList from "./PokemonList"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"
const Pokemons = () => {

    const INITIAL_LIMIT = 40
    const INCREASE_LIMIT = 20
    const [allPokemons, setAllPokemons] = useState()
    const [pokemonName, setPokemonName] = useState("")
    const [limit, setLimit] = useState(INITIAL_LIMIT)
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })
    const pokemonsByName = allPokemons?.filter((pokemon) => pokemon.name.includes(pokemonName))
    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value.toLowerCase());

    }

    const handleChangePokemonName = (e) => {
        setPokemonName(e.target.value.toLowerCase())
    }

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then(({ data }) => setAllPokemons(data.results))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        const maxPokemons = pokemonsByName?.length
        if (isIntersecting && maxPokemons !== 0) {
            const newLimit = limit + INCREASE_LIMIT
            newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit)
        }
    }, [isIntersecting]);

    useEffect(() => {
        if (pokemonName === "") {
            setLimit(INITIAL_LIMIT);
        }
    }, [pokemonName]);

    return (
        <section className="bg-[#F6F8FC] p-4 py-5">
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-4 flex rounded-lg text-lg">
                    <input type="text" placeholder="Search your Pokemon" className="flex-1 outline-none" name="pokemonName" autoComplete="off" onChange={handleChangePokemonName} />
                    <button className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors">
                        <IconSearch color="white" stroke={3} />
                    </button>
                </div>
            </form>
            <PokemonList pokemons={pokemonsByName?.slice(0, limit)} />
            {/* Target Observer */}
            <span ref={ref}></span>
        </section>
    )
}

export default Pokemons