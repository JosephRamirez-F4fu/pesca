import { useCallback, useEffect, useState } from "react";

interface VehicleRouteCollectionService<TDto, TRes extends { id: number }> {
  getByVehicleRouteId: (id: number) => Promise<TRes[]>;
  create: (data: TDto) => Promise<TRes>;
  update: (id: number, data: TDto) => Promise<void>;
  delete: (id: number) => Promise<void>;
  getById: (id: number) => Promise<TRes>;
}

interface UseVehicleRouteCollectionParams<
  TDto,
  TRes extends { id: number },
> {
  routeSelectedId?: number;
  service: VehicleRouteCollectionService<TDto, TRes>;
}

export const useVehicleRouteCollection = <
  TDto,
  TRes extends { id: number },
>({
  routeSelectedId,
  service,
}: UseVehicleRouteCollectionParams<TDto, TRes>) => {
  const [items, setItems] = useState<TRes[]>([]);
  const [selectedItem, setSelectedItem] = useState<TRes | null>(null);

  const refreshItems = useCallback(async () => {
    if (!routeSelectedId) {
      setItems([]);
      setSelectedItem(null);
      return;
    }

    const data = await service.getByVehicleRouteId(routeSelectedId);
    setItems(data);
  }, [routeSelectedId, service]);

  useEffect(() => {
    void refreshItems();
  }, [refreshItems]);

  const createItem = async (data: TDto): Promise<void> => {
    const createdItem = await service.create(data);
    setItems((prevItems) => [...prevItems, createdItem]);
    setSelectedItem(createdItem);
  };

  const updateItem = async (id: number, data: TDto): Promise<void> => {
    await service.update(id, data);
    const updatedItem = await service.getById(id);
    setItems((prevItems) =>
      prevItems.map((currentItem) =>
        currentItem.id === id ? updatedItem : currentItem
      )
    );
    setSelectedItem((prevItem) => (prevItem?.id === id ? updatedItem : prevItem));
  };

  const deleteItem = async (id: number) => {
    await service.delete(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItem((prevItem) => (prevItem?.id === id ? null : prevItem));
  };

  const getItem = async (id: number) => {
    return service.getById(id);
  };

  return {
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    refreshItems,
    createItem,
    updateItem,
    deleteItem,
    getItem,
  };
};
