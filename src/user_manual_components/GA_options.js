import choose_mutation_rate from  "../user mannual  images/choose_mutation_rate.PNG"
import choose_population from  "../user mannual  images/choose_population.PNG"
import "../css/user_manual.css"
//population and mutation rate control detail

export default function GA_options(){
    return (
        <div className="user_manual_container">
            <h3>Genetic Algorithm options</h3>
            <ul className="texts">
                <li>If you choose Genetic Algorithms,you can customize by changing,</li>
                <li>Mutation Rate.</li>
                <li>Population.</li>
            </ul>
            <img src={choose_mutation_rate}></img>
            <img src={choose_population}></img>
        </div>
    );
};