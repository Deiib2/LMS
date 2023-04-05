import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()
    let navigate = useNavigate()

    const login = async (email, password) => {
            setLoading(true)
            setError(null)
            const response = await fetch('/api/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const json = await response.json()
            if(!response.ok) {
                setLoading(false)
                setError(json.error)
            }
            if(response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
                setLoading(false)
                navigate('/')
            }
    }


    return {
        login, loading, error
    }
}