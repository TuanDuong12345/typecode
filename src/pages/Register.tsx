import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { useForm, } from "react-hook-form";
import { TUser } from "../interfaces/TUser";
import instance from '../services/api';
import { useNavigate } from 'react-router-dom';



const userSchema = Joi.object({
    email: Joi.string().email({tlds: false}).required(),
    password: Joi.string().required().min(6),
});
const Register = () => {
  const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TUser>({
        resolver: joiResolver(userSchema),
      });
      const onSubmit = (user: TUser) => {
        (async () => {
          const { data } = await instance.post("/register", user);
          console.log(data); 
          if (data.user) {
           const isConfirm = confirm("Register successfully, switch login page?")
           if(isConfirm){
            navigate('/login');
           }
          }
        })();
      };
    return (
<div>
<form onSubmit={handleSubmit(onSubmit)}>
<h1> Register</h1>
<div className="form-group">
<label htmlFor="email">Email</label>
<input
type="email"
id="email"
className="form-control"
{...register("email", {
required: true,
})}
/>
{errors.email && (
<div className="text-danger">{errors.email.message}</div>
)}
</div>
<div className="form-group">
<label htmlFor="password">password</label>
<input
type="password"
id="Password"
className="form-control"
{...register("password", {
required: true,
minLength: 6,
})}
/>
{errors.password && (
<div className="text-danger">{errors.password.message}</div>
)}
</div>
<button className="btn btn-primary w-100">Submit</button>
</form>
</div>
    );
};

export default Register;