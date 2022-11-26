import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import Load from "../Images/loading.json";

const Container = styled.main`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &::before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const LoadGif = styled.div`
  height: 300px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 8;
`;

const Loader = () => {
  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Container>
        <LoadGif>
          <Lottie options={loaderOptions} />
        </LoadGif>
      </Container>
    </>
  );
};

export default Loader;
