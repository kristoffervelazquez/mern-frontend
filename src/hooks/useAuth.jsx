import {useContext} from 'react'
import AuthContext from '../context/uthProvider'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;