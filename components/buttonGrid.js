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
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {
                data.map( site => (
                    <div onClick={handleClick} className="flex justify-center mx-2 md:mx-0 bg-gray-200 rounded-lg p-4 cursor-pointer text-xl text-gray-700 hover:underline" key={site.key}>{site.name}</div>
                ))
            }
            </section>
        </>
    )
}