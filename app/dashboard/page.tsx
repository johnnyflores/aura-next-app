"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import client from "@/lib/apollo";

type Item = {
  code: string;
  name: string;
};

type GetCountriesQuery = {
  countries: Item[];
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
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const { loading, error, data } = useQuery<GetCountriesQuery>(GET_COUNTRIES, {
    client,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) router.push("/login");
  }, [router]);

  // Initialize items once after query loads
  useEffect(() => {
    if (data?.countries) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems((prev) => (prev.length === 0 ? data.countries : prev));
    }
  }, [data]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    setItems((prev) => [
      ...prev,
      { code: Math.random().toString(36).substring(2, 7), name: newItemName },
    ]);
    setNewItemName("");
  };

  if (!isAuthenticated()) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mb-4 bg-red-500 text-white p-2 rounded cursor-pointer"
      >
        Logout
      </button>

      <h1 className="text-2xl mb-4">Dashboard</h1>

      <form onSubmit={handleAddItem} className="mb-4 flex gap-2">
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded cursor-pointer"
        >
          Add
        </button>
      </form>

      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item.code}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
