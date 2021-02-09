export default function Header({session, signIn}){
    return(
        <header className="bg-gray-200">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 p-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-500">QA Automation Dashboard</h1>
            </div>
            <div className="flex md:justify-end">
                {session
                    ? <a href="https://app.circleci.com/pipelines/github/electro-creative-workshop/qa-automation-selenide" target="_blank" className="hover:underline my-auto text-blue-600">Pipelines</a>
                    : <button onClick={() => signIn()} className="hover:underline my-auto text-blue-600">Sign in</button>
                }
              
            </div>
          </div>
        </header>
    )
}