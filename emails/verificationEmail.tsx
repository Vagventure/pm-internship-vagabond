import React from 'react';

interface PMInternshipEmailModal {
  validationCode:string
}

const PMInternshipEmail = ({ validationCode }:PMInternshipEmailModal) => {
  return (
    <div style={main}>
      <div style={container}>
        {/* Header with Government Branding */}
        <div style={header}>
          <div style={logoSection}>
            <div style={emblemWrapper}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png"
                width="60"
                height="60"
                alt="Government of India"
                style={emblem}
              />
            </div>
            <div style={headerText}>
              <div style={schemeTitle}>Prime Minister's Internship Scheme</div>
              <div style={ministrySub}>Ministry of Corporate Affairs</div>
            </div>
          </div>
        </div>

        {/* Orange accent bar */}
        <div style={accentBar}></div>

        {/* Main Content */}
        <div style={content}>
          <div style={badge}>VERIFICATION REQUIRED</div>
          
          <h1 style={heading}>Verify Your Account</h1>
          
          <p style={paragraph}>
            Dear Candidate,
          </p>
          
          <p style={paragraph}>
            Thank you for registering with the Prime Minister's Internship Scheme. 
            To complete your registration, please enter the following verification code:
          </p>

          {/* Verification Code */}
          <div style={codeContainer}>
            <div style={codeLabel}>Your Verification Code</div>
            <div style={code}>{validationCode}</div>
            <div style={codeExpiry}>This code will expire in 15 minutes</div>
          </div>

          <p style={paragraph}>
            If you did not request this verification code, please ignore this email 
            or contact our support team immediately.
          </p>

          {/* Call to Action */}
          <div style={ctaSection}>
            <a href="https://pminternship.mca.gov.in/login/" style={button}>
              Verify Now
            </a>
          </div>

          {/* Important Info */}
          <div style={infoBox}>
            <div style={infoTitle}>📌 Important Information</div>
            <ul style={infoList}>
              <li style={infoItem}>Do not share this code with anyone</li>
              <li style={infoItem}>This is an automated email, please do not reply</li>
              <li style={infoItem}>For support, visit our help desk</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div style={contactSection}>
            <p style={contactText}>
              <strong>Need Help?</strong>
            </p>
            <p style={contactText}>
              Email: <a href="mailto:support@pminternship.mca.gov.in" style={link}>
                support@pminternship.mca.gov.in
              </a>
            </p>
            <p style={contactText}>
              Visit: <a href="https://pminternship.mca.gov.in" style={link}>
                pminternship.mca.gov.in
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <div style={footerDivider}></div>
          <p style={footerText}>
            This is an official communication from the Ministry of Corporate Affairs
          </p>
          <p style={footerText}>
            Government of India | Digital India Initiative
          </p>
          <p style={footerSmall}>
            © 2025 Ministry of Corporate Affairs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
};

const header = {
  backgroundColor: '#ffffff',
  padding: '20px 16px',
  borderBottom: '1px solid #e5e5e5',
};

const logoSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};

const emblemWrapper = {
  backgroundColor: '#ffffff',
  padding: '12px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const emblem = {
  display: 'block',
  filter: 'brightness(0) invert(1)',
};

const headerText = {
  flex: 1,
};

const schemeTitle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '4px',
  lineHeight: '1.3',
};

const ministrySub = {
  fontSize: '13px',
  color: '#666',
  fontWeight: '500',
};

const accentBar = {
  height: '4px',
  background: 'linear-gradient(90deg, #FF9933 0%, #138808 50%, #000080 100%)',
};

const content = {
  padding: '32px 16px',
};

const badge = {
  display: 'inline-block',
  backgroundColor: '#FFF4E6',
  color: '#FF9933',
  fontSize: '11px',
  fontWeight: '700',
  padding: '6px 12px',
  borderRadius: '4px',
  letterSpacing: '0.5px',
  marginBottom: '20px',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 24px 0',
  lineHeight: '1.3',
};

const paragraph = {
  fontSize: '15px',
  color: '#444',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const codeContainer = {
  backgroundColor: '#F8F9FA',
  border: '2px dashed #138808',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
  textAlign: 'center' as const,
};

const codeLabel = {
  fontSize: '13px',
  color: '#666',
  fontWeight: '600',
  marginBottom: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const code = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#138808',
  letterSpacing: '8px',
  fontFamily: 'Courier New, monospace',
  margin: '8px 0',
  wordBreak: 'break-all' as const,
  overflowWrap: 'break-word' as const,
};

const codeExpiry = {
  fontSize: '12px',
  color: '#999',
  marginTop: '12px',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  display: 'inline-block',
  backgroundColor: '#FF9933',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 40px',
  borderRadius: '6px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
};

const infoBox = {
  backgroundColor: '#F0F7FF',
  border: '1px solid #C5E0FF',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '32px 0',
};

const infoTitle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#000080',
  marginBottom: '12px',
};

const infoList = {
  margin: '0',
  paddingLeft: '20px',
};

const infoItem = {
  fontSize: '14px',
  color: '#444',
  lineHeight: '1.8',
  marginBottom: '6px',
};

const contactSection = {
  backgroundColor: '#FAFAFA',
  borderRadius: '6px',
  padding: '20px',
  marginTop: '32px',
  textAlign: 'center' as const,
};

const contactText = {
  fontSize: '14px',
  color: '#444',
  margin: '8px 0',
  lineHeight: '1.6',
};

const link = {
  color: '#000080',
  textDecoration: 'none',
  fontWeight: '600',
};

const footer = {
  backgroundColor: '#F8F9FA',
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const footerDivider = {
  height: '1px',
  backgroundColor: '#e5e5e5',
  marginBottom: '16px',
};

const footerText = {
  fontSize: '13px',
  color: '#666',
  margin: '6px 0',
  lineHeight: '1.5',
};

const footerSmall = {
  fontSize: '12px',
  color: '#999',
  margin: '12px 0 0 0',
};

export default PMInternshipEmail;