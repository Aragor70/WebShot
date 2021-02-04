import axios from 'axios';


export const save = async(formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
   try {

        const res = await axios.post('/api/urls', formData, config)

        console.log('success')
        return res.data

    } catch (err) {
        console.log(err.message, 'error')
    }
}

export const drive = async(access) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
   try {

        const res = await axios.post('/api/urls/confirm', access, config)
        return res.data

    } catch (err) {
        console.log(err.message, 'error')
    }
}