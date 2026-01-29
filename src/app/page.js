import About from "@/pages/About";
import Featured from "@/pages/Featured";
import Mainpage from "@/pages/Mainpage";
import Signup from "@/pages/Signup";
import Trending from "@/pages/Trending";


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
