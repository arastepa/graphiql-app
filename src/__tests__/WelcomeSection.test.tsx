import { expect, vi, describe, it, afterEach, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomeSection from "../components/WelcomeSection";
import i18n from "../utils/i18n";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    role,
  }: {
    children: React.ReactNode;
    href: string;
    className: string;
    role: string;
  }) => (
    <a href={href} className={className} role={role}>
      {children}
    </a>
  ),
}));

describe("WelcomeSection", () => {
  beforeAll(() => {
    i18n.init({
      lng: "en",
      fallbackLng: "en",
      ns: ["translations"],
      defaultNS: "translations",
      resources: {
        en: {
          translations: {
            "Header.Title": "Welcome to Rest/Graphiql Client",
            "Header.Paragraph": "Some welcome text",
            SignIn: "Sign In",
            SignUp: "Sign Up",
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders the welcome section with correct elements", () => {
    render(<WelcomeSection />);

    expect(
      screen.getByRole("heading", {
        name: "Welcome to Rest/Graphiql Client",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Header.Paragraph")).toBeInTheDocument();
    expect(screen.getByAltText("home img")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SignIn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SignUp" })).toBeInTheDocument();
  });

  it("calls console.log when Sign In button is clicked", () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<WelcomeSection />);

    fireEvent.click(screen.getByRole("button", { name: "SignIn" }));
    expect(consoleSpy).toHaveBeenCalledWith("Redirect to Sign In");
  });

  it("calls console.log when Sign Up button is clicked", () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<WelcomeSection />);

    fireEvent.click(screen.getByRole("button", { name: "SignUp" }));
    expect(consoleSpy).toHaveBeenCalledWith("Redirect to Sign Up");
  });
});
