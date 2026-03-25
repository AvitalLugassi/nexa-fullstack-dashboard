import { Link } from "react-router-dom";
import "../styles/Info.css";
import { useUser } from "../context/UserContext";

function Info() {
    const { currentUser, profileImageUrl } = useUser();

    return (
        <div className="info-page">
            <div className="info-bg-blob blob-1" />
            <div className="info-bg-blob blob-2" />
            <div className="info-bg-blob blob-3" />

            <div className="info-wrapper">

                <div className="info-hero">
                    <div className="info-hero-glow" />
                    <div className="info-avatar-ring">
                        <img src={profileImageUrl} alt="Profile" className="info-avatar" />
                        <span className="info-online-dot" />
                    </div>
                    <div className="info-hero-text">
                        <h1 className="info-name">{currentUser.name}</h1>
                        <p className="info-handle">@{currentUser.username}</p>
                        <div className="info-hero-badge">
                            <span className="badge-dot" />
                            Active Member
                        </div>
                    </div>
                </div>

                <div className="info-strip">
                    <div className="strip-item">
                        <span className="strip-icon">✉</span>
                        <div>
                            <div className="strip-label">Email</div>
                            <div className="strip-value">{currentUser.email}</div>
                        </div>
                    </div>
                    <div className="strip-divider" />
                    <div className="strip-item">
                        <span className="strip-icon">☎</span>
                        <div>
                            <div className="strip-label">Phone</div>
                            <div className="strip-value">{currentUser.phone}</div>
                        </div>
                    </div>
                </div>

                <div className="info-columns">

                    <div className="info-block address-block">
                        <div className="block-header">
                            <div className="block-icon-wrap addr-color">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </div>
                            <h2 className="block-title">Address</h2>
                        </div>
                        <div className="block-fields">
                            <div className="field-row">
                                <span className="field-label">City</span>
                                <span className="field-value">{currentUser.address.city}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Street</span>
                                <span className="field-value">{currentUser.address.street}, {currentUser.address.suite}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Zipcode</span>
                                <span className="field-value zip-chip">{currentUser.address.zipcode}</span>
                            </div>
                        </div>
                        <div className="block-deco" />
                    </div>

                    <div className="info-block company-block">
                        <div className="block-header">
                            <div className="block-icon-wrap comp-color">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                                    <line x1="12" y1="12" x2="12" y2="16"/>
                                    <line x1="10" y1="14" x2="14" y2="14"/>
                                </svg>
                            </div>
                            <h2 className="block-title">Company</h2>
                        </div>
                        <div className="block-fields">
                            <div className="field-row">
                                <span className="field-label">Name</span>
                                <span className="field-value company-name">{currentUser.company.name}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Catch Phrase</span>
                                <span className="field-value catchphrase">"{currentUser.company.catchPhrase}"</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Business</span>
                                <span className="field-value">{currentUser.company.bs}</span>
                            </div>
                        </div>
                        <div className="block-deco comp-deco" />
                    </div>

                </div>

                <div className="info-footer-note">
                    Profile · Last updated today
                </div>

            </div>
        </div>
    );
}

export default Info;
