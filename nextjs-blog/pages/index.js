import Link from 'next/link'
import { client } from "../libs/client"
import styles from "./root.module.scss"

export default function Home(props) {

  console.log(props.blog)

  return (
    <div>

      <h1> BLOG LIST </h1>

      daily
      {
        props.blog.map((obj) => {
          return (
            <Link href={"/posts/" + obj.id}>
              <div div className={styles.fontWrapper}>
                <li> {obj.title} </li>
              </div>
            </Link>
          )
        })
      }

      tech
      {
        props.tech_blog.map((obj) => {
          return (
            <Link href={"/tech_posts/" + obj.id}>
              <div div className={styles.fontWrapper}>
                <li> {obj.title} </li>
              </div>
            </Link>
          )
        })
      }

    </div>
  )
}


export const getStaticProps = async () => {
  // libs/clinet.jsで設定したmicroCMSからデータを非同期で取ってくる
  const data = await client.get({ endpoint: "daily_blog" });
  const tech_data = await client.get({ endpoint: "tech_blog" });

  return {
    props: {
      blog: data.contents,
      tech_blog: tech_data.contents
    },
  }
}