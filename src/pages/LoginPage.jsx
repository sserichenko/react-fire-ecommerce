import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const login = async () => {
    setIsLoading(true)
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log('USER >>>', user);
          user && setIsLoading(false);
          localStorage.setItem('currentUser', JSON.stringify(user))
          setEmail('');
          setPassword('');
          toast.success('Login successfully!');
          navigate("/");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setIsLoading(false)
          toast.error(errorMessage);
        });
    } catch (err) {
      console.log('LOGIN ERROR', err);
      setIsLoading(false)
    }
  };

  return (
    <div className="login-parent">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="login-bg-bottom"></div>
          <div className="row login-content justify-content-center">
            <div className="col-md-4">
              <div className="login-form">
                <h2>Login</h2>
                <hr />
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={login} className="btn btn-primary">
                  Login
                </button>
                <hr />
                <Link to="/register">Click here to Register</Link>
              </div>
            </div>
            <div className="col-md-5">
              <lottie-player
                src="https://assets6.lottiefiles.com/private_files/lf30_otdghgza.json"
                background="transparent"
                speed="1"
                loop
                autoplay></lottie-player>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
