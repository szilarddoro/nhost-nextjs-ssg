import { User } from "../../types";

export interface UsersPageProps {
  users?: User[];
  error?: string;
}

export default function UsersPage({ error, users }: UsersPageProps) {
  if (error) {
    return <p>{error}</p>;
  }

  if (!users) {
    return <p>Users are not available.</p>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_MOCKAPI_KEY}.mockapi.io/api/v1/users`
  );
  const data = await response.json();

  if (response.ok) {
    return {
      props: {
        users: data,
      },
    };
  }

  return {
    props: {
      error: data.message,
    },
  };
}
