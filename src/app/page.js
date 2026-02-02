import About from "@/pages/HomePage/About";
import Featured from "@/pages/HomePage/Featured";
import Mainpage from "@/pages/HomePage/Mainpage";
import Signup from "@/pages/HomePage/Signup";
import Trending from "@/pages/HomePage/Trending";


export default function Home() {
  return (
    <div >
      <Mainpage />
      <Featured />
      <Trending />
      <About />
      <Signup />
    </div>
  );
}
