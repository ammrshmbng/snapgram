import { render, screen, fireEvent } from "@testing-library/react";
import Topbar from "../Topbar";
import '@testing-library/jest-dom';

describe("Topbar", () => {
  it("onclick button should signout", () => {
    const mockSignOut = jest.fn();

    render(<Topbar />);
    const signOutButton = screen.getByTestId("signout-button");
    fireEvent.click(signOutButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
