import React from 'react';
import './Authorization.css'
import { api } from '../../utils/Api'
import { Route, Switch, Link } from 'react-router-dom'

function Authorization(props) {
    const [isButtonDisable, setIsButtonDisable] = React.useState(true)
    const [inputError, setInputError] = React.useState(false)
    const [isServerError, setIsServerError] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)

    const [submitFrom, setSubmitFrom] = React.useState({
        inputName: '',
        inputPassword: ''
    })

    const handleInputChange = React.useCallback((e) => {
        const { name, value } = e.target;
        setSubmitFrom(prevState => ({ ...prevState, [name]: value }))
        setIsButtonDisable(false)
        setInputError(false)
    }, [setSubmitFrom])

    const { inputName, inputPassword } = submitFrom

    function handleSubmit(e) {
        e.preventDefault()
        if (inputName !== '' && inputPassword !== '') {
            api.auth()
                .then((users) => {
                    const correctUserArr = users.filter((user) => inputName === user.name && inputPassword === user.password)
                    const correctUser = correctUserArr[0]
                    if (correctUser) {
                        localStorage.setItem('name', correctUser.name)
                        props.onLogin(true)
                        setInputError(false)
                        setLoggedIn(true)
                    } else {
                        props.onLogin(false)
                        setInputError(true)
                        setIsServerError(true)
                        setLoggedIn(false)
                    }
                })
                .catch((err) => {
                    props.onLogin(false)
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

    const errorText = () => {
        if (isServerError) {
            return 'Ошибка на сервере'
        } else {
            return 'Одно либо оба поля не заполнены'
        }
    }

    function handleOut() {
        setLoggedIn(false)
    }

    return (
        <Switch>
            <Route exact path="/" >
                <form onSubmit={handleSubmit} className='authorization'>
                    {loggedIn ?
                        <div className="authorization__links">
                            <Link className="authorization__link" to="/contact">Контакты</Link>
                            <button type="button" onClick={handleOut} className="authorization__link authorization__out">Выйти</button>
                        </div>
                        : ''},
                        <div className={loggedIn ? `authorization__content authorization__content_disable` : `authorization__content`}>
                        <h1 className="authorization__title">Войдите</h1>
                        <input name="inputName" value={inputName} onChange={handleInputChange} placeholder="Имя" className="input authorization__name" type="text" />
                        <input name="inputPassword" value={inputPassword} onChange={handleInputChange} placeholder="Пароль" className="input authorization__password" type="password" />
                        <span className={inputError ? `input__error input__error_visible` : `input__error`}>{errorText()}</span>
                        <button className={isButtonDisable ? `authorization__submit authorization__submit_disable` : `authorization__submit`} type="submit">Войти</button>
                    </div>
                </form>
            </Route>
        </Switch>
    )
}

export default Authorization;