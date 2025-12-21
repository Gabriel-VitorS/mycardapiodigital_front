import type { MenuResponse, MenuProduct } from "@/types/menu/menu.type";
import api from "..";

export const getMenu = (menu: string) => api.get<MenuResponse>(`/menu/${menu}`);

export const getMenuProductById = (productId: number) => api.get<MenuProduct>(`/menu/product/${productId}`);