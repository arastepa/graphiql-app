import React from 'react';

interface UserSectionProps {
  username: string;
}

const UserSection: React.FC<UserSectionProps> = ({ username }) => {
  return (
    <div className={undefined}>
      <h1>Welcome Back, {username}!</h1>
      <div className={undefined}>
        <button>REST Client</button>
        <button>GraphiQL Client</button>
        <button>History</button>
      </div>
    </div>
  );
};

export default UserSection;
