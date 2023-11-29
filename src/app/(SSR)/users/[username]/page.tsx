import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { title } from "process";
import { Alert } from "@/components/bootstrap";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - Image Library",
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div>
      <h1>{user.username}</h1>
      <Alert>
        This page using <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response
      </Alert>
      <p>first name: {user.first_name}</p>
      <p>last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username} target="blank">
        Unsplash profile
      </a>
    </div>
  );
}
