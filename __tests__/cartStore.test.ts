import { act } from "@testing-library/react";

import { useCartStore } from "@/store/cartStore";

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  it("dodaje i uvećava stavke", () => {
    const firstItem = { id: "1", name: "Buket", price: 1000, quantity: 1 };
    const secondItem = { id: "1", name: "Buket", price: 1000, quantity: 2 };

    act(() => {
      useCartStore.getState().addItem(firstItem);
      useCartStore.getState().addItem(secondItem);
    });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("uklanja stavku i prazni korpu", () => {
    act(() => {
      useCartStore.setState({
        items: [
          { id: "1", name: "Buket", price: 1000, quantity: 1 },
          { id: "2", name: "Kutija", price: 2000, quantity: 1 },
        ],
      });
      useCartStore.getState().removeItem("1");
      useCartStore.getState().clearCart();
    });

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("ažurira količine i uklanja stavke sa nulom", () => {
    act(() => {
      useCartStore.setState({ items: [{ id: "1", name: "Buket", price: 1200, quantity: 2 }] });
      useCartStore.getState().updateQuantity("1", 1);
      useCartStore.getState().updateQuantity("1", 0);
    });

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("kontroliše otvaranje i zatvaranje fioke", () => {
    act(() => {
      useCartStore.getState().openCart();
    });

    expect(useCartStore.getState().isOpen).toBe(true);

    act(() => {
      useCartStore.getState().closeCart();
    });

    expect(useCartStore.getState().isOpen).toBe(false);
  });
});
