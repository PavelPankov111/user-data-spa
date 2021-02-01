import React from 'react';
import './Contacts.css'
import Contact from '../Contact/Contact'
import { api } from '../../utils/Api'
import Search from '../SearchInput/Search'

function Contacts(props) {
    const [isError, setIsError] = React.useState(false)
    const [isSearch, setIsSearch] = React.useState(false)

    React.useEffect(() => {
        renderContacts()
    }, [])

    const [cards, setCards] = React.useState([])
    const name = React.useRef()
    const phone = React.useRef()

    function renderContacts() {
        api.getContacts()
            .then((items) => {
                setCards(items)
                return
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(name.current.value, phone.current.value)
        api.postContacts(name.current.value, phone.current.value)
            .then(() => {
                renderContacts()
            })
    }

    function handleSearch(arr) {
        setIsSearch(true)
        if (arr.length === 0) {
            setIsError(true)
            setCards(arr)
        } else {
            setIsError(false)
            setCards(arr)
        }
    }

    function handleReset() {
        setIsError(false)
        renderContacts()
        setIsSearch(false)
    }

    return (
        <section className="contacts">
            <h1 className="contacts__title">{`Добрый день, ${localStorage.getItem('name')}`}</h1>
            <form onSubmit={handleSubmit} className={isSearch ? `contacts__form contacts__form_hidden` : `contacts__form`}>
                <h2 className="contacts__form-title">Добавить контакт</h2>
                <input ref={name} className="input contacts__form-input" placeholder="Имя" type="text" />
                <input ref={phone} className="input contacts__form-input" placeholder="Телефон" type="tel" />
                <button type="submit" className="contacts__form-button">Добавить</button>
            </form>
            <Search contacts={handleSearch} reset={handleReset} />
            <h2 className={isError ? `error error_visible` : `error`}>Ничего не найдено</h2>
            {cards.map((i) => <Contact onUpdate={renderContacts} isPopupOpen={props.isPopupOpen} key={i.id} id={i.id} name={i.name} telephone={i.telephone} />)}
        </section>
    )
}

export default Contacts;