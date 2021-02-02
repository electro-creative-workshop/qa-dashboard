import Head from 'next/head'
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'
import data from "../data/config.json"

export default function Home() {
  const [message, setMessage] = useState();
  const [ session, loading ] = useSession();

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


  if (session){
    return (
      <>
        <Head>
          <title>QA Automation Dashboard</title>
        </Head>
        <header className="bg-gray-200">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 p-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-500">QA Automation Dashboard</h1>
            </div>
            <div className="flex md:justify-end">
              <a href="https://app.circleci.com/pipelines/github/electro-creative-workshop/qa-automation-selenide" target="_blank" className="hover:underline my-auto text-blue-600">Pipelines</a>
            </div>
          </div>
        </header>
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
  } else {
    return (
      <button onClick={() => signIn()}>Sign in</button>
    )
  }
  
}
