import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
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
                <h1>Sign In</h1>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                <div className="login-help">
                    <Link to="/signup">New to Netflix? <span>Sign up now.</span></Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .login-page {
          height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f669a7f4-b6b6-436a-86a2-458b9757a558/bc9f6356-3c07-4257-a37a-f1f413488b8e/IN-en-20221031-popsignuptwoweeks-perspective_alpha_website_small.jpg');
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .login-logo {
          position: absolute;
          top: 25px;
          left: 50px;
        }
        .login-logo img { height: 45px; }
        .login-container {
          background: rgba(0,0,0,0.75);
          padding: 60px 68px 40px;
          width: 450px;
          border-radius: 4px;
        }
        .login-container h1 { color: white; margin-bottom: 28px; font-size: 32px; font-weight: 700; }
        .auth-error { background: #e87c03; border-radius: 4px; color: white; padding: 10px 20px; margin-bottom: 16px; font-size: 14px; }
        .login-container form { display: flex; flexDirection: column; gap: 16px; }
        .login-container input {
          background: #333;
          border-radius: 4px;
          border: none;
          color: white;
          height: 50px;
          padding: 0 20px;
          width: 100%;
          outline: none;
          margin-bottom: 16px;
        }
        .login-container button {
          background: #e50914;
          border-radius: 4px;
          color: white;
          font-weight: 700;
          height: 50px;
          margin-top: 24px;
          cursor: pointer;
          border: none;
          font-size: 16px;
        }
        .login-help { margin-top: 30px; color: #737373; font-size: 16px; }
        .login-help span { color: white; cursor: pointer; }
        .login-help span:hover { text-decoration: underline; }
        .login-help a { text-decoration: none; color: inherit; }
      `}} />
        </div>
    );
};

export default Login;
