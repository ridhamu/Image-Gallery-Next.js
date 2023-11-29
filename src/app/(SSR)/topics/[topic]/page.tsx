import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { env } from "process";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: { topic: string };
  // searchParams: { [key: string]: string | string[] |  undefined},
}

// export const dynamicParams = false;  //this command disabled dynamic params except for the static params below

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - Image Library",
  };
}

export function generateStaticParams() {
  return ["health", "coding", "cat"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=20&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <h1>{topic}</h1>

      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then
        <strong>cached for subsequent request</strong> (this can be disabled)
      </Alert>

      {images.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
}
