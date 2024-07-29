import {Routes, Route} from 'react-router-dom'
import Path from './paths'
import {AuthProvider} from "./contexts/authContext.jsx"

import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import Home from "./components/home/Home.jsx"
import NotFound from "./components/not-found/NotFound.jsx"
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"
import PostCreate from "./components/post-create/PostCreate.jsx"
import AuthGuard from "./guards/AuthGuard.jsx"
import Logout from "./components/Logout/Logout.jsx"
import {MyPosts} from "./components/my-posts/MyPosts.jsx"
import PostDetails from "./components/post-details/PostDetails.jsx"

function App() {

    return (
        <>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path={Path.Home} element={<Home/>}/>
                    <Route path={Path.Login} element={<Login/>}/>
                    <Route path={Path.Register} element={<Register/>}/>
                    <Route path={Path.PostDetails} element={<PostDetails/>}/>
                    <Route element={<AuthGuard/>}>
                        <Route path={Path.PostCreate} element={<PostCreate/>}/>
                        <Route path={Path.MyPosts} element={<MyPosts/>}/>
                        {/*<Route path={Path.PostEdit} element={<PostEdit />} />*/}
                        <Route path={Path.Logout} element={<Logout />} />
                    </Route>
                    <Route path={Path.NotFound} element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </AuthProvider>
        </>
    )
}

export default App
