import React, { useState, useContext, useEffect } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './FriendsPage.css';

const FriendsPage = () => {
    const { user } = useContext(UserContext);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [friends, setFriends] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        sqlService.getUserById({ data: searchId })
            .then(data => {
                setSearchResult(data.data[0]);
            })
            .catch(err => {
                console.log(err);
                alert("User not found");
            });
    };

    const handleAddFriend = (friendId) => {
        sqlService.addFriend({ user_id: user.id, friend_id: friendId })
            .then(data => {
                setFriends([...friends, searchResult]);
                setSearchResult(null);
            })
            .catch(err => {
                console.log(err);
                alert("Failed to add friend");
            });
    };

    const handleDeleteFriend = (friendId) => {
        sqlService.deleteFriend({ user_id: user.id, friend_id: friendId })
            .then(data => {
                alert("Friend deleted successfully");
                setFriends(friends.filter(friend => friend.id !== friendId));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to delete friend");
            });
    };

    useEffect(() => {
        if (user) {
            sqlService.getFriends(user.id)
                .then(data => {
                    setFriends(data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="friends-page">
            <h1>Friends</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter user ID"
                    required
                />
                <button type="submit">Search</button>
            </form>
            {searchResult && (
                <div className="search-result">
                    <p>{searchResult.name} ({searchResult.email})</p>
                    <button onClick={() => handleAddFriend(searchResult.id)}>Add Friend</button>
                </div>
            )}
            <h2>Your Friends</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        <p>{friend.name} ({friend.email})</p>
                        <button onClick={() => handleDeleteFriend(friend.id)}>Delete Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsPage;
