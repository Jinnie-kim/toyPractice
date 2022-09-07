import React, { useState } from 'react';

import AddUser from './components/Users/AddUser/AddUser';
import UserList from './components/Users/UserList/UserList';

function App() {
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfoHandler = (enteredUsername, eneterdUserage) => {
    setUserInfo((prevUser) => {
      return [
        ...prevUser,
        {
          name: enteredUsername,
          age: eneterdUserage,
          id: Math.random().toString(),
        },
      ];
    });
    // 내가 작성한 방식
    // setUserInfo((prevUser) => {
    //   let updateUser = [...prevUser];
    //   updateUser.unshift({
    //     name: enteredUsername,
    //     age: eneterdUserage,
    //     id: Math.random().toString(),
    //   });
    //   return updateUser;
    // });
  };
  return (
    <div>
      <AddUser onAddUser={getUserInfoHandler} />
      <UserList users={userInfo} />
    </div>
  );
}

export default App;
