import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2">
      <h1 className="my-4 font-semibold">
        crossdaily에 접속을 시도하셨나요?
        주소가 잘못된 것 같습니다.
      </h1>

      <p className="my-4 text-blue-400">
        <Link href="/">
          홈으로
        </Link>
      </p>
    </div>
  )
}