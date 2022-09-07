import React from 'react';

import Card from '../../UI/Card';

import styles from './UserList.module.css';

const UserList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.length ? (
          props.users.map((user) => (
            <li key={user.id} id={user.id}>
              {user.name} ({user.age} years old)
            </li>
          ))
        ) : (
          <p>there is no User, maybe add one?</p>
        )}
      </ul>
    </Card>
  );
};

export default UserList;
