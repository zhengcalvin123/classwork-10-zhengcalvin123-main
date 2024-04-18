import React from 'react';

function App() {
    const[amount, setAmount] = React.useState('');
    const[message, setMessage] = React.useState('');
    const [transactions, setTransactions] = React.useState([]);

function getTransactions(){
    const options = {
        method: "GET",

    };
    fetch('/getTransactions', options)
    .then(res =>res.json())
    .then(apiResponse => {
        console.log(apiResponse);
        setTransactions(apiResponse.data);
    }).catch(() => setMessage('Failed to deposit.'));
}

    React.useEffect(() => {
        //Triggers when component mounts
        getTransactions();
    }, []); // optional re-trigger if any of these state variavles change

    function updateAmount(event){
        let filteredAmount = event.target.value;
        filteredAmount = filteredAmount.substring(0, 8);
        filteredAmount = filteredAmount.replace(/[^0-9]/g, '');
        setAmount(filteredAmount);
    }

    function deposit(){
        console.log("Deposit!");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount,
            })
        };
        fetch('/createDeposit', options)
        .then(res =>res.json())
        .then(apiResponse => {
            console.log(apiResponse);
            setAmount('');
            getTransactions();
        }).catch(() => setMessage('Failed to deposit.'));
    }

    function withdraw(){
        console.log("withdraw!");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount,
            })
        };
        fetch('/withdraw', options)
        .then(res =>res.json())
        .then(apiResponse => {
            console.log(apiResponse);
            setAmount('');
            getTransactions();
        }).catch(() => setMessage('Failed to withdraw.'));
    }

    return (
        <div className="App">
            <h1>Home Page</h1>
            {amount}
            <div>
                $
                <input onChange = {updateAmount} value = {amount}/>
                <button onClick={deposit} disabled = {!amount.length}>Deposit</button>
                <button onClick={withdraw} disabled = {!amount.length}>Withdraw</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Amount
                            </th>
                            <th>
                                Time
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                id
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (<tr>
                            <td>
                                ${transaction.amount.toLocaleString()}
                            </td>
                            <td>
                                {new Date(transaction.timestamp).toLocaleDateString()}
                            </td>
                            <td>
                                {transaction.transactionType}
                            </td>
                            <td>
                                {transaction.uniqueId.substring(16)}
                            </td>
                        </tr>))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default App;
