import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Estate Agent App", () => {
  test("renders application title", () => {
    render(<App />);
    expect(screen.getByText(/Estate Agent App/i)).toBeInTheDocument();
  });

  test("renders search tab by default", () => {
    render(<App />);
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
  });

  test("renders favourites tab", () => {
    render(<App />);
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument();
  });
});
