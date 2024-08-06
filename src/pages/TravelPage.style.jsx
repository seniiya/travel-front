import styled from "styled-components";


export const Container = styled.div`

    padding: 20px;
    overflow: hidden;
    max-width: 1045px;
    margin: 0 auto;
    margin-top: 80px;

`;

export const Section = styled.div`
    /* Component 52 */

    /* Auto layout */
    display: flex;
    align-items: center;
    padding: 0px;
    gap: 10px;

`;

export const SectionTxt = styled.div`
    

    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 130%;
 
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.003em;
    text-transform: lowercase;

 
    color: ${({$active}) => ($active ? '#005CF9': '#B4B7B9')};
    cursor: pointer;

    &:hover {
        color: #005CF9;
    }

    .separator {
      cursor: default;
      padding: 0 10px;
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

    cursor: default;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  top: 220px;

  border: 1px solid #E0E2E6;



`;

export const GoTop = styled.button`


    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    // box-shadow: inset -2px -3px 14px #FFFFFF;
    // filter: drop-shadow(1px 2px 7px rgba(0, 0, 0, 0.1));
    // backdrop-filter: blur(4px);

    position: fixed;
    bottom: 350px;
    right: 80px;
    background-color: rgba(255, 255, 255, 0);
    color: #005cf9;
    border: none;
    border-radius: 1000px;
    cursor: pointer;
    font-size: 16px;
    z-index: 1000;
    width: 30px;
    height: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(255, 255, 250, 0.5);
    }

`;