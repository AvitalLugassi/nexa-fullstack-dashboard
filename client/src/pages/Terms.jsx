import "../styles/Terms.css";

function Terms() {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <div className="terms-header">
          <img src="/LOGO1.png" alt="NEXA Logo" className="terms-logo" />
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-subtitle">
            Welcome to <strong>NEXA</strong>. By using our platform, you agree
            to the following terms and conditions.
          </p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ConnectFlow, you agree to be bound by these
              Terms of Service. If you do not agree, you must discontinue use of
              the platform immediately.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. You agree to provide accurate and up-to-date
              information during registration.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Content</h2>
            <p>
              You retain ownership of any content you post on ConnectFlow.
              However, by posting, you grant ConnectFlow a license to display
              your content within the platform.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Prohibited Activities</h2>
            <ul>
              <li>Posting offensive or abusive content</li>
              <li>Impersonating other users</li>
              <li>Attempting to hack or disrupt the platform</li>
              <li>Spreading misinformation</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect and use your data.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          <div className="terms-footer">
            <p>Last updated: January 2026</p>
            <p>© NEXA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
