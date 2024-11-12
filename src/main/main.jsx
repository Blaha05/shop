import HeadNav from "./head/head";
import NavBar from "./navbar/navbar";
import BoxProduct from "./box_product/boxProduct";

export default function Home(){
    return (
        <div className="App">
          <NavBar />
          <HeadNav />
          <BoxProduct />
        </div>
      );
}