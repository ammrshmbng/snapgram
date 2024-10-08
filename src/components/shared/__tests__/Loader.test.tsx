import { render, screen } from "@testing-library/react";
import Loader from "../Loader";
import '@testing-library/jest-dom';

  test("should render the loader", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });


  