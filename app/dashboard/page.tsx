"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import client from "@/lib/apollo";

type GetCountriesQuery = {
  countries: { code: string; name: string }[];
};

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) router.push("/login");
  }, [router]);

  const { loading, error, data } = useQuery<GetCountriesQuery>(GET_COUNTRIES, {
    client,
  });

  if (!isAuthenticated()) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mb-4 bg-red-500 text-white p-2 cursor-pointer"
      >
        Logout
      </button>
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <ul>
        {data.countries.map((country) => (
          <li key={country.code}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}
