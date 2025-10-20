import { useEffect } from "react"

export default function HeaderAd() {

  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({ });
    } catch (ex) {
      console.error(ex)
    }
  }, [])

  return (
    <>
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1123671203924892"
        crossorigin="anonymous"
      >
      </script>

      {/* 헤더부분 광고 */}
      <ins 
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1123671203924892"
        data-ad-slot="8048396508"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
      </ins>
    </>
  )
}