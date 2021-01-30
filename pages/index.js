import Head from 'next/head'
import data from "../data/config.json"

export default function Home() {

  // const handleClick = api => e => {
  //   e.preventDefault()

  //   this.setState({ loading: true })
  //   fetch("/.netlify/functions/" + api)
  //     .then(response => response.json())
  //     .then(json => this.setState({ loading: false, msg: json.msg }))
  // }

  const handleClick = (e) => {
    console.log('handleClick: ', e.target.innerHTML);
       fetch("/.netlify/functions/triggerTest")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  return (
    <>
      <Head>
        <title>QA Automation Dashboard</title>
      </Head>
      <header  className="flex justify-center">
        <h1>QA Automation Dashboard</h1>
      </header>
      <section className="grid grid-cols-3 gap-4">
        {
            data.map( site => (
                <button onClick={handleClick} className="rounded-lg" key={site.key}>{site.name}</button>
            ))
        }
      </section>
    </>
  )
}
