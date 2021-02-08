


export const setMessage = ( message, messageType, setAlert ) => {



    setAlert({ message, alertType: messageType })
    
    setTimeout(() => {
        setAlert({ message: '', alertType: '' })
    }, 4000)

}