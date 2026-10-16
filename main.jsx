import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Onboarding from "./components/Onboarding";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Order from "./components/Order";
import Tracking from "./components/Tracking";

// Scale the fixed 375x812 phone down to fit smaller windows (never scales up)
function fitPhone() {
    const w = document.documentElement.clientWidth;
    const h = window.innerHeight;
    const scale = Math.min(1, w / 375, h / 812);
    document.documentElement.style.setProperty("--phone-scale", scale);
}
fitPhone();
window.addEventListener("resize", fitPhone);

function App() {
    const [screen, setScreen] = useState("onboarding");
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [order, setOrder] = useState(null);

    function openCoffee(coffee) {
        setSelectedCoffee(coffee);
        setScreen("detail");
    }

    function buyCoffee(coffee) {
        setSelectedCoffee(coffee);
        setScreen("order");
    }

    function completeOrder(orderData) {
        setOrder(orderData);
        setScreen("tracking");
    }

    return (
        <div className="app-shell">
            <div className="mobile-frame">
                {screen === "onboarding" ? (
                    <Onboarding setScreen={setScreen} />
                ) : screen === "detail" ? (
                    <Detail
                        coffee={selectedCoffee}
                        onBack={() => setScreen("home")}
                        onBuyNow={buyCoffee}
                    />
                ) : screen === "order" ? (
                    <Order
                        coffee={selectedCoffee}
                        onBack={() => setScreen("detail")}
                        onOrderComplete={completeOrder}
                    />
                ) : screen === "tracking" ? (
                    <Tracking
                        order={order}
                        onBack={() => setScreen("home")}
                    />
                ) : (
                    <Home
                        onSelectCoffee={openCoffee}
                        setScreen={setScreen}
                    />
                )}
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);