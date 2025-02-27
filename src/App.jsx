import { BrowserRouter } from "react-router-dom"
// import Sidebar from "./components/SideBar"
import "./styles/App.css"
import { AppRouter } from "./components/AppRouter"
import { Layout } from "./components/Layout"
import { Helmet } from "react-helmet"
// import Landing from "./screens/Landing"


function App() {


  return (

    <BrowserRouter>

      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Layout>
        <AppRouter></AppRouter>
      </Layout>

    </BrowserRouter>

  )
}

export default App
