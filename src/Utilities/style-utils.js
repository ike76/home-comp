import { css } from "styled-components";

export const media = {
  handheld: (...args) => css`
    @media (max-width: 420px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 770px) {
      ${css(...args)};
    }
  `
};
