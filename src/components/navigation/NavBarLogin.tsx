import { useState } from 'react';
import axios from 'axios';



export const NavBarLogin = (props: any) => {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    function login(event: any) {

        let res = axios({
            method: "POST",
            url: '/token',
            data: {
                email: loginForm.email,
                password: loginForm.password
            },
        }).then ((response) => {
            props.setToken(response.data.access_token);
        })
        .catch ((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        });

        setLoginForm({
            email: '',
            password: ''   
        })

        event?.preventDefault();
    }

    

    // Handle change
    function handleChange(event: any) { 
        const {value, name} = event.target
        setLoginForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }



    return (
        <div>

            {!props.token && props.token !== "" && props.token !== undefined ?
                <div>
                    <form className="login">
                        <input onChange={handleChange} 
                            type="email"
                            name="email" 
                            placeholder="Email" 
                            value={loginForm.email} />
                        <input onChange={handleChange} 
                            type="password"
                            name="password" 
                            placeholder="Password" 
                            value={loginForm.password} />

                        <button onClick={login}>Login</button>
                    </form>
                </div>
            :
                <>
                </>
            }

        </div>

    );

}




export default NavBarLogin;

