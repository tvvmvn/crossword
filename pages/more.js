import Link from "next/link";

export default function ReadMore() {
  return (
    <div className="px-4">
      <p className="my-4">
        <Link href="/">
          &larr; 돌아가기
        </Link>
      </p>
      <h1 className="my-4 font-semibold">
          퍼즐에 대하여
      </h1>

      <p className="my-4">
        퍼즐의 단어들은 <i>Oxford</i> 사전이 선정한 가장 실용적인 영어 단어 약 3000개가
        사용되었습니다. 이 단어들만 알아도 일상생활에서 80%의 소통을 가능하다고 해요.
        난이도는 골고루 분포되어 있습니다.
      </p>
      
      <p className="my-4">
        퍼즐은 알고리즘에 의해 자동 생성됩니다. 중복이 최소화되도록 설계되었으나
        가끔씩 중복된 단어가 나타날 수 있습니다.
      </p>

      <p className="">
        개발자 이메일 tvvmvn@gmail.com
      </p>
    </div>
  )
}