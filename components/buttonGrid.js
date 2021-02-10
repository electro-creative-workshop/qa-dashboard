import data from "../data/config.json"

export default function ButtonGrid({message,setMessage}){
    const handleClick = (e) => {
        const siteName = e.target.innerHTML;
        const siteData = data.find(site => site.name === siteName);

        const qs = Object.keys(siteData.parameters)
            .map(key => `${key}=${siteData.parameters[key]}`)
            .join('&');

        fetch(`/.netlify/functions/triggerTest?${qs}`)
            .then(response => response.json())
            .then(json => {
                console.log("return val:",json)
            })

        setMessage(`Test workflow started for ${siteName}`);
    }

    return(
        <>
            <section className="flex justify-center p-4 text-sm text-red-500">{message}</section>
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
            {
                data.map( site => (
                    <div key={site.name} className="inline-grid grid-cols-2 gap-x-4">
                        <div className="justify-start text-xl">{site.name}:</div> <span className="justify-end"><button className="m-auto bg-gray-200 rounded-lg p-2 cursor-not-allowed text-gray-400 ">QA</button> <button onClick={handleClick} className="m-auto bg-gray-200 rounded-lg p-2 cursor-pointer text-gray-700 hover:underline">Prod</button></span>
                    </div>
                ))
            }
            </section>
        </>
    )
}