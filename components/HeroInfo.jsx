const HeroView = (props) => {
    return(
        <div className="HeroView">
            <h2>Name: {props.charName} </h2>
            <ul>
                {props.events && props.events.map((event) =>{
                    return <li>{event}</li>
                })}
            </ul>
        </div>

        
    );
}

export default HeroView;