import React, { Fragment, useState } from 'react';
import { setMessage } from '../actions/alert';
import { save, drive } from '../actions/url';




const Index = ({ setAlert }) => {


    const [progress, setProgress] = useState(false)

    const [formData, setFormData] = useState({
        url: '',
        customName: ''
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
        setProgress(true)
        try {
            const res = await save(formData, setOutput, setAccess)
        
            setOutput(res.view)
            setAccess({ url: res.url, fileName: res.name})
        
        } catch (err) {

            setMessage('Please enter valid URL', 'danger', setAlert)
        }
        setProgress(false)

    }


    const handleAccessSubmit = async(e) => {
        e.preventDefault();
        
        setProgress(true)

        try {
            await drive(access)

        setAccess({
            url: '',
            key: '',
            fileName: ''
        })
        setFormData({
            url: '',
            customName: ''
        })
        setMessage('Image has been saved', 'success', setAlert)

        } catch (err) {
            setMessage('Please enter valid key', 'danger', setAlert)

            setAccess({
                url: '',
                key: '',
                fileName: ''
            })
            setFormData({
                url: '',
                customName: ''
            })
        }
        
        setProgress(false)
        
    }


    return (
        <div className="section-content">
            
            <form className="input-form" onSubmit={e=> handleSubmit(e)}>
                <p>Take a website screenshot with WebShot.</p>
                <input type="text" name="url" value={formData.url || ''} onChange={e=> handleChange(e)} required />
                {
                    formData.url && <Fragment>
                        <p>Customize file name <b>{"<file_name>"}</b>.jpg</p>
                        <input type="text" className="half-size" name="customName" value={formData.customName || ''} placeholder=" .optional" onChange={e=> handleChange(e)} />
                    </Fragment>
                }
                
                <div className="options">
                    {
                        access.fileName && <span className="half-size">{access.fileName}</span>
                    }
                <button type="submit">Continue</button>
            </div>

            
            </form>
            <hr />

            {
                access.url && <Fragment>
                    <form onSubmit={e => handleAccessSubmit(e)}>
                        
                        <button type="button" onClick={e => window.open(access.url, "_blank")} style={{ color: 'blue' }}>Sign in to Google Drive</button>
                        
                        <p>Please enter your secret key</p>
                        <input type="text" name="key" onChange={e=> handleAccessChange(e)} value={access.key || ''} placeholder=" .google secret key" required />
                        <button type="submit">save</button>
                    </form>
                </Fragment>
                    
            }
            {
                progress && <p style={{ textAlign: 'center' }}>loading...</p>
            }
            
            

            <p><img src={output} alt={output} style={{width: '100%'}} /></p>
        </div>
    );
}
export default Index;