import React from 'react';
class RetailerPrices extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        return (
            this.props.retailers.map(r =>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>{r.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {r.items.map(item => <tr><td>{item.price}</td></tr>)}
                    </tbody>
                </table>
            )
        )
    }
}

export default RetailerPrices;