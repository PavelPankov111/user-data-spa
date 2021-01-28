import React from 'react';
import './Authorization.css'
import Api from '../../utils/Api'
import { Route, Switch, Link } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function Authorization() {
    const api = new Api()

    const [isButtonDisable, setIsButtonDisable] = React.useState(true)
    const [inputError, setInputError] = React.useState(false)
    const [isServerError, setIsServerError] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)

    const [submitFrom, setSubmitFrom] = React.useState({
        inputName: '',
        inputPassword: ''
    })

    const handleInputRegisterChange = React.useCallback((e) => {
        const { name, value } = e.target;
        setSubmitFrom(prevState => ({ ...prevState, [name]: value }))
        setIsButtonDisable(false)
        setInputError(false)
    }, [setSubmitFrom])

    function handleSubmit(e) {
        e.preventDefault()
        if (inputName !== '' && inputPassword !== '') {
            api.auth()
                .then((users) => {
                    console.log(users)
                    users.map((user) => {
                        if (inputName === user.name && inputPassword === user.password) {
                            console.log('рррр')
                            setInputError(false)
                            setLoggedIn(true)
                        }
                    })
                })
                .catch((err) => {
                    setInputError(true)
                    setIsButtonDisable(true)
                    setIsServerError(true)
                    console.log(err)
                })
        } else {
            setIsButtonDisable(true)
            setInputError(true)
        }
    }

    const { inputName, inputPassword } = submitFrom

    const errorText = () => {
        if (isServerError) {
            return 'Ошибка на сервере'
        } else {
            return 'Одно либо оба поля не заполнены'
        }
    }

    return <Switch>
        <Route path="*" >
            <form onSubmit={handleSubmit} className='authorization'>
                {loggedIn ?
                    <Link className="contact" to="/contact">Контакты</Link>
                    : ''}
                <div className={loggedIn ? `authorization__content authorization__content_disable` : `authorization__content`}>
                    <h1 className="authorization__title">Войдите</h1>
                    <input name="inputName" value={inputName} onChange={handleInputRegisterChange} placeholder="Имя" className="input authorization__name" type="text" />
                    <input name="inputPassword" value={inputPassword} onChange={handleInputRegisterChange} placeholder="Пароль" className="input authorization__password" type="password" />
                    <span className={inputError ? `input__error input__error_visible` : `input__error`}>{errorText()}</span>
                    <button className={isButtonDisable ? `authorization__submit authorization__submit_disable` : `authorization__submit`} type="submit">Войти</button>
                </div>

            </form>
            <ProtectedRoute exact path="/contact" loggedIn={loggedIn}>

            </ProtectedRoute>
        </Route>
    </Switch>
}

export default Authorization;