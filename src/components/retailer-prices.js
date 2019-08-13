import React from 'react';
class RetailerPrices extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        return (
            <div className="row mt-2">
                {this.props.retailers.map(r =>
                    <div className="col-md-6">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>{r.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {r.items.map(item => <tr key={item.id}><td>{item.name} $ {item.price}</td></tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <b>Total: $ {r.items.reduce((a, b) => a + Number(b.price), 0)}</b>
                                        <button className="btn btn-sm btn-outline-success ml-2">Order Online</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>

        )
    }
}

export default RetailerPrices;