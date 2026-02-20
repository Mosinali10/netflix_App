import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await signup(name, email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
            </div>
            <div className="login-container">
                <div className="demo-badge">EDUCATIONAL CLONE</div>
                <h1>Sign Up</h1>
                <p className="demo-warning">NOTICE: This is a <strong>non-official</strong> demonstration project. Information entered is stored in a private development database.</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Sign Up</button>
                </form>

                <div className="login-help">
                    <span>Already have an account?</span> <Link to="/login">Sign in now.</Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        * { box-sizing: border-box; }
        .login-page {
          height: 100vh;
          width: 100%;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f669a7f4-b6b6-436a-86a2-458b9757a558/bc9f6356-3c07-4257-a37a-f1f413488b8e/IN-en-20221031-popsignuptwoweeks-perspective_alpha_website_small.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          color: white;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .login-logo {
          position: absolute;
          top: 25px;
          left: 50px;
        }
        .login-logo img { height: 45px; }
        .login-container {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 60px 68px 40px;
          width: 450px;
          max-width: 90vw;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
        }
        .login-container h1 { color: white; margin: 0 0 28px; font-size: 32px; font-weight: 700; }
        .demo-badge { background: #e50914; color: white; padding: 4px 10px; font-size: 0.7rem; font-weight: bold; border-radius: 4px; display: inline-block; align-self: flex-start; margin-bottom: 15px; }
        .demo-warning { color: #8c8c8c; font-size: 0.85rem; margin-bottom: 25px; line-height: 1.4; border-left: 3px solid #e50914; padding-left: 12px; }
        .auth-error { background: #e87c03; border-radius: 4px; color: white; padding: 10px 20px; margin-bottom: 16px; font-size: 14px; }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        
        .login-input {
          background: rgba(51, 51, 51, 0.8);
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          height: 50px;
          padding: 0 20px;
          width: 100%;
          outline: none;
          font-size: 16px;
        }
        .login-input:focus {
          background: rgba(69, 69, 69, 0.9);
          border-bottom: 2px solid #e87c03;
        }
        
        .login-button {
          background: #e50914;
          border-radius: 4px;
          color: white;
          font-weight: 700;
          height: 50px;
          width: 100%;
          margin-top: 24px;
          cursor: pointer;
          border: none;
          font-size: 16px;
          transition: background 0.2s;
        }
        .login-button:hover {
          background: #c10712;
        }
        
        .login-help { margin-top: 30px; color: #737373; font-size: 16px; }
        .login-help span { margin-right: 5px; }
        .login-help a { text-decoration: none; color: white; transition: 0.2s; }
        .login-help a:hover { text-decoration: underline; }
      `}} />
        </div>
    );
};

export default Signup;
