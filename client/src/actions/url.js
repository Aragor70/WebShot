import axios from 'axios';
import config from './config.json';
import fs from 'fs'
import screenshotmachine from 'screenshotmachine';


export const save = async(formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
   try {

        const res = await axios.post('/api/urls', formData, config)
        return res.data

    } catch (err) {
        console.log(err.message, 'error')
    }
}