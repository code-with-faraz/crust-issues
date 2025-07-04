import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

afterEach(cleanup);

test("alt test renders on Pizza image", () => {
    const name = "Pizza Margherita";
    const src = "https://picsum.photos/500"
    const screen = render(<Pizza name={name} description="Slay pizza" image={src} />);

    const img = screen.getByRole("img");
    expect(img.src).toBe(src);
    expect(img.alt).toBe(name);

})

test("to have default image if none is provided", () => {
    const screen = render(<Pizza name="Pizza Margherita" description="Slay pizza" />);

    const img = screen.getByRole("img");
    expect(img.src).not.toBe("");

}) 