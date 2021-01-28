import React from 'react';
import './Authorization.css'

function Authorization() {
    return (
        <form className="authorization">
            <div className="authorization__content">
                <h1 className="authorization__title">Войдите</h1>
                <input placeholder="Имя" className="input authorization__name" type="text" />
                <input placeholder="Пароль" className="input authorization__password" type="password" />
                <button className="authorization__submit" type="submit">Войти</button>
            </div>
        </form>
    )
}

export default Authorization;