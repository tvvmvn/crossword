import { useEffect } from "react"

export default function HeaderAd() {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({ });
    } catch (ex) {
      console.error(ex)
    }
  }, [])

  return (
    <>
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