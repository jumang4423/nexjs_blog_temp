import { useRouter } from 'next/router'
import { client } from '../../libs/client'

export default function post(props) {
  const router = useRouter()
  const { id } = router.query

  // idとあってるやつをblogデータから取ってきて、そのcontentsを返す関数
  const findPostById = (id) => {

    let content = "みつからん"

    props.blog.forEach((obj) => {
      if (obj.id == id) {
        content = obj.content
      }
    })

    return content
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: findPostById(id) }} />
    </div>
  )
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
  const data = await client.get({ endpoint: "daily_blog" });
  // ["/posts/jf3ij23", "/posts/sldfkajsdf"]などが入る
  const paths = data.contents.map(obj => `/posts/${obj.id}`)

  // 事前ビルドしたいパスをpathsとして渡す fallbackについては後述
  return { paths, fallback: false }
}

// ルーティングの情報が入ったparamsを受け取る
export async function getStaticProps() {
  const data = await client.get({ endpoint: "daily_blog" });

  return { props: { blog: data.contents } }
}