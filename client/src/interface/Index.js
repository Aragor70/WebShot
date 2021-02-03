import React, { Fragment, useState } from 'react';
import { save, drive } from '../actions/url';




const Index = () => {


    const [formData, setFormData] = useState({
        url: ''
    });
    const [output, setOutput] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const [access, setAccess] = useState({
        url: '',
        key: '',
        fileName: ''
    })



    const handleAccessChange = (e) => {
        setAccess({...access, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        const res = await save(formData)
        
        setOutput(res.view)
        setAccess({ url: res.url, fileName: res.name})
    }


    const handleAccessSubmit = async(e) => {
        e.preventDefault();
        
        const res = await drive(access)

        setAccess({
            url: '',
            key: '',
            fileName: ''
        })
        setFormData({
            url: ''
        })
        
    }


    return (
        <div className="section-content">
            
            <form className="input-form" onSubmit={e=> handleSubmit(e)}>
            <p>Take a website screenshot with WebShot.</p>
            <input type="text" name="url" onChange={e=> handleChange(e)} required />
            <div className="options">
                <button type="submit">Continue</button>
            </div>
            </form>

            {
                access.url && <Fragment>
                    <form onSubmit={e => handleAccessSubmit(e)}>
                        
                        <button type="button" onClick={e => window.open(access.url, "_blank")} style={{ color: 'blue' }}>Sign in to Google Drive</button>
                        
                        <p>Please enter your secret key</p>
                        <input type="text" name="key" onChange={e=> handleAccessChange(e)} placeholder=" .google secret key" required />
                        <button type="submit">save</button>
                    </form>
                </Fragment>
                    
            }
            
            

            <p><img src={output} style={{width: '100%'}} /></p>
        </div>
    );
}
export default Index;