import React, { useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import WishListContainer from "../containers/WishListContainer";
import { ILensItem } from "../types/lens";

function WishlistPage() {
  const [lenslist, setLenslist] = useState<ILensItem[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const wishlist = await lensApi.getLensListByWishList();
      setLenslist(wishlist);
    })();
  }, [lenslist]);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="찜목록" />
        <WishListContainer lenslist={lenslist} />
      </div>
    </div>
  );
}

export default WishlistPage;
