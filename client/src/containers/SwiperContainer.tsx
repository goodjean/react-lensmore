// import "swiper/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

export default function SwiperContainer() {
  SwiperCore.use([Autoplay]);

  const settings = {
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 2,

    // onBeforeInit: 이벤트 핸들러
  };

  return (
    <Swiper {...settings}>
      <SwiperSlide>1</SwiperSlide>
      <SwiperSlide>2</SwiperSlide>
      <SwiperSlide>3</SwiperSlide>
    </Swiper>
  );
}
