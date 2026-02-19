const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="attribution">
                    <h3>Built by Mosin ali</h3>
                    <p>mosinaliaiml@gmail.com</p>
                    <p className="id-badge">Kodnest ID: KODH1JOG2</p>
                </div>
                <div className="copyright">
                    © {new Date().getFullYear()} MOVIEFLIX. All Rights Reserved.
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .footer {
          background: #050505;
          padding: 3rem 1.5rem;
          margin-top: 4rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }
        .attribution h3 {
          color: var(--primary-color);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .attribution p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .id-badge {
          background: rgba(229, 9, 20, 0.1);
          color: var(--primary-color) !important;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 0.5rem;
          font-weight: 600;
          border: 1px solid rgba(229, 9, 20, 0.2);
        }
        .copyright {
          font-size: 0.8rem;
          color: #444;
          margin-top: 1rem;
        }
      `}} />
        </footer>
    );
};

export default Footer;
