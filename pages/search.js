import Header from "@/components/Header"
import Head from "next/head"
import { API_KEY, CONTEXT_KEY } from "@/keys"
import Response from "@/Response"
import { useRouter } from "next/router"
import SearchResults from "@/components/SearchResults"

function search({results}) {
    const router = useRouter()
  return (
    <div>
        <Head>{router.query.term} - Google Search</Head>
        <link rel="stylesheet" href="/favicon.ico" />
        {/* Header */}
        <Header/>
        {/* Search Results */}
        <SearchResults results={results} />
    </div>
  )
}

export default search

export async function getServerSideProps(context) {
    const useDummyData =false;
    const startIndex = context.query.start || "0";
    const data = useDummyData ? Response : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
    ).then(response => response.json());

    //After server has rendered... Pass the results to the client
    return {
        props: {
            results: data,
        },
    };
}