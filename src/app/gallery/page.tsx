// app/gallery/page.tsx

import Image from 'next/image';
import styles from './Gallery.module.css';
import Script from "next/script";

// This is a mock data set. In a real-world app, you would
// fetch this from a database, CMS, or a local data source.
const artworks = [
  {
    id: 1,
    src: '/images/art-piece-1.jpg',
    alt: 'Abstract painting with bold red strokes and subtle blue undertones.',
    title: 'Crimson Abstraction',
    artist: 'Jane Doe',
  },
  {
    id: 2,
    src: '/images/art-piece-2.jpg',
    alt: 'Minimalist landscape photograph of a misty mountain range at dawn.',
    title: 'Silent Peaks',
    artist: 'John Smith',
  },
  {
    id: 3,
    src: '/images/art-piece-3.jpg',
    alt: 'Sculptural piece made from polished steel reflecting light.',
    title: 'Chrome Glimmer',
    artist: 'Emily White',
  },
  {
    id: 4,
    src: '/images/art-piece-4.jpg',
    alt: 'Vibrant street art mural depicting a fantastical creature.',
    title: 'Urban Mythos',
    artist: 'Carlos Reyes',
  },
  {
    id: 5,
    src: '/images/art-piece-5.jpg',
    alt: 'Surrealist portrait of a person with a flowing, ethereal backdrop.',
    title: 'Dreamscape Portrait',
    artist: 'Maria Garcia',
  },
  // Add more image data here
];

export default function GalleryPage() {
  return (
    <>
      {/*<!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EHNC14Q4CJ" />
      <Script id="ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EHNC14Q4CJ');
        `}
      </Script>
    
    <div className={styles.galleryContainer}>
      <header className={styles.galleryHeader}>
        <h1 className={styles.galleryTitle}>The Digital Collection</h1>
        <p className={styles.gallerySubtitle}>A curated selection of modern works.</p>
      </header>
      <main className={styles.artGrid}>
        {artworks.map((art) => (
          <div key={art.id} className={styles.artPiece}>
            <div className={styles.imageWrapper}>
              <Image
                src={art.src}
                alt={art.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                placeholder="blur" // Optional: creates a blur-up effect on load
                blurDataURL="data:image/svg+xml;base64,..." // Replace with a real blurDataURL
              />
            </div>
            <div className={styles.artDetails}>
              <h2 className={styles.artTitle}>{art.title}</h2>
              <p className={styles.artArtist}>{art.artist}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
    </>
  );
}