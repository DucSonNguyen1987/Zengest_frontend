import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { login } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useLogin } from '../../hooks/auth/useLogin';
import LoginForm from '../../components/auth/LoginForm/LoginForm';


const LoginPage = () => {
  return (
    <div>
    <motion.div
      className='login-container'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
        <div className='login-form'>
          <h2>Connexion</h2>
          <LoginForm />
          </div>
      </motion.div>
      
    </div>
  )
}

export default LoginPage;
