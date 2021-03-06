import React from "react";
import API from '../utils/api.js';
import SearchBar from './searchBar';

class Table extends React.Component {
    state = {
        search: '',
        results: [],
        sortList: ''
    };
    handleInputChange = (e) => {
        if (e.target.name === "search") {
            const searchInput = e.target.value.toLowerCase();
            this.setState({
                search: searchInput,
            });
        }
    };
    componentDidMount() {
        API.employeeAPI().then((res) => {
            console.log(res);
            this.setState({ results: res.data.results });
            // console.log(this.state.results);
        })
            .catch((err) => console.log(err));
    }
    sortLastName = () => {
        const sortEmployee = this.state.results.sort((a, b) => {
            if (b.name.last > a.name.last) {
                return -1;
            }
            if (a.name.last > b.name.last) {
                return 1;
            }
            return 0;
        })

        if (this.state.sortList === "DESCENDING") {
            sortEmployee.reverse();
            this.setState({ sortList: "ASCENDING" });
        } else {
            this.setState({ sortList: "DESCENDING" });
        }
        this.setState({ results: sortEmployee });
    };
    sortFirstName = () => {
        const sortEmployee = this.state.results.sort((a, b) => {
            if (b.name.first > a.name.first) {
                return -1;
            }
            if (a.name.first > b.name.first) {
                return 1;
            }
            return 0;
        })

        if (this.state.sortList === "DESCENDING") {
            sortEmployee.reverse();
            this.setState({ sortList: "ASCENDING" });
        } else {
            this.setState({ sortList: "DESCENDING" });
        }
        this.setState({ results: sortEmployee });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <SearchBar
                        handleInputChange={this.handleInputChange}
                        search={this.state.search} />
                </div>
                <div className="mt-2">
                    <table className="table">
                        <thead className='thead text-warning'>
                            <tr>
                                <th scope='col'>Profile Picture</th>
                                <th scope='col' onClick={this.sortFirstName}>First Name</th>
                                <th scope='col' onClick={this.sortLastName}>Last Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Phone Number</th>
                            </tr>
                        </thead>
                        {
                            this.state.results && this.state.results.map((item) =>
                                item.name.first.toLowerCase().includes(this.state.search) ? (
                                    <tbody key={item.login.uuid}>
                                        <tr>
                                            <td>
                                                <img src={item.picture.thumbnail} alt="thumbnail" />
                                            </td>
                                            <td>{item.name.first}</td>
                                            <td>{item.name.last}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                    </tbody>
                                ) :
                                    item.name.last.toLowerCase().includes(this.state.search) ? (
                                        <tbody key={item.login.uuid}>
                                            <tr>
                                                <td>
                                                    <img src={item.picture.thumbnail} alt="thumbnail" />
                                                </td>
                                                <td>{item.name.first}</td>
                                                <td>{item.name.last}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                            </tr>
                                        </tbody>
                                    ) : null
                            )}
                    </table>
                </div>
            </div>
        );
    }
}
export default Table;