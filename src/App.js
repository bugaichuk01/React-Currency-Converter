import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";
import Currency from "./components/currency";

function App() {

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('http://data.fixer.io/api/latest?access_key=0ce522574c9b9c51f85813161ed6c284')
            .then(response => {
                setOptions(response.data.rates);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    useEffect(() => {
        if (!!options) {
            handleAmount1Change(1);
        }
    }, [options]);


    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * options[currency2] / options[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * options[currency2] / options[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * options[currency1] / options[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * options[currency1] / options[currency2]));
        setCurrency2(currency2);
    }

    return (
        <div className='container mt-5 text-center'>
            <h1 className='mb-3'>React currency converter </h1>
            <Currency
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(options)}
                amount={amount1}
                currency={currency1}/>
            <Currency
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(options)}
                amount={amount2}
                currency={currency2}/>
        </div>
    );
}


export default App;