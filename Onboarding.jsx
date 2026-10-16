
function Onboarding({ setScreen }) {
    return (
        <main className="onboarding-screen">
            <div className="onboarding-photo-wrap">
                <img
                    className="onboarding-photo"
                    src="/assets/onboarding-coffee.png"
                    alt="A steaming cup of coffee surrounded by roasted coffee beans"
                />
                <div className="onboarding-photo-shade" aria-hidden="true" />
            </div>

            <div className="status-bar" aria-hidden="true">
                <span className="status-time">9:41</span>

                <span className="status-icons">
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
                        <rect x="0" y="8" width="3" height="4" rx="1" />
                        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                        <rect x="10" y="3" width="3" height="9" rx="1" />
                        <rect x="15" y="0" width="3" height="12" rx="1" />
                    </svg>

                    <svg
                        width="17"
                        height="12"
                        viewBox="0 0 17 12"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    >
                        <path d="M1.5 4.2a10 10 0 0 1 14 0" />
                        <path d="M4 7a6.5 6.5 0 0 1 9 0" />
                        <circle cx="8.5" cy="10" r="1" fill="white" stroke="none" />
                    </svg>

                    <svg width="27" height="13" viewBox="0 0 27 13">
                        <rect
                            x=".5"
                            y=".5"
                            width="22"
                            height="12"
                            rx="3.5"
                            fill="none"
                            stroke="white"
                        />
                        <rect x="2" y="2" width="19" height="9" rx="2" fill="white" />
                        <path d="M24 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" fill="white" />
                    </svg>
                </span>
            </div>

            <section className="onboarding-content">
                <div className="onboarding-copy">
                    <h1>
                        Fall in Love with
                        <br />
                        Coffee in Blissful
                        <br />
                        Delight!
                    </h1>

                    <p className="onboarding-description">
                        Welcome to our cozy coffee corner, where every cup is a
                        delight for you.
                    </p>

                    <button
                        type="button"
                        className="primary-button onboarding-cta"
                        onClick={() => setScreen("home")}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            <div className="home-indicator" aria-hidden="true" />
        </main>
    );
}

export default Onboarding;
