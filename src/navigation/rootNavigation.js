import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from '../screens/usersList';
import Description from '../screens/userDescription';

const Main = () => {
    return (
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Users/>}></Route>
            <Route exact path='/user/:id' element={<Description/>}></Route>
        </Routes>
    );
}

export default Main;