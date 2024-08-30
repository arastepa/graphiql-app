import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import i18n from "../utils/i18n";

vi.mock("../utils/i18n", () => ({
  default: {
    language: "en",
    changeLanguage: vi.fn(),
  },
}));

const TestComponent: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="current-language">{currentLanguage}</span>
      <button onClick={() => changeLanguage("fr")}>Change to French</button>
    </div>
  );
};

describe("LanguageContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides the current language and change language function", () => {
    const changeLanguageSpy = vi.spyOn(i18n, "changeLanguage");

    const { getByTestId, getByText } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(getByTestId("current-language").textContent).toBe("en");

    fireEvent.click(getByText("Change to French"));

    expect(getByTestId("current-language").textContent).toBe("fr");
    expect(changeLanguageSpy).toHaveBeenCalledWith("fr");
  });

  it("throws an error when useLanguage is used outside of LanguageProvider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useLanguage must be used within a LanguageProvider"
    );

    consoleError.mockRestore();
  });
});
