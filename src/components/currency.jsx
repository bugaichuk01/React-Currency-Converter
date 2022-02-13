
function Currency(props) {
    return (
        <div className="d-flex justify-content-center">
            <input className='form-control w-25 m-2' type="text" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
            <select className='form-select w-25 m-2' value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
            </select>
        </div>
    );
}

export default Currency;