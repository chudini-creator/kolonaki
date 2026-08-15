import "./homeStyle.css";
import Hero from "../../components/hero/hero";
function Home() {
    return (
        <div className="homeContainer">
            <Hero title="Welcome to Our Website" bgImage="/img/hero-bg.jpg" nextID="#about" />
        </div>
    )
}
export default Home;