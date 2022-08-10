import gql from "graphql-tag";
import client from "../../lib/client";
import { User } from "../../types";

export interface UsersPageProps {
  users?: User[];
  error?: string;
}

export default function UsersPage({ users }: UsersPageProps) {
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
  const { data, error } = await client.graphql.request<{
    app_users: User[];
  }>(gql`
    query UsersQuery {
      app_users {
        id
        name
      }
    }
  `);

  if (data && data.app_users) {
    return {
      props: {
        users: data.app_users,
      },
    };
  }

  return {
    props: {
      error: (error as Error[])[0].message,
    },
  };
}
