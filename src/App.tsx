import React, { useState, useEffect } from 'react';
import { User } from './modules/users/userTypes';
import { getUsers, addUser } from './modules/users/userApi';
import './App.css';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        getUsers()
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
            })
            .catch(error => console.error('Error during get users', error));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = { name, email };

        addUser(newUser)
            .then(data => {
                setUsers([...users, data]);
                setName('');
                setEmail('');
            })
            .catch(error => console.error('Error adding user:', error));
    };

    return (
        <div className="App">
            <h1>User management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Imię"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Add user</button>
            </form>

            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
