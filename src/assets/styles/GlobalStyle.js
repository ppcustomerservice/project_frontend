import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.onyx};
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    color: ${({ theme }) => theme.colors.gold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gold};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  .section {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 2px;
      background: ${({ theme }) => theme.colors.gold};
      margin: ${({ theme }) => theme.spacing.sm} auto;
    }
  }
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
  .section-subtitle {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.lightGray};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export default GlobalStyle;