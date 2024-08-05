import styled from "styled-components";


export const Container = styled.div`
    // /* Frame 10087 */
    // position: relative;
    // position: absolute;
    // width: 1400px;
    // width: 100%
    // max-width: 1400px;
    // height: 2357px;
    // left: calc(50% - 1400px/2);
    // top: 376px;

    // padding: 0 20px;
    // box-sizing: border-box;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // width: 100%;
    // min-height: 100vh;
    padding: 20px;
    margin-top: 80px;
    overflow: hidden;

`;

export const Section = styled.div`
    /* Component 52 */

    /* Auto layout */
    display: flex;
    align-items: center;
    padding: 0px;
    gap: 10px;

    margin-top: 250px;


    margin-bottom: 20px;

`;

export const SectionTxt = styled.div`
    /* 최신순 */
    
    // width: 50px;
    // height: 25px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 130%;
    // /* or 25px */
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.003em;
    text-transform: lowercase;

    // /* MAIN */
    // color: #B4B7B9;
    color: ${({$active}) => ($active ? '#005CF9': '#B4B7B9')};
    cursor: pointer;

    &:hover {
        color: #005CF9;
    }
`;

export const SectionBar = styled.img`
    /* Vector 658 */

    width: 0px;
    height: 15px;

    /* Foundation /Blue/Light :active */
    border: 1.3px solid #B0CCFD;
    transform: rotate(-180deg);

    /* Inside auto layout */
    flex: none;
    flex-grow: 0;


`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 50px;

  img {
    width: 100px;
    height: 100px;
  }

  h2 {
    font-size: 28px;
    margin: 0;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: gray;
  }

`;

 export const HeaderBar = styled.div`
  /* Vector 672 */

//   position: absolute;
//   width: 1920px;
  height: 0px;
  left: calc(50% - 1920px/2);
  top: 0;

//   border: 1px solid #E0E2E6;

/* Vector 672 */

position: absolute;
width: 1920px;
height: 0px;
left: calc(50% - 1920px/2);
top: 262px;

border: 1px solid #E0E2E6;


`;