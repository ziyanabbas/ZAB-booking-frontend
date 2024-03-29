import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { axiosInstance } from '../../config'
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: [e.target.value] }))
    }
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axiosInstance.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }

    }
    return (
        <div>
            <div className="login">
                <div className="lContainer">
                    <input
                        type="text"
                        placeholder='username'
                        id='username'
                        className="lInput"
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        id='password'
                        className="lInput"
                        onChange={handleChange}
                    />
                    <button disabled={loading} onClick={handleClick} className="lButton" >
                        Login
                    </button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default Login