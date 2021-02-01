import React from 'react';
import './Popup.css'
import { api } from '../../utils/Api'
import closeIcon from '../../images/close__icon.svg'

function Popup(props) {
    const { isOpen } = props

    const pupupRef = React.useRef(null)

    function handleOverlayClose(evt) {
        if (pupupRef.current && !pupupRef.current.contains(evt.target)) {
            props.close();
        }
    }

    React.useEffect(() => {
        function handleCloseEsc(event) {
            if (event.key === "Escape") {
                props.close()
            }
        }

        document.addEventListener('keyup', handleCloseEsc)
        return () => {
            document.removeEventListener('keyup', handleCloseEsc)
        }
    })

    const [form, setForm] = React.useState({
        name: '',
        phone: ''
    })

    const handleInputChange = React.useCallback((e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }))
    }, [setForm])

    const { name, phone } = form

    function handleSubmit(e) {
        e.preventDefault()
        if (name !== '' && phone !== '') {
            api.changeContacts(name, phone, props.getId)
                .then((res) => {
                    console.log(res)
                    props.onUpdate()
                    props.close()
                })
        }
    }

    return (
        <div onClick={handleOverlayClose} className={isOpen ? `popup popup_opened` : `popup`}>
            <form onSubmit={handleSubmit} ref={pupupRef} className="popup__container">
                <img onClick={props.close} className="popup__container-closeBtn" src={closeIcon} alt="иконка закрытия"/>
                <h2 className="contacts__form-title popup__container-title">Редактировать</h2>
                <input value={name} name="name" onChange={handleInputChange} placeholder="Имя" className="input popup__container-input" type="text" />
                <input value={phone} name="phone" onChange={handleInputChange} placeholder="Телефон" className="input popup__container-input" type="tel" />
                <button className="contacts__form-button" type="submit">Изменить</button>
            </form>
        </div>
    )
}

export default Popup;