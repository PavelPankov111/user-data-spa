import React from 'react';
import './Contact.css'
import pen from '../../images/pen.svg'
import trash from '../../images/trash.svg'
import Popup from '../Popup/Popup'
import { api } from '../../utils/Api'

function Contact(props) {
    const [popupState, setPopupState] = React.useState(false)
    const [contactId, setContactId] = React.useState(0)

    function getCurrentContact() {
        api.getContacts()
            .then((items) => {
                const clickedContact = items.filter((i) => i.id === props.id)
                const contact = clickedContact[0].id
                setContactId(contact)
            })
    }

    React.useEffect(() => {
        getCurrentContact()
    }, [handleDelete])

    function handlePopupOpen() {
        getCurrentContact()
        setPopupState(true)
    }

    function handleClosePopup() {
        setPopupState(false)
    }

    function handleDelete() {
        api.deleteContact(contactId)
        props.onUpdate()
    }

    return (
        <div className="contact">
            <div className="contact__content">
                <img onClick={handlePopupOpen} className="contact__button" src={pen} alt="карандашек" />
                <h2 className="contact__name">{props.name}</h2>
                <p className="contact__telephone">{props.telephone}</p>
                <img onClick={handleDelete} className="contact__button" src={trash} alt="корзина" />
            </div>
            <Popup isOpen={popupState} close={handleClosePopup} id={props.id} getId={contactId} onUpdate={props.onUpdate} />
        </div>
    )
}

export default Contact;