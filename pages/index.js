import Head from 'next/head'
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client'
import Header from "../components/header"
import ButtonGrid from "../components/buttonGrid"

export default function Home() {
  const [ message, setMessage ] = useState();
  const [ session, loading ] = useSession();

  return (
    <>
      <Head>
        <title>QA Automation Dashboard</title>
      </Head>
      <Header session={session} signIn={signIn}/>
      {session && <ButtonGrid message={message} setMessage={setMessage}/>}
    </>
  )
}
