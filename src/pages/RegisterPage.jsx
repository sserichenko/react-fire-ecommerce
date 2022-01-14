import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../components/Loader';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const register = () => {
    setIsLoading(true);
    try {
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
        setIsLoading(false);
        toast.success('Registration successfully!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        // const errorCode = error.code;
        const errorMessage = error.message;
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        toast.error(errorMessage);
      });
    } catch (error) {
      setIsLoading(false);
      console.log('Registration error', error);
    }
  };

  return (
    <div className="register-parent">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="register-bg-top"></div>
          <div className="row register-content justify-content-center">
            <div className="col-md-5">
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_yr6zz3wv.json"
                background="transparent"
                speed="1"
                // style="width: 300px; height: 300px;"
                loop
                autoplay></lottie-player>
            </div>

            <div className="col-md-4">
              <div className="register-form">
                <h2>Register</h2>
                <hr />
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button onClick={register} className="btn btn-primary">
                  Register
                </button>
                <hr />
                <Link to="/login">Click here to Login</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
