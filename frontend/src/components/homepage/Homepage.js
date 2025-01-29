import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Homepage() {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user ? (
                <p>Welcome, {user.name}!</p>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
}

export default Homepage;
