import React from 'react';
import styled from 'styled-components'; // style components for css in js file

const AboutUsContent = () => {
  // History is styled component
  const History = styled.div`
    background-color: rgb(187, 187, 187);
  `;

  // paragraph is styled component
  const Paragraph = styled.p`
    padding: 12px;
    margin: 10px 60px;
    font-size: 18px;
    text-align: start;
  `;

  return (
    // styled component History is used as conatiner with bg color like above.
    <History>
      <h5 className="fw-bold fs-3 text-center">The History</h5>
      {/* styled component paragraph is used for shop history details */}
      <Paragraph>
        The story of Spark Clothings started in Bangalore in the year 2000 with wholesale of hosiery
        and woven garments, catering to the needs of various wholesalers and retailers across India.
        Bangalore textiles industry stands at USD 4.2 billion in 2012 and is globally famous for its
        hosiery products. The City has more than 5,000 garment manufacturing units and job work
        units, and is one of the most organised processing and finishing garment clusters in India.
        The firm came into existence in the year 2005 as a Sole Proprietorship concern in Bangalore,
        Tamil Nadu. In the year 2007 it started as family enterprise with a tiny shop selling Men’s
        apparel at much lesser price than market and expanded to full men’s wear during next six
        months. The journey continued and in 2011 launched its first exclusively brand store in
        Bangalore with bigger retailing space for Men’s wear, Women’s wear and Kids clothing.
      </Paragraph>
      <Paragraph>
        Spark Clothings is engaged into multiple business activities which include manufacturing,
        supplying and trading in a wide array of clothing products which include Women’s Wear, Polo
        T-Shirt, Girls T-Shirt and many more. The range offered is well acknowledged for their
        availability in stylish pattern, perfect finish and comfort in wearing. Products are
        developed after careful attention and hard work of Spark team. It aspires to render quality
        striven products which guarantee cheerfulness of end customer
      </Paragraph>
    </History>
  );
};

export default AboutUsContent;
