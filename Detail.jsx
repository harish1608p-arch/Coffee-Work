
import { useState } from "react";

const coffeeDescriptions = {
    "Caffe Mocha":
        "Rich espresso meets chocolate and silky milk for a smooth, indulgent coffee with a deep cocoa finish.",
    "Flat White":
        "A smooth espresso blended with velvety steamed milk for a balanced, creamy cup.",
    "Caramel Latte":
        "A classic latte with caramel sweetness, silky milk and a rich espresso finish.",
    Macchiato:
        "Bold espresso marked with creamy milk for a beautifully balanced, rich flavour.",
    Americano:
        "Rich espresso softened with hot water for a clean aroma and smooth flavour.",
    Cappuccino:
        "Bold espresso, steamed milk and a soft layer of foam for a comforting coffee moment.",
};

export default function Detail({ coffee, onBack, onBuyNow }) {
    const [favorite, setFavorite] = useState(false);
    const [size, setSize] = useState("M");
    const [expanded, setExpanded] = useState(false);

    if (!coffee) {
        return (
            <main className="coffee-detail-screen">
                <button className="detail-back" onClick={onBack}>
                    ← Back to coffee
                </button>
                <p>Select a coffee to view its details.</p>
            </main>
        );
    }

    const description =
        coffeeDescriptions[coffee.name] ||
        `${coffee.name} is freshly prepared with carefully selected coffee beans for a delicious café-style experience.`;

    const basePrice = Number(
        String(coffee.price ?? "4.53").replace(/[^0-9.]/g, "")
    );

    const price =
        basePrice + (size === "L" ? 0.8 : size === "S" ? -0.4 : 0);

    const image = coffee.image || "/assets/Caffee%20Mocha.png";

    return (
        <main className="coffee-detail-screen">
            <div className="detail-scroll">
                <header className="detail-header">
                    <button
                        type="button"
                        className="detail-icon-button"
                        onClick={onBack}
                        aria-label="Go back"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <h1>Detail</h1>

                    <button
                        type="button"
                        className={`detail-icon-button ${favorite ? "is-favorite" : ""}`}
                        onClick={() => setFavorite(!favorite)}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                        </svg>
                    </button>
                </header>

                <div className="detail-image-wrap">
                    <img src={image} alt={coffee.name} className="detail-coffee-image" />
                </div>

                <section className="detail-product-info">
                    <div className="detail-name-row">
                        <div>
                            <h2>{coffee.name}</h2>
                            <p>{coffee.subtitle || coffee.description || "Freshly brewed coffee"}</p>
                        </div>

                        <div className="detail-feature-icons" aria-label="Coffee features">
                            <span title="Freshly prepared">☕</span>
                            <span title="Quality coffee">◉</span>
                            <span title="Premium ingredients">♨</span>
                        </div>
                    </div>

                    <div className="detail-rating">
                        <span className="detail-star">★</span>
                        <strong>{coffee.rating || "4.8"}</strong>
                        <span className="detail-reviews">
                            ({coffee.reviews || 230} reviews)
                        </span>
                    </div>
                </section>

                <section className="detail-description">
                    <h3>Description</h3>

                    <p>
                        {expanded
                            ? `${description} Every cup is prepared to order to bring out its aroma, smooth texture and full flavour.`
                            : `${description.slice(0, 105)}${description.length > 105 ? "..." : ""}`}

                        {description.length > 105 && (
                            <button
                                type="button"
                                className="detail-read-more"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? " Read Less" : " Read More"}
                            </button>
                        )}
                    </p>
                </section>

                <section className="detail-size-section">
                    <h3>Size</h3>

                    <div className="detail-size-options">
                        {["S", "M", "L"].map((option) => (
                            <button
                                key={option}
                                type="button"
                                className={`detail-size-button ${size === option ? "active" : ""
                                    }`}
                                onClick={() => setSize(option)}
                                aria-pressed={size === option}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="detail-purchase-bar">
                <div className="detail-price">
                    <span>Price</span>
                    <strong>${price.toFixed(2)}</strong>
                </div>

                <button
                    type="button"
                    className="detail-buy-button"
                    onClick={() => onBuyNow?.({ ...coffee, price, size })}
                >
                    Buy Now
                </button>
            </footer>

            <div className="detail-home-indicator" aria-hidden="true" />
        </main>
    );
}
