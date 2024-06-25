const Evolutions = ({ evolutions }) => {
    return (
        <div className="flex justify-center items-center gap-2 flex-wrap">
            {evolutions.map((evolution, index) =>
            (
                <article className="flex gap-2 items-center" key={evolution.name}>
                    {index !== 0 && (
                        <div className="bg-slate-100 p-2 rounded-full text-sm font-bold">
                            <span>Lv. {evolution.min_level}</span>
                        </div>
                    )}

                    <button className="hover:bg-slate-100 transition-colors rounded-3xl">
                        <img src={evolution.image} alt="" />
                    </button>
                </article>
            ))}
        </div>

    )
}
export default Evolutions