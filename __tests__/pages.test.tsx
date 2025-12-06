import { render, screen } from "@testing-library/react";

import CartPage from "@/app/cart/page";
import CheckoutPage from "@/app/checkout/page";
import Home from "@/app/page";
import { LocationProvider } from "@/app/location-context";
import { locations } from "@/config/locations";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cartStore";

jest.mock("@/lib/current-location", () => {
  const { locations } = jest.requireActual("@/config/locations");

  return {
    getCurrentLocation: jest.fn(() => locations[0]),
  };
});

jest.mock("next/headers", () => ({
  headers: () => ({ get: () => "ruma.cvecara.shop" }),
}));

describe("Osnovne stranice", () => {
  const location = locations[0];

  afterEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  it("renderuje početnu sa lokalnim podacima", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Pastelni shop za brzu dostavu cveća/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(location.adresa)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(location.telefoni[0]))).toBeInTheDocument();
  });

  it("prikazuje praznu korpu kada nema stavki", () => {
    render(
      <LocationProvider value={location}>
        <CartPage />
      </LocationProvider>,
    );

    expect(screen.getByText(/Još nema proizvoda u korpi/i)).toBeInTheDocument();
  });

  it("prikazuje zbir korpe kada postoje stavke", () => {
    useCartStore.setState({
      items: [{ id: "1", name: "Buket", price: 1200, quantity: 2 }],
      isOpen: false,
    });

    render(
      <LocationProvider value={location}>
        <CartPage />
      </LocationProvider>,
    );

    expect(screen.getByText(/Porudžbine za/i)).toBeInTheDocument();
    expect(screen.getByText(formatPrice(2400, "RSD"))).toBeInTheDocument();
  });

  it("prikazuje checkout formu kada postoji korpa", () => {
    useCartStore.setState({
      items: [{ id: "1", name: "Buket", price: 1200, quantity: 1 }],
      isOpen: false,
    });

    render(
      <LocationProvider value={location}>
        <CheckoutPage />
      </LocationProvider>,
    );

    expect(screen.getByRole("heading", { name: /Podaci za dostavu i plaćanje/i })).toBeInTheDocument();
  });
});
