import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routing } from "./components/rootRoute";

function App() {
    const [count, setCount] = useState(0);
    return <RouterProvider router={routing}></RouterProvider>;
}

export default App;


// import './index.css'
// import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

// const url = "https://fliohkkqivofrkobyyjf.supabase.co"
// const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaW9oa2txaXZvZnJrb2J5eWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwOTM3NjIsImV4cCI6MjAzODY2OTc2Mn0.4T-dweL_6V8WIKgA2CPUsB91z4rU9jzVE4lQuNfT7fo"

// const supabase = createClient(url, anon)

// export default function App() {
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   if (!session) {
//     return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
//   }
//   else {
//     return (<div>Logged in!</div>)
//   }
// }