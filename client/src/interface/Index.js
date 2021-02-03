import React, { useState } from 'react';
import { save } from '../actions/url';




const Index = () => {


    const [formData, setFormData] = useState({
        url: ''
    });
    const [output, setOutput] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const res = await save(formData)
        
        setOutput(res)
    }

    console.log(output, 'output')

    return (
        <div className="section-content">
            
            <form className="input-form" onSubmit={e=> handleSubmit(e)}>
            <p>Take a website screenshot with WebShot.</p>
            <input type="text" name="url" onChange={e=> handleChange(e)} />
            <div className="options">
                <button type="submit">Continue</button>
            </div>
            </form>

            <p><img src={output} style={{width: '100%'}} /></p>
        </div>
    );
}
export default Index;