import './Search.css'
import React from 'react';
import { api } from '../../utils/Api'

function Search(props) {
    const [keyword, setKeyword] = React.useState('')

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(keyword)
        api.searchContact(keyword)
            .then((res) => {
                props.contacts(res)
            })
    }

    function handleReset(){
        setKeyword('')
        props.reset()
    }

    return (
        <form onSubmit={handleSubmit} className="search">
            <div className="search__content">
                <h2 className="contacts__form-title">Поиск контакта</h2>
                <p className="search__description">Введите ключевое слово</p>
                <input value={keyword} name="keyword" onChange={handleInputChange} placeholder="Ключевое слово" type="search" className="input search__input" />
                <button className="contacts__form-button">Найти</button>
                <div onClick={handleReset} className="contacts__form-button search__content-reaset-button">Сбросить</div>
            </div>
        </form>
    )
}

export default Search;