import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import About from "@/pages/HomePage/About";
import Featured from "@/pages/HomePage/Featured";
import Mainpage from "@/pages/HomePage/Mainpage";
import Signup from "@/pages/HomePage/Signup";
import Trending from "@/pages/HomePage/Trending";



export default function Home() {
  return (
    <div >
      <Nav />
      <Mainpage />
      <Featured />
      <Trending />
      <About />
      <Signup />
      <Footer />
    </div>
  );
}
