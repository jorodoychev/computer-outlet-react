import {useContext} from "react"
import {Navigate, Outlet} from "react-router-dom"
import AuthContext from "./../contexts/authContext"

// eslint-disable-next-line no-unused-vars
export default function GuestGuard() {
    const {isAuthenticated} = useContext(AuthContext)

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    return <Outlet/>
}
