import { useEffect, useState} from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Table = () => {
  const [fetchedData, setFetchedData] = useState<User[]>([]);
  
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  
  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setFetchedData(data);
      }
    } catch(e) {
      console.error('Error:', e);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      Table
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {fetchedData.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
