import { Phone } from "../types";

const API_URL = "https://6aca20173115bcc9582068d9.mockapi.io";

export async function fetchPhone(id: string): Promise<Phone> {
  const res = await fetch(`${API_URL}/phones`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);

  const list = (await res.json()) as Phone[];
  const p = list.find((x) => x.id === id) ?? list[parseInt(id, 10) - 1];
  if (!p) throw new Error("Không tìm thấy sản phẩm");
  return p;
}

export async function fetchAllPhones(): Promise<Phone[]> {
  const res = await fetch(`${API_URL}/phones`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone[];
}
