import React, { useState, useCallback, useEffect } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      setPhone(await fetchPhone("1"));
    } catch (e: any) {
      setError(e.message ?? "Đã xảy ra lỗi");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phone) return <Loading />;
  return <SelectPhoneApp phone={phone} />;
}
