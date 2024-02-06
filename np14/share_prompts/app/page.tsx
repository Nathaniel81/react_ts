// "use-client"
import Image from "next/image";
// import Feed from "@components/feed";
import Feed from "@components/Feed";



export default function Home() {
  return (
    <section className="w-full flex flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <hr className="mex-md:hidden"/>
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Propmtopia is an open-source AI prompting tool for modern world to discover, create and share reative prompts
      </p>
      <Feed />
    </section>
  );
}
