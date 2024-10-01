import React, {  useRef } from "react";
import { Carousel,Image } from "antd";

const contentStyle: React.CSSProperties = {
    height: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
  };
const CarouselComponent = () => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); 

  
  return (
    <Carousel autoplay style={{ width: '100%', height: '100vh' }}>
      <div>
        <h3 style={contentStyle}>
          <Image
            width="100%" 
            height="100%" 
            preview={false}
            src="/assets/image1.webp"
            style={{ objectFit: 'cover' }} 
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <video
            controls
            ref={el => (videoRefs.current[0] = el)} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            data-index={0} 
          >
            <source src="/assets/desk_zb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <video
            controls
            ref={el => (videoRefs.current[1] = el)} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            data-index={1} 
          >
            <source src="/assets/new_women_desk.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            width="100%" 
            height="100%" 
            preview={false}
            src="/assets/image2.webp"
            style={{ objectFit: 'cover' }} 
          />
        </h3>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
