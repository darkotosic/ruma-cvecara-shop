import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "@/components/product/ProductCard";
import { productsMock } from "@/data/products.mock";
import { formatPrice } from "@/lib/format-price";

describe("ProductCard", () => {
  const baseProduct = productsMock[0];

  it("prikazuje osnovne informacije o proizvodu", () => {
    render(
      <ProductCard
        product={baseProduct}
        onAddToCart={jest.fn()}
        onQuickView={jest.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: baseProduct.naziv })).toBeInTheDocument();
    expect(screen.getByText(baseProduct.opis)).toBeInTheDocument();
    expect(screen.getByText(formatPrice(baseProduct.cena, baseProduct.valuta))).toBeInTheDocument();
    expect(screen.getByText("Dostupno")).toBeInTheDocument();
  });

  it("poziva callback za dodavanje u korpu kada je dostupno", async () => {
    const onAddToCart = jest.fn();
    const user = userEvent.setup();

    render(
      <ProductCard product={baseProduct} onAddToCart={onAddToCart} onQuickView={jest.fn()} />,
    );

    const addButton = screen.getByRole("button", { name: /Dodaj u korpu/i });
    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(baseProduct);
  });

  it("onemogućava dodavanje kada je proizvod nedostupan", async () => {
    const unavailableProduct = { ...baseProduct, status: "nedostupno" as const };
    const onAddToCart = jest.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        product={unavailableProduct}
        onAddToCart={onAddToCart}
        onQuickView={jest.fn()}
      />,
    );

    const addButton = screen.getByRole("button", { name: /Dodaj u korpu/i });
    expect(addButton).toBeDisabled();

    await user.click(addButton);
    expect(onAddToCart).not.toHaveBeenCalled();
  });
});
