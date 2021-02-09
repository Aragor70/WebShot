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
        throw new Error(err)
    }
}

export const drive = async(accessData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
   try {

        const res = await axios.post('/api/urls/confirm', accessData, config)

        console.log(res.data)
        return res.data

    } catch (err) {
        throw new Error(err)
        
    }
}