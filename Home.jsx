import { useMemo, useState } from "react";
import OrderPage from "./Order";
import Tracking from "./Tracking";

const A = "/assets/";

const coffees = [
    {
        id: 1,
        name: "Caffe Mocha",
        description: "Deep Foam",
        price: "4.53",
        category: "Latte",
        image: `${A}Caffee Mocha.png`,
        detail:
            "A rich coffee with smooth espresso, chocolate notes, and a creamy finish. Perfect for a comforting coffee break.",
    },
    {
        id: 2,
        name: "Flat White",
        description: "Smooth & Creamy",
        price: "3.53",
        category: "Latte",
        image: `${A}Flat White.png`,
        detail:
            "A smooth espresso blended with silky steamed milk for a balanced, creamy coffee experience.",
    },
    {
        id: 3,
        name: "Caramel Latte",
        description: "Sweet & Creamy",
        price: "4.99",
        category: "Latte",
        image: `${A}Caramel Latte.png`,
        detail:
            "Espresso and steamed milk meet sweet caramel for a deliciously smooth coffee.",
    },
    {
        id: 4,
        name: "Macchiato",
        description: "Bold & Rich",
        price: "3.99",
        category: "Macchiato",
        image: `${A}Macchiato.png`,
        detail:
            "A bold espresso topped with a touch of milk foam, bringing out the coffee's rich flavor.",
    },
    {
        id: 5,
        name: "Americano",
        description: "Rich & Balanced",
        price: "2.99",
        category: "Americano",
        image: `${A}Caffee Mocha.png`,
        detail:
            "A classic espresso diluted with hot water for a clean, bold, and balanced cup.",
    },
    {
        id: 6,
        name: "Cappuccino",
        description: "Creamy Milk Foam",
        price: "3.79",
        category: "Latte",
        image: `${A}Flat White.png`,
        detail:
            "Espresso, steamed milk, and a generous layer of foam make this a creamy classic.",
    },
];

const categories = ["All Coffee", "Macchiato", "Latte", "Americano"];

function StatusBar() {
    return (
        <div className="coffee-status-bar">
            <span className="coffee-status-time">9:41</span>
            <div className="coffee-status-icons" aria-label="Phone status">
                <svg viewBox="0 0 18 14" aria-hidden="true">
                    <rect x="1" y="9" width="3" height="4" rx="1" />
                    <rect x="6" y="6" width="3" height="7" rx="1" />
                    <rect x="11" y="3" width="3" height="10" rx="1" />
                    <rect x="16" y="0" width="2" height="13" rx="1" />
                </svg>
                <svg
                    viewBox="0 0 20 16"
                    className="coffee-wifi-icon"
                    aria-label="Wi-Fi"
                >
                    <path d="M1 5.5a13 13 0 0 1 18 0" />
                    <path d="M4 8.5a9 9 0 0 1 12 0" />
                    <path d="M7 11.5a4.5 4.5 0 0 1 6 0" />
                    <circle cx="10" cy="14" r="1" className="wifi-dot" />
                </svg>
                <svg viewBox="0 0 27 14" aria-label="Battery">
                    <rect
                        x="1" y="1" width="22" height="12" rx="3"
                        fill="none" stroke="currentColor" strokeWidth="1.5"
                    />
                    <rect x="3" y="3" width="17" height="8" rx="1.5" />
                    <rect x="24" y="4.5" width="2" height="5" rx="1" />
                </svg>
            </div>
        </div>
    );
}

function BellIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="7.3" />
            <path d="m16.2 16.2 5 5" />
        </svg>
    );
}

function FilterIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h7M14 7h7M3 17h3M10 17h11" />
            <circle cx="12" cy="7" r="2" />
            <circle cx="8" cy="17" r="2" />
        </svg>
    );
}

function HeartIcon({ filled = false }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={filled ? "heart-filled" : ""}
        >
            <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
    );
}

function CoffeeCard({ coffee, onAdd, onOpenDetail }) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <article className="coffee-card">
            <button
                type="button"
                className="coffee-card-open"
                onClick={() => onOpenDetail(coffee)}
                aria-label={`View details for ${coffee.name}`}
            >
                <div className="coffee-card-image-wrap">
                    <img
                        className="coffee-card-image"
                        src={imageFailed ? `${A}Caffee%20Mocha.png` : coffee.image}
                        alt={coffee.name}
                        onError={() => {
                            if (!imageFailed) setImageFailed(true);
                        }}
                    />
                    <span className="coffee-rating">
                        <span aria-hidden="true">★</span> 4.8
                    </span>
                </div>
                <div className="coffee-card-details">
                    <h3>{coffee.name}</h3>
                    <p>{coffee.description}</p>
                </div>
            </button>

            <div className="coffee-card-bottom">
                <span className="coffee-price">${coffee.price}</span>
                <button
                    type="button"
                    className="coffee-add-button"
                    onClick={() => onAdd(coffee)}
                    aria-label={`Add ${coffee.name} to bag`}
                >
                    +
                </button>
            </div>
        </article>
    );
}

function DetailPage({
    coffee,
    onBack,
    favorite,
    onFavorite,
    onBuy,
}) {
    const [size, setSize] = useState("M");
    const [expanded, setExpanded] = useState(false);

    const sizePrices = {
        S: Number(coffee.price) - 0.5,
        M: Number(coffee.price),
        L: Number(coffee.price) + 0.5,
    };

    return (
        <main className="coffee-detail-screen">
            <StatusBar />

            <header className="detail-topbar">
                <button
                    type="button"
                    className="detail-back-button"
                    onClick={onBack}
                    aria-label="Go back to coffee menu"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <h1>Detail</h1>

                <button
                    type="button"
                    className={`detail-favorite-button ${favorite ? "is-favorite" : ""
                        }`}
                    onClick={() => onFavorite(coffee.id)}
                    aria-label="Toggle favorite"
                >
                    <HeartIcon filled={favorite} />
                </button>
            </header>

            <div className="detail-scroll-content">
                <img
                    className="detail-coffee-image"
                    src={coffee.image}
                    alt={coffee.name}
                    onError={(event) => {
                        event.currentTarget.src = `${A}Caffee%20Mocha.png`;
                    }}
                />

                <section className="detail-product-info">
                    <div className="detail-product-title">
                        <div>
                            <h2>{coffee.name}</h2>
                            <p>Ice/Hot</p>
                        </div>

                        <div className="detail-feature-icons" aria-label="Coffee features">
                            <span>
                                <img src="/assets/Fast Delivery.png" alt="Fast Delivery" />
                            </span>

                            <span>
                                <img src="/assets/Quality Bean.png" alt="Quality Bean" />
                            </span>

                            <span>
                                <img src="/assets/Extra Milk.png" alt="Extra Milk" />
                            </span>
                        </div>
                    </div>

                    <div className="detail-rating">
                        <span>★</span>
                        <strong>4.8</strong>
                        <span className="detail-review-count">(230)</span>
                    </div>
                </section>

                <section className="detail-description">
                    <h3>Description</h3>
                    <p>
                        {expanded
                            ? coffee.detail
                            : `${coffee.detail.slice(0, 105)}...`}
                        {" "}
                        <button
                            type="button"
                            onClick={() => setExpanded((value) => !value)}
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>
                    </p>
                </section>

                <section className="detail-size-section">
                    <h3>Size</h3>
                    <div className="detail-size-options">
                        {["S", "M", "L"].map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={size === item ? "selected" : ""}
                                onClick={() => setSize(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="detail-buy-footer">
                <div className="detail-price-block">
                    <span>Price</span>
                    <strong>${sizePrices[size].toFixed(2)}</strong>
                </div>
                <button
                    type="button"
                    className="detail-buy-button"
                    onClick={() => onBuy({ ...coffee, size }, sizePrices[size])}
                >
                    Buy Now
                </button>
            </footer>
            <div className="bottom-home-indicator detail-home-indicator" />
        </main>
    );
}

export default function Home() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Coffee");
    const [favorites, setFavorites] = useState([]);
    const [bag, setBag] = useState([]);
    const [activeTab, setActiveTab] = useState("Home");
    const [showAll, setShowAll] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [orderCoffee, setOrderCoffee] = useState(null);
    const [trackingOrder, setTrackingOrder] = useState(null);

    const visibleCoffees = useMemo(() => {
        const list = coffees.filter((coffee) => {
            const matchesCategory =
                category === "All Coffee" || coffee.category === category;

            const matchesSearch =
                `${coffee.name} ${coffee.description} ${coffee.category}`
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesTab =
                activeTab !== "Favorites" || favorites.includes(coffee.id);

            return matchesCategory && matchesSearch && matchesTab;
        });

        return showAll ? list : list.slice(0, 6);
    }, [category, search, activeTab, favorites, showAll]);

    function toggleFavorite(id) {
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    function addToBag(coffee) {
        setBag((current) => [...current, coffee]);
        setActiveTab("Home");
    }

    function buyNow(coffee, price) {
        setOrderCoffee({
            ...coffee,
            price: Number(price).toFixed(2),
        });
    }

    if (trackingOrder) {
        return (
            <Tracking
                order={trackingOrder}
                onBack={() => {
                    setTrackingOrder(null);
                    setSelectedCoffee(null);
                    setActiveTab("Home");
                }}
            />
        );
    }

    if (orderCoffee) {
        return (
            <OrderPage
                coffee={orderCoffee}
                onBack={() => setOrderCoffee(null)}
                onOrderComplete={(order) => {
                    setTrackingOrder(order);
                    setOrderCoffee(null);
                }}
            />
        );
    }

    if (selectedCoffee) {
        return (
            <DetailPage
                coffee={selectedCoffee}
                onBack={() => setSelectedCoffee(null)}
                favorite={favorites.includes(selectedCoffee.id)}
                onFavorite={toggleFavorite}
                onBuy={buyNow}
            />
        );
    }

    return (
        <main className="home-screen">
            <header className="home-header">
                <StatusBar />

                <div className="home-location-row">
                    <div className="home-location">
                        <span>Location</span>
                        <button
                            type="button"
                            className="location-select"
                            onClick={() => alert("Location selection coming soon.")}
                        >
                            Bilzen, Tanjungbalai
                            <span className="location-chevron">⌄</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="notification-button"
                        aria-label="Notifications"
                        onClick={() => setActiveTab("Notifications")}
                    >
                        <BellIcon />
                    </button>
                </div>

                <div className="home-search-row">
                    <label className="coffee-search">
                        <SearchIcon />
                        <input
                            type="search"
                            placeholder="Search coffee"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            aria-label="Search coffee"
                        />
                    </label>

                    <button
                        type="button"
                        className="filter-button"
                        aria-label="Filter coffee"
                        onClick={() => setShowFilters((value) => !value)}
                    >
                        <FilterIcon />
                    </button>
                </div>

                {showFilters && (
                    <div className="filter-panel">
                        <span>Choose a coffee category below to filter the menu.</span>
                        <button type="button" onClick={() => setShowFilters(false)}>
                            Done
                        </button>
                    </div>
                )}
            </header>

            <section className="home-content">
                <section className="promo-banner">
                    <img
                        src={`${A}Banner.png`}
                        alt="Coffee promotion"
                        className="promo-image"
                    />
                    <div className="promo-shade" />
                    <div className="promo-copy" />
                </section>

                <nav className="coffee-categories" aria-label="Coffee categories">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={`category-chip ${category === item ? "selected" : ""
                                }`}
                            onClick={() => {
                                setCategory(item);
                                setActiveTab("Home");
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="popular-heading">
                    <h2>
                        {activeTab === "Favorites"
                            ? "Your Favorites"
                            : activeTab === "Bag"
                                ? "Your Bag"
                                : activeTab === "Notifications"
                                    ? "Notifications"
                                    : "Popular Coffee"}
                    </h2>

                    {activeTab === "Home" && (
                        <button
                            type="button"
                            onClick={() => setShowAll((value) => !value)}
                        >
                            {showAll ? "Show less" : "See all"}
                        </button>
                    )}
                </div>

                {activeTab === "Bag" ? (
                    <section className="empty-state">
                        <h3>Your coffee bag</h3>
                        {bag.length === 0 ? (
                            <p>Your bag is empty. Add a coffee to get started.</p>
                        ) : (
                            <>
                                {bag.map((item, index) => (
                                    <p key={`${item.id}-${index}`}>
                                        {item.name} — ${item.price}
                                    </p>
                                ))}
                                <strong>
                                    Total: $
                                    {bag
                                        .reduce(
                                            (total, item) =>
                                                total + Number(item.price),
                                            0
                                        )
                                        .toFixed(2)}
                                </strong>
                            </>
                        )}
                    </section>
                ) : activeTab === "Notifications" ? (
                    <section className="empty-state">
                        <h3>Notifications</h3>
                        <p>
                            You’re all caught up. New coffee offers will appear
                            here.
                        </p>
                    </section>
                ) : (
                    <section className="coffee-grid">
                        {visibleCoffees.map((coffee) => (
                            <CoffeeCard
                                key={coffee.id}
                                coffee={coffee}
                                onAdd={addToBag}
                                onOpenDetail={setSelectedCoffee}
                            />
                        ))}

                        {visibleCoffees.length === 0 && (
                            <p className="no-coffee">
                                No coffee found. Try another search.
                            </p>
                        )}
                    </section>
                )}
            </section>

            <nav className="bottom-navigation" aria-label="Main navigation">
                {[
                    { name: "Home", icon: <HomeIcon /> },
                    { name: "Favorites", icon: <HeartIcon /> },
                    { name: "Bag", icon: <BagIcon /> },
                    { name: "Notifications", icon: <BellIcon /> },
                ].map((item) => (
                    <button
                        type="button"
                        key={item.name}
                        className={`bottom-nav-item ${activeTab === item.name ? "active" : ""
                            }`}
                        onClick={() => setActiveTab(item.name)}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.name === "Bag" && bag.length > 0 && (
                            <span className="bag-count">{bag.length}</span>
                        )}
                    </button>
                ))}
                <div className="bottom-home-indicator" aria-hidden="true" />
            </nav>
        </main>
    );
}
