import React,{useState} from 'react'

const Simple = () => {
    const [formData,setFormData]=useState({username:''})
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='enter your name'
            />
            <input 
            type='submit'/>

        </form>
    </div>
  )
}

export default Simple