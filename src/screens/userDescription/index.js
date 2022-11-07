import React, {Component, useEffect, useMemo} from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const backDrop = require('../../assets/images/back.png')
export default function UserDescription() {
    const defaultProps = {
        center: {
            lat: 41.684780,
            lng: -85.016180
        },
        zoom: 11
    };

    const [data, setData] = React.useState(() => []);
    const [isLoading, setIsLoading] = React.useState(() => true);
    const params = useParams();
    const [thumb, setThumb] = React.useState(() => '');

    const fetchData = () => {
        axios({ method: 'GET', url: `${process.env.REACT_APP_BASE_URL}/users/${params.id}`,
        }).then(function(response) {
            setData(response.data)
            setIsLoading(false)
            const thumb = `${process.env.REACT_APP_BASE_URL_AVATAR}/?size=34&rounded=true&format=png&name=${response.data.name}&background=random&color=2F80ED`
            setThumb(thumb)
        }.bind(this)).catch(function(error) {
            console.log(error)
        }.bind(this));
    }


    useEffect(() => {
        if ((params.id) && (isLoading)){
            fetchData()
        }
    });

    return (
        <>
            {isLoading
                ?
                <>
                </>
                :
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
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <Link to={{pathname: `/`}} style={{ color: '#FFC107' }}>
                                                <button  role="button" className="btn btn-sm btn-warning">
                                                    User
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page"><a href="#" role="button" className="btn btn-sm btn-outline-warning">User id: {params.id}</a></li>
                                    </ol>
                                </div>
                            </nav>
                            <div className="card border-warning" >
                                <img className="card-img-top img-responsive" src={backDrop}   alt="Responsive image"  height={300}/>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <img src={thumb} className="img-thumbnail img-fluid" alt="..."/>
                                        <p className="mt-3">
                                            {data.name} - <code>&lt;(@{data.username})&gt;</code>
                                        </p>
                                    </h5>
                                    <h6 className="card-text">{data.email}</h6>
                                    <h6 className="card-text">{data.phone}</h6>
                                    <h6 className="card-text">{data.website}</h6>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Address</h5>
                                                    <p className="card-text">{data.address.street}</p>
                                                    <p className="card-text">{data.address.suite}</p>
                                                    <p className="card-text">{data.address.city}</p>
                                                    <p className="card-text">{data.address.zipcode}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Company</h5>
                                                    <p className="card-text">{data.company.name}</p>
                                                    <p className="card-text">{data.company.catchPhrase}</p>
                                                    <p className="card-text">{data.company.bs}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div style={{ height: '50vh', width: '100%' }}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: `${process.env.REACT_APP_BASE_GOOGLE_KEY}` }}
                                            defaultCenter={defaultProps.center}
                                            defaultZoom={defaultProps.zoom}
                                        >
                                            <AnyReactComponent
                                                lat={data.company.lat}
                                                lng={data.company.lng}
                                                text="My Company Marker is here"
                                            />
                                        </GoogleMapReact>
                                    </div>
                                </div>
                                <nav className="mt-5 nav nav-pills flex-column flex-sm-row">
                                    <a className="flex-sm-fill text-sm-center nav-link" href="#">Footer</a>
                                    <a className="flex-sm-fill text-sm-center nav-link" href="#">Link</a>
                                    <a className="flex-sm-fill text-sm-center nav-link" href="#">Link</a>
                                    <a className="flex-sm-fill text-sm-center nav-link disabled" href="#">Link</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    );
}