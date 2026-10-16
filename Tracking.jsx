
const MapImage = "/assets/Map.png";
const DriverImage = "/assets/Driver.png";
const DriverIconImage = "/assets/Driver%20Icon.png";
const DeliveryLocationImage = "/assets/Delivery%20Location.png";

function BackIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function LocateIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="12" cy="12" r="8" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            <path d="M15 4a5 5 0 0 1 5 5M15 7.5a1.8 1.8 0 0 1 1.5 1.5" />
        </svg>
    );
}

function MapArt() {
    return (
        <div className="track-map-art">
            {/* Map background */}
            <img
                src={MapImage}
                alt=""
                className="track-map-image"
            />

            {/* Delivery destination */}
            <img
                src={DeliveryLocationImage}
                alt=""
                className="track-destination-pin"
            />

            {/* Delivery route */}
            <svg
                className="track-route-overlay"
                viewBox="0 0 400 560"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M88 270 L88 245 L125 245 L125 215 L270 200 L270 210 L305 210 L305 380"
                    fill="none"
                    stroke="#c47c52"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default function Tracking({ order, onBack }) {
    const isDelivery = order?.orderType !== "Pick Up";
    const place =
        order?.addressName ||
        order?.address ||
        "Jl. Kpg Sutoyo";

    return (
        <main className="track-screen">
            <section className="track-map">
                <MapArt />

                <div className="track-status-bar" aria-hidden="true">
                    <span>9:41</span>

                    <div className="track-status-icons">
                        <svg viewBox="0 0 18 14">
                            <rect x="1" y="9" width="3" height="4" rx="1" />
                            <rect x="6" y="6" width="3" height="7" rx="1" />
                            <rect x="11" y="3" width="3" height="10" rx="1" />
                            <rect x="16" y="0" width="2" height="13" rx="1" />
                        </svg>

                        <svg
                            viewBox="0 0 20 16"
                            className="track-wifi"
                        >
                            <path d="M1 5.5a13 13 0 0 1 18 0" />
                            <path d="M4 8.5a9 9 0 0 1 12 0" />
                            <path d="M7 11.5a4.5 4.5 0 0 1 6 0" />
                            <circle cx="10" cy="14" r="1" />
                        </svg>

                        <svg
                            viewBox="0 0 27 14"
                            className="track-battery"
                        >
                            <rect x="1" y="1" width="22" height="12" rx="3" />
                            <rect x="3" y="3" width="17" height="8" rx="1.5" />
                            <rect x="24" y="4.5" width="2" height="5" rx="1" />
                        </svg>
                    </div>
                </div>

                <div className="track-map-actions">
                    <button
                        type="button"
                        className="track-round-button"
                        onClick={onBack}
                        aria-label="Back to home"
                    >
                        <BackIcon />
                    </button>

                    <button
                        type="button"
                        className="track-round-button"
                        aria-label="Locate me"
                    >
                        <LocateIcon />
                    </button>
                </div>

                <div
                    className="track-courier-marker"
                    aria-hidden="true"
                >
                    <img src={DriverIconImage} alt="" />
                </div>
            </section>

            <section className="track-sheet">
                <div className="track-handle" aria-hidden="true" />

                <h2 className="track-eta">
                    10 minutes left
                </h2>

                <p className="track-destination">
                    {isDelivery ? "Delivery to" : "Pick up at"}{" "}
                    <strong>{place}</strong>
                </p>

                <div
                    className="track-steps"
                    aria-label="Order progress"
                >
                    <span className="done" />
                    <span className="done" />
                    <span className="done" />
                    <span />
                </div>

                <div className="track-status-card">
                    <div className="track-status-icon">
                        <img src={DriverIconImage} alt="" />
                    </div>

                    <div>
                        <h3>Delivered your order</h3>
                        <p>
                            We will deliver your goods to you in the shortest
                            possible time.
                        </p>
                    </div>
                </div>

                <div className="track-courier-row">
                    <img
                        src={DriverImage}
                        alt="Brooklyn Simmons"
                        className="track-avatar"
                    />

                    <div className="track-courier-info">
                        <strong>Brooklyn Simmons</strong>
                        <span>Personal Courier</span>
                    </div>

                    <button
                        type="button"
                        className="track-call-button"
                        aria-label="Call courier"
                    >
                        <PhoneIcon />
                    </button>
                </div>

                <div
                    className="track-home-indicator"
                    aria-hidden="true"
                />
            </section>
        </main>
    );
}
