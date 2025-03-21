import React, { useState, useContext, useEffect } from "react";
import sqlService from "../../services/sqlService";
import { UserContext } from "../../context/UserContext";

const FriendsPage = () => {
    const { user } = useContext(UserContext);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [friends, setFriends] = useState([]);

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
            .then(() => {
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
            .then(() => {
                setFriends(friends.filter(friend => friend.id !== friendId));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to delete friend");
            });
    };

    if (!user) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6 text-white">
            {/* Search Friends */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-4">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter user ID"
                    className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                    Search
                </button>
            </form>

            {/* Display Search Result */}
            {searchResult && (
                <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center mb-4 shadow-md">
                    <p className="text-lg">{searchResult.name} ({searchResult.email})</p>
                    <button 
                        onClick={() => handleAddFriend(searchResult.id)} 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                        Add Friend
                    </button>
                </div>
            )}

            {/* Friends List */}
            {friends.length === 0 ? (
                <p className="text-gray-400 text-center">No friends added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map(friend => (
                        <div 
                            key={friend.id} 
                            className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between items-center shadow-md w-full min-h-[100px]"
                        >
                            <p className="text-lg text-center">{friend.name} ({friend.email})</p>
                            <button 
                                onClick={() => handleDeleteFriend(friend.id)} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition mt-2 w-full"
                            >
                                Delete Friend
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FriendsPage;
