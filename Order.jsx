import { useMemo, useState } from "react";

function BackIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function MinusIcon() {
    return <span aria-hidden="true">−</span>;
}

function PlusIcon() {
    return <span aria-hidden="true">+</span>;
}

export default function OrderPage({ coffee, onBack, onOrderComplete }) {
    const [orderType, setOrderType] = useState("Deliver");
    const [quantity, setQuantity] = useState(1);
    const [showAddressEditor, setShowAddressEditor] = useState(false);
    const [address, setAddress] = useState("Jl. Kpg Sutoyo");
    const [addressDetails, setAddressDetails] = useState(
        "Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai."
    );
    const [note, setNote] = useState("");
    const [showNote, setShowNote] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("Cash/Wallet");
    const [paymentMenuOpen, setPaymentMenuOpen] = useState(false);

    const unitPrice = Number(
        String(coffee?.price ?? "4.53").replace(/[^0-9.]/g, "")
    );

    const subtotal = unitPrice * quantity;
    const deliveryFee = orderType === "Deliver" ? 1 : 0;
    const discount = discountApplied ? subtotal * 0.1 : 0;
    const total = subtotal + deliveryFee - discount;

    const image = coffee?.image || "/assets/Caffee%20Mocha.png";

    const formattedTotal = useMemo(
        () => total.toFixed(2),
        [total]
    );

    function placeOrder() {
        onOrderComplete?.({
            coffee,
            quantity,
            orderType,
            address: orderType === "Deliver" ? addressDetails : "Pickup",
            addressName: orderType === "Deliver" ? address : "Brew Bliss Coffee",
            note,
            paymentMethod,
            subtotal: subtotal.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            discount: discount.toFixed(2),
            total: formattedTotal,
        });
    }

    return (
        <main className="order-screen">
            {/* Status bar: fixed at the top, outside the scroll area */}
            <div className="order-status-bar" aria-hidden="true">
                <span>9:41</span>
                <div className="order-status-icons">
                    <svg viewBox="0 0 18 14">
                        <rect x="1" y="9" width="3" height="4" rx="1" />
                        <rect x="6" y="6" width="3" height="7" rx="1" />
                        <rect x="11" y="3" width="3" height="10" rx="1" />
                        <rect x="16" y="0" width="2" height="13" rx="1" />
                    </svg>
                    <svg viewBox="0 0 20 16">
                        <path d="M1 5.5a13 13 0 0 1 18 0" />
                        <path d="M4 8.5a9 9 0 0 1 12 0" />
                        <path d="M7 11.5a4.5 4.5 0 0 1 6 0" />
                        <circle cx="10" cy="14" r="1" />
                    </svg>
                    <svg viewBox="0 0 27 14">
                        <rect x="1" y="1" width="22" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="3" y="3" width="17" height="8" rx="1.5" />
                        <rect x="24" y="4.5" width="2" height="5" rx="1" />
                    </svg>
                </div>
            </div>

            {/* Header: fixed below the status bar */}
            <header className="order-header">
                <button
                    type="button"
                    className="order-back-button"
                    onClick={onBack}
                    aria-label="Back to coffee details"
                >
                    <BackIcon />
                </button>
                <h1>Order</h1>
                <span className="order-header-spacer" />
            </header>

            {/* Only this part scrolls */}
            <div className="order-scroll-content">
                <div className="order-type-switch">
                    {["Deliver", "Pick Up"].map((type) => (
                        <button
                            type="button"
                            key={type}
                            className={orderType === type ? "active" : ""}
                            onClick={() => setOrderType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {orderType === "Deliver" ? (
                    <section className="order-address-section">
                        <h2>Delivery Address</h2>
                        <strong>{address}</strong>
                        <p>{addressDetails}</p>

                        <div className="order-address-actions">
                            <button
                                type="button"
                                onClick={() => setShowAddressEditor((value) => !value)}
                            >
                                ✎ Edit Address
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowNote((value) => !value)}
                            >
                                ▤ Add Note
                            </button>
                        </div>

                        {showAddressEditor && (
                            <div className="order-edit-panel">
                                <label>
                                    Address name
                                    <input
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                </label>
                                <label>
                                    Full address
                                    <textarea
                                        value={addressDetails}
                                        onChange={(event) =>
                                            setAddressDetails(event.target.value)
                                        }
                                        rows={2}
                                    />
                                </label>
                            </div>
                        )}

                        {showNote && (
                            <label className="order-note-field">
                                Order note
                                <textarea
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                    placeholder="Add delivery instructions..."
                                    rows={2}
                                />
                            </label>
                        )}
                    </section>
                ) : (
                    <section className="order-pickup-section">
                        <h2>Pickup Location</h2>
                        <strong>Brew Bliss Coffee</strong>
                        <p>Bilzen, Tanjungbalai</p>
                    </section>
                )}

                <section className="order-coffee-row">
                    <img src={image} alt={coffee?.name || "Coffee"} />
                    <div className="order-coffee-details">
                        <h2>{coffee?.name || "Caffe Mocha"}</h2>
                        <p>{coffee?.description || "Freshly brewed coffee"}</p>
                        <small>Size: {coffee?.size || "M"}</small>
                    </div>

                    <div className="order-quantity-control">
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                            aria-label="Decrease quantity"
                        >
                            <MinusIcon />
                        </button>
                        <strong>{quantity}</strong>
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => value + 1)}
                            aria-label="Increase quantity"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </section>

                <button
                    type="button"
                    className={`order-discount-row ${discountApplied ? "applied" : ""}`}
                    onClick={() => setDiscountApplied((value) => !value)}
                >
                    <span className="order-discount-icon">%</span>
                    <strong>
                        {discountApplied ? "10% Discount Applied" : "Apply 10% Discount"}
                    </strong>
                    <span className="order-discount-arrow">›</span>
                </button>

                <section className="order-payment-summary">
                    <h2>Payment Summary</h2>
                    <div>
                        <span>Price ({quantity} item{quantity > 1 ? "s" : ""})</span>
                        <strong>${subtotal.toFixed(2)}</strong>
                    </div>
                    <div>
                        <span>Delivery Fee</span>
                        <strong>${deliveryFee.toFixed(2)}</strong>
                    </div>
                    {discountApplied && (
                        <div className="order-discount-total">
                            <span>Discount</span>
                            <strong>−${discount.toFixed(2)}</strong>
                        </div>
                    )}
                    <div className="order-total-row">
                        <span>Total</span>
                        <strong>${formattedTotal}</strong>
                    </div>
                </section>
            </div>

            <footer className="order-bottom-panel">
                <button
                    type="button"
                    className="order-payment-method"
                    onClick={() => setPaymentMenuOpen((value) => !value)}
                >
                    <span className="order-wallet-icon">▣</span>
                    <span>
                        <strong>{paymentMethod}</strong>
                        <small>${formattedTotal}</small>
                    </span>
                    <span className="order-payment-chevron">
                        {paymentMenuOpen ? "⌃" : "⌄"}
                    </span>
                </button>

                {paymentMenuOpen && (
                    <div className="order-payment-options">
                        {["Cash/Wallet", "Credit/Debit Card"].map((method) => (
                            <button
                                type="button"
                                key={method}
                                onClick={() => {
                                    setPaymentMethod(method);
                                    setPaymentMenuOpen(false);
                                }}
                            >
                                {method}
                                {paymentMethod === method ? " ✓" : ""}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    className="order-submit-button"
                    onClick={placeOrder}
                >
                    Order
                </button>
                <div className="order-home-indicator" aria-hidden="true" />
            </footer>
        </main>
    );
}