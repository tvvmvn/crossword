import { useEffect } from "react"

export default function FooterAd() {

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
        data-ad-slot="1769279211"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
      </ins>
    </>
  )
}