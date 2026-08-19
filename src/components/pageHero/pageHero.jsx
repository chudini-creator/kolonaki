import "./pageHeroStyle.css"
function PageHero({title, description, children}){
    return(
        <section className="PageHero">
            <div className="PageHeroContainer">

                <h1 className="PageHeroTitle">
                    {title}
                </h1>

                <p className="PageHeroDescription">
                    {description}
                </p>

                {children}
            </div>
        </section>
    )
}
export default PageHero;