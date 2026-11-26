const description =
  'Browse two million Goodreads books with Vike, server-rendered search, and URL-driven filters.'

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||((t==="system"||!t)&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`

export function Head() {
  return (
    <>
      <meta content="#fafafa" media="(prefers-color-scheme: light)" name="theme-color" />
      <meta content="#121212" media="(prefers-color-scheme: dark)" name="theme-color" />
      <meta content={description} property="og:description" />
      <meta content="Vike Books" property="og:site_name" />
      <meta content="Vike Books" property="og:title" />
      <meta content="website" property="og:type" />
      <link href="/icon.svg" rel="icon" type="image/svg+xml" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </>
  )
}
