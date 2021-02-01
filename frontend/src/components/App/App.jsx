import React from 'react';
import './App.css'
import Authorization from '../Authorization/Authorization'
import '../../vendor/normalize.css'
import Contacts from '../Contacts/Contacts'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
    const [loggedInState, setLoggedInState] = React.useState(false)

    function handleLogin(response) {
        setLoggedInState(response)
    }
    
    return (
        <section className="page">
            <Authorization onLogin={handleLogin} />
            <ProtectedRoute path="/contact" loggedIn={loggedInState}>
                <Contacts />
            </ProtectedRoute>
        </section>
    )
}

export default App;