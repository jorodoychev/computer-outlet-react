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
import Logout from "./components/logout/Logout.jsx"
import MyPosts from "./components/my-posts/MyPosts.jsx"
import PostEdit from "./components/post-edit/PostEdit.jsx"
import {lazy, Suspense} from "react"
import Loader from "./components/loader/Loader.jsx"
import GuestGuard from "./guards/GuestGard.jsx";

const PostDetails = lazy(() => import('./components/post-details/PostDetails'));


function App() {

    return (
        <>
            <AuthProvider>
                <Header/>
                <Suspense fallback={<Loader/>}>
                    <Routes>
                        <Route path={Path.Home} element={<Home/>}/>
                        <Route path={Path.PostDetails} element={<PostDetails/>}/>
                        <Route element={<GuestGuard/>}>
                            <Route path={Path.Login} element={<Login/>}/>
                            <Route path={Path.Register} element={<Register/>}/>
                        </Route>
                        <Route element={<AuthGuard/>}>
                            <Route path={Path.PostCreate} element={<PostCreate/>}/>
                            <Route path={Path.MyPosts} element={<MyPosts/>}/>
                            <Route path={Path.PostEdit} element={<PostEdit/>}/>
                            <Route path={Path.Logout} element={<Logout/>}/>
                        </Route>
                        <Route path={Path.NotFound} element={<NotFound/>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </AuthProvider>
        </>
    )
}

export default App
