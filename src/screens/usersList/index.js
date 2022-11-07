import React, {Component, useEffect, useMemo} from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios';

function UserList() {
    const [data, setData] = React.useState(() => []);
    const [isLoading, setIsLoading] = React.useState(() => true);
    const [searchValue, setSearchValue] = React.useState(() => "");
    const [resetData, setResetData] = React.useState(() => []);

    const fetchData = () => {
        axios({ method: 'GET', url: `${process.env.REACT_APP_BASE_URL}/users`,
        }).then(function(response) {
            setData(response.data)
            setResetData(response.data)
            setIsLoading(false)
        }.bind(this)).catch(function(error) {
            console.log(error)
        }.bind(this));
    }

    const searchBox = (event) =>{
        event.preventDefault();
        let coins = []
        let value = searchValue;
        // if (value !== ''){
            for(let i = 0; i < resetData.length; i++) {
                if(resetData[i].username.search(value) > -1){
                    coins.push(resetData[i])
                }
            }

            if (coins.length < 0){
                setData(resetData)
            }else{
                setData(coins)
                setIsLoading(false)
            }
    }

    useEffect(() => {
        if (isLoading){
            fetchData()
        }
    });

    return (
        <>
            <div className="container-sm">
                <div className="mt-5 row justify-content-center">
                    <nav className="navbar bg-light">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">

                                        <Link to={{pathname: `/`}} style={{ color: '#FFC107' }}>
                                            <button  role="button" className="btn btn-sm btn-warning">
                                            Home
                                            </button>
                                        </Link>

                                </li>
                                <li className="breadcrumb-item active" aria-current="page"><a href="#" role="button" className="btn btn-sm btn-outline-warning">Users</a></li>
                            </ol>
                            <form className="d-flex" role="search" onSubmit={searchBox}>
                                <input className="form-control me-2" type="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-warning" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                    <table className="mt-3 table table-responsive table-responsive-sm table-striped table-hover">
                        <thead className="">
                        <tr>
                            <th scope="col">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminateDisabled" disabled/>
                            </th>
                            <th scope="col">Username</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Website</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    </th>
                                    <td>
                                        <Link to={{pathname: `/user/${i}`}} style={{ color: '#FFC107' }}>
                                            <code>&lt;@{row.username}&gt;</code>
                                        </Link>
                                    </td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.website}</td>
                                    <td className="d-grid gap-2 col mx-auto">
                                        <button className="btn btn-sm btn-warning" type="button">
                                            {row.phone}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className="page-item disabled">
                                <a className="page-link">Previous</a>
                            </li>
                            <li className="page-item disabled"><a className="page-link" href="#">1</a></li>
                            <li className="page-item disabled"><a className="page-link" href="#">2</a></li>
                            <li className="page-item disabled"><a className="page-link" href="#">3</a></li>
                            <li className="page-item disabled" >
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default UserList;